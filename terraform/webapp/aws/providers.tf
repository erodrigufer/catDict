terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.32"
    }
  }

  required_version = "1.6.4"
}

provider "aws" {
  region = "eu-north-1"

  default_tags {
    tags = {
      Project   = "erodrigufer"
      CreatedBy = "terraform"
      Workspace = terraform.workspace
    }
  }
}
