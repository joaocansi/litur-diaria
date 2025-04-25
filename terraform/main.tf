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
}

provider "vercel" {
  api_token = var.vercel_api_url
}

provider "stripe" {
  api_key = var.stripe_api_key
}

resource "vercel_project" "client" {
  name      = "liturgia"
  framework = "nextjs"

  git_repository = {
    repo = "joaocansi/liturgia-diaria"
    type = "github"
  }
}

resource "vercel_project_domain" "client_domain" {
  project_id = vercel_project.client.id
  domain     = "liturgia.joaocansi.site"
}

resource "stripe_webhook_endpoint" "webhook" {
  url         = var.client_url
  description = "service webhook"
  enabled_events = [
    "checkout.session.completed",
    "invoice.paid",
    "invoice.payment_failed"
  ]
}

output "webhook_secret" {
  value     = stripe_webhook_endpoint.webhook.secret
  sensitive = true
}
