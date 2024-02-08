output "instance_dns" {
  description = "Public DNS of EC2 instance."
  value       = aws_instance.ec2_instance.public_dns
}

output "instance_ip" {
  description = "Public IP of EC2 instance."
  value       = aws_instance.ec2_instance.public_ip
}
