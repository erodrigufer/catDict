# TODO: check if there is a problem when no domain is defined.
locals {
  root_domain             = join(".", slice(split(".", var.domain), 1, 3))
  domain_without_protocol = replace(var.domain, "https://", "")
}

# TODO: check if there is a problem when no domain is defined.
data "aws_route53_zone" "selected" {
  count = var.domain != null ? 1 : 0
  name  = local.root_domain
}

resource "aws_route53_record" "backend" {
  count   = var.domain != null ? 1 : 0
  zone_id = data.aws_route53_zone.selected[count.index].zone_id
  name    = local.domain_without_protocol
  type    = "A"
  ttl     = "300"

  records = [aws_instance.ec2_instance.public_ip]
}

resource "aws_route53_health_check" "example" {
  fqdn              = aws_route53_record.backend[0].fqdn
  port              = 80
  type              = "HTTP"
  resource_path     = "/"
  failure_threshold = "5"
  request_interval  = "30"

  tags = {
    Name = "catDict-health-check"
  }
}
