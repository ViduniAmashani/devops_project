variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "Ubuntu AMI ID"
  type        = string
}

variable "key_name" {
  description = "EC2 Key pair name"
  type        = string
}
