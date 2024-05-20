resource "digitalocean_droplet" "webserver" {
  image  = var.droplet_image
  name   = var.droplet_name
  region = var.droplet_region
  size   = var.droplet_size
  user_data = templatefile("cloud-init.yaml", {
    AUTH_USERNAME = var.auth_username
    AUTH_PASSWORD = var.auth_password
    API_URL       = var.api_url
    DOCKER_REPO   = var.docker_repo
  })
}
