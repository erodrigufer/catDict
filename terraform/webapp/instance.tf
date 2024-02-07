resource "aws_launch_template" "launch_template" {
  name_prefix   = var.name
  image_id      = var.ami_id
  instance_type = var.instance_type

  user_data = var.user_data_file_name != null ? filebase64("${path.root}/${var.user_data_file_name}") : var.user_data

  lifecycle {
    precondition {
      condition     = var.user_data == null || var.user_data_file_name == null
      error_message = "Cannot use user_data and user_data_file_name at the same time"
    }
  }
}

resource "aws_instance" "ec2_instance" {
  vpc_security_group_ids = [aws_security_group.sg_ec2.id]

  launch_template {
    id = aws_launch_template.launch_template.id
  }
}

resource "aws_security_group" "sg_ec2" {
  name = "${var.name}-sg"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_ingress" {
  security_group_id = aws_security_group.sg_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "allow_all_egress" {
  security_group_id = aws_security_group.sg_ec2.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # Semantically equivalent to all ports.
}
