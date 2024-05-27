variable "auth_username" {
  type      = string
  sensitive = true
}

variable "auth_password" {
  type      = string
  sensitive = true
}

variable "api_url" {
  type = string
}

variable "do_token" {
  description = "DO token required by provider to deploy resources."
  type        = string
  sensitive   = true
}

variable "docker_repo" {
  description = "Docker registry with image used for webapp."
  type        = string
  sensitive   = true
}

variable "droplet_image" {
  description = "Droplet image."
  type        = string
}

variable "droplet_name" {
  description = "Name assigned to droplet."
  type        = string
}

variable "droplet_region" {
  description = "Region where droplet is deployed."
  type        = string
}

variable "droplet_size" {
  description = "Size of droplet being deployed."
  type        = string
}
