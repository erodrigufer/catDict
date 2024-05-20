variable "name" {
  description = "Name of project."
  type        = string
}

variable "ami_id" {
  description = "ID of AMI used for launch template."
  type        = string
}

variable "instance_type" {
  description = "EC2 Instance type."
  type        = string
}

variable "auth_username" {
  type = string
}

variable "auth_password" {
  type = string
}

variable "api_url" {
  type = string
}

variable "domain" {
  description = "Domain will point to EC2 instance where webapp is deployed."
  type        = string
  default     = null
}
