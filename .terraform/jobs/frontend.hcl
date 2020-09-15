job "frontend" {
  datacenters = ["hetzner"]

  group "frontend" {
    count = 2

    update {
      max_parallel      = 1
      min_healthy_time  = "30s"
      healthy_deadline  = "5m"
      progress_deadline = "10m"
    }

    task "frontend" {
      driver = "docker"

      config {
        image = "kiwisheets/frontend:master"
        port_map = {
          http = 3000
        }
      }

      resources {
        network {
          mbits = 10
          port  "http" {}
        }
      }

      service {
        name = "frontend"
        port = "http"

        connect {
          sidecar_service {}
        }

        tags = [
          "traefik.enable=true",
          "traefik.http.routers.whoami-http.rule=Host(`app.kiwisheets.com`)",
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