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
}

data "vercel_project_directory" "client_directory" {
  path = "../"
}

resource "vercel_deployment" "client_deployment" {
  project_id = vercel_project.client.id
  files = data.vercel_project_directory.client_directory.files
  path_prefix = "../"
  production = true

  lifecycle {
    replace_triggered_by = [ vercel_project_environment_variables.client_vars ]
  }
}

resource "vercel_project_environment_variables" "client_vars" {
  project_id = vercel_project.client.id
  variables = [
    {
      key    = "NEXT_PUBLIC_BASE_URL"
      value  = var.client_url
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "NEXTAUTH_URL"
      value  = var.client_url
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "NEXTAUTH_SECRET"
      value  = var.nextauth_secret
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "GOOGLE_CLIENT_ID"
      value  = var.google_client_id
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "GOOGLE_CLIENT_SECRET"
      value  = var.google_client_secret
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "STRIPE_SECRET_KEY"
      value  = var.stripe_secret_key
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "STRIPE_WEBHOOK_SECRET"
      value  = var.stripe_webhook_secret
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "STRIPE_PRICE_ID"
      value  = var.stripe_price_id
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "AWS_ACCESS_KEY_ID"
      value  = var.aws_access_key_id
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "AWS_SECRET_ACCESS_KEY"
      value  = var.aws_secret_access_key
      target = ["production", "preview"]
      sensitive = true
    },
    {
      key    = "AWS_REGION"
      value  = var.aws_region
      target = ["production", "preview"]
      sensitive = true
    }
  ]
}

resource "vercel_project_domain" "client_domain" {
  project_id = vercel_project.client.id
  domain     = var.client_domain
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