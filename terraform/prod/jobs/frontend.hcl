job "frontend-prod" {
  datacenters = ["hetzner"]

  group "frontend" {
    count = 1

    task "frontend" {
      driver = "docker"

      config {
        image = "kiwisheets/frontend:prod-${version}"
        port_map = {
          http = 3000
        }
      }

      resources {
        cpu    = 50
        memory = 128

        network {
          mbits = 10
          port  "http" {}
        }
      }

      service {
        name = "frontend-prod"
        port = "http"

        connect {
          sidecar_service {}
        }

        tags = [
          "traefik.enable=true",
          "traefik.http.routers.frontend-prod.rule=Host(`app.kiwisheets.com`)",
        ]

        check {
          type     = "http"
          path     = "/"
          interval = "2s"
          timeout  = "2s"
        }
      }
    }
  }
}