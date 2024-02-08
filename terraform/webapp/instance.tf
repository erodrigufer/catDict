resource "aws_launch_template" "launch_template" {
  name_prefix   = var.name
  image_id      = var.ami_id
  instance_type = var.instance_type

  user_data = base64encode(templatefile("user_data.sh", {
    AUTH_USERNAME = var.auth_username
    AUTH_PASSWORD = var.auth_password
    API_URL       = var.api_url
  }))
}

resource "aws_instance" "ec2_instance" {
  vpc_security_group_ids = [aws_security_group.sg_ec2.id]

  launch_template {
    id = aws_launch_template.launch_template.id
  }
}

resource "aws_security_group" "sg_ec2" {
  name = "${var.name}"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_ingress" {
  security_group_id = aws_security_group.sg_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

# TODO: comment out this sg rule after debugging.
resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ingress" {
  security_group_id = aws_security_group.sg_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_egress_rule" "allow_all_egress" {
  security_group_id = aws_security_group.sg_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # Semantically equivalent to all ports.
}
