terraform {
  backend "s3" {
    bucket         = "swashflag-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "swashflag-terraform-locks"
    encrypt        = true
  }
}