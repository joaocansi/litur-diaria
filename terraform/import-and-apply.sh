#!/bin/bash

set -e

PROJECT_NAME="liturgia"

echo "Attempting to import existing Vercel project '$PROJECT_NAME'..."
terraform import vercel_project.client "$PROJECT_NAME" 2>/dev/null || echo "Project not found, skipping import."

echo "Running terraform apply..."
terraform apply -auto-approve
