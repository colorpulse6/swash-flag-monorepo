variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "tags" {
  description = "Tags to attach to resources"
  type        = map(string)
  default     = {}
}

variable "domain_name" {
  description = "Domain name for the frontend application"
  type        = string
}

variable "hosting_type" {
  description = "Type of hosting configuration for frontend (e.g. S3+CloudFront)"
  type        = string
  default     = "cloudfront" # Or whatever default value makes sense
}

variable "cloudfront_price_class" {
  description = "CloudFront distribution price class"
  type        = string
  default     = "PriceClass_100" # Use PriceClass_100, PriceClass_200, or PriceClass_All
}

variable "enable_waf" {
  description = "Whether to enable WAF for the frontend"
  type        = bool
  default     = false
}

variable "frontend_domain_name" {
  description = "Domain name for the frontend"
  type        = string
  default     = "your-app-domain.com"  # Replace with your actual domain
}

variable "api_endpoint" {
  description = "Backend API endpoint URL to be used by the frontend application"
  type        = string
}