output "droplet_public_ip" {
  description = "Public IP of droplet."
  value       = digitalocean_droplet.webserver.ipv4_address
}
