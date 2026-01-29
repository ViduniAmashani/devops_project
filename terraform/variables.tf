variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "ami_id" {
  description = "Ubuntu AMI ID"
  type        = string
  default     = "ami-0abcdef1234567890"  # replace with the correct Ubuntu AMI for Mumbai
}

variable "key_name" {
  description = "EC2 Key pair name"
  type        = string
  default     = "vserver"
}

