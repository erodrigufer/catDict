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

variable "user_data_file_name" {
  description = "Name of file in working directory with user data used to initialize EC2 instance."
  type        = string
  default     = null # Variable is optional.
}

variable "user_data" {
  description = "User data to provide when launching an instance. Use this to provide plain text instead of file."
  type        = string
  default     = null # Variable is optional.
}

