# TODO: check if there is a problem when no domain is defined.
locals {
  root_domain             = join(".", slice(split(".", var.domain), 1, 3))
  domain_without_protocol = replace(var.domain, "https://", "")
}

# TODO: check if there is a problem when no domain is defined.
data "aws_route53_zone" "selected" {
  count = var.domain ? 1 : 0
  name  = local.root_domain
}

resource "aws_route53_record" "backend" {
  count   = var.domain ? 1 : 0
  zone_id = data.aws_route53_zone.selected.zone_id
  name    = local.domain_without_protocol
  type    = "A"

  # TODO: check this fields.
  alias {
    name = aws_instance.ec2_instance.public_dns
    # TODO: check if this field is configured appropriately.
    zone_id                = aws_instance.ec2_instance.availability_zone
    evaluate_target_health = true
  }
}
