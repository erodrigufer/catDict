terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  required_version = "1.6.4"
}

provider "digitalocean" {
  token = var.do_token
}
