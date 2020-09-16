terraform {
  backend "remote" {
    organization = "KiwiSheets"

    workspaces {
      name = "KiwiSheets-Frontend-Prod"
    }
  }
}

provider "nomad" {
  ca_file = "nomad-ca.pem"
}

resource "nomad_job" "frontend" {
  jobspec = file("${path.module}/jobs/frontend.hcl")
  detach  = false
}
