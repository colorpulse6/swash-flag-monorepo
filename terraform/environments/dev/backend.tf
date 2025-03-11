terraform {
  backend "s3" {
    bucket         = "swashflag-terraform-dev-state"
    key            = "dev/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "swashflag-terraform-dev-locks"
    encrypt        = true
  }
}