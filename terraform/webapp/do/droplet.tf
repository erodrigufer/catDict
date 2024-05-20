resource "digitalocean_droplet" "webserver" {
  image  = "ubuntu-24-04-x64"
  name   = "test-ero-do"
  region = "fra1"
  size   = "s-1vcpu-1gb"
  user_data = file("user_data.yaml")
}
