terraform {
  backend "remote" {
    organization = "KiwiSheets"

    workspaces {
      name = "KiwiSheets-Frontend-Dev"
    }
  }
}

provider "nomad" {
  ca_file = "nomad-ca.pem"
}

resource "nomad_job" "frontend" {
  jobspec = templatefile("${path.module}/jobs/frontend.hcl", {
    version = var.version
  })
  detach = false
}
