terraform {
  required_providers {
    stripe = {
      source  = "lukasaron/stripe"
      version = "3.3.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "2.15.1"
    }
  }
  backend "s3" {
    bucket         = "liturgia-terraform-state"
    key            = "terraform/state"
    region         = "us-east-1"
    encrypt        = true
  }
}

provider "vercel" {
  api_token = var.vercel_api_key
}

provider "stripe" {
  api_key = var.stripe_secret_key
}

resource "vercel_project" "client" {
  name      = "liturgia"
  framework = "nextjs"

  git_repository = {
    repo = "joaocansi/liturgia-diaria"
    type = "github"
  }

  root_directory = "client"

  # avoids build automatically (terraform must deploy)
  ignore_command = 0
}

resource "vercel_project_domain" "client_domain" {
  project_id = vercel_project.client.id
  domain     = var.client_domain
}

resource "vercel_deployment" "client_deploy" {
  project_id = vercel_project.client.id
  ref = "main"

  environment = {
    NEXT_PUBLIC_BASE_URL   = var.client_url
    NEXTAUTH_URL           = var.client_url
    NEXTAUTH_SECRET        = var.nextauth_secret
    GOOGLE_CLIENT_ID       = var.google_client_id
    GOOGLE_CLIENT_SECRET   = var.google_client_secret
    STRIPE_SECRET_KEY      = var.stripe_secret_key
    STRIPE_WEBHOOK_SECRET  = var.stripe_webhook_secret
    STRIPE_PRICE_ID        = var.stripe_price_id
    AWS_ACCESS_KEY_ID      = var.aws_access_key_id
    AWS_SECRET_ACCESS_KEY  = var.aws_secret_access_key
    AWS_REGION             = var.aws_region
  }
}

# resource "stripe_webhook_endpoint" "webhook" {
#   url         = var.client_url
#   description = "service webhook"
#   enabled_events = [
#     "checkout.session.completed",
#     "invoice.paid",
#     "invoice.payment_failed"
#   ]
# }

# output "webhook_secret" {
#   value     = stripe_webhook_endpoint.webhook.secret
#   sensitive = true
# }
