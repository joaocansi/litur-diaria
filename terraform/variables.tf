variable "stripe_api_key" {
  type    = string
  sensitive = true
}

variable "vercel_api_key" {
  type    = string
  sensitive = true
}

variable "client_domain" {
  type    = string
  sensitive = true
}

variable "client_url" {
  type    = string
  sensitive = true
}

variable "google_client_secret" {
  type      = string
  sensitive = true
}

variable "google_client_id" {
  type = string
  sensitive = true
}

variable "nextauth_secret" {
  type      = string
  sensitive = true
}

variable "stripe_secret_key" {
  type      = string
  sensitive = true
}

variable "stripe_webhook_secret" {
  type      = string
  sensitive = true
}

variable "stripe_price_id" {
  type = string
}

variable "aws_access_key_id" {
  type      = string
  sensitive = true
}

variable "aws_secret_access_key" {
  type      = string
  sensitive = true
}

variable "aws_region" {
  type = string
}
