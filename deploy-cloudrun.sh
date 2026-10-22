#!/bin/bash
# ==============================================================================
# EduSure - Google Cloud Run Independent Microservices Deployment Script
# ==============================================================================
# Usage:
#   ./deploy-cloudrun.sh [SERVICE_NAME] [PROJECT_ID] [REGION]
# Examples:
#   ./deploy-cloudrun.sh all my-gcp-project us-central1
#   ./deploy-cloudrun.sh auth my-gcp-project us-central1
#   ./deploy-cloudrun.sh parent my-gcp-project us-central1
#   ./deploy-cloudrun.sh teacher my-gcp-project us-central1
#   ./deploy-cloudrun.sh student my-gcp-project us-central1
#   ./deploy-cloudrun.sh frontend my-gcp-project us-central1
# ==============================================================================

set -e

SERVICE=${1:-all}
GCP_PROJECT=${2:-$(gcloud config get-value project 2>/dev/null || echo "your-gcp-project-id")}
REGION=${3:-"us-central1"}

echo "🚀 EduSure Google Cloud Run Deployment"
echo "=========================================="
echo "Target Service : $SERVICE"
echo "GCP Project    : $GCP_PROJECT"
echo "Region         : $REGION"
echo "=========================================="

deploy_auth() {
  echo "🔒 Deploying 1/5: Auth Backend to Google Cloud Run..."
  gcloud run deploy edusure-auth-backend \
    --source . \
    --dockerfile apps/auth-backend/Dockerfile \
    --project "$GCP_PROJECT" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars="NODE_ENV=production,PORT=8080"
  echo "✅ Auth Backend Deployed successfully."
}

deploy_parent() {
  echo "👨‍👩‍👧 Deploying 2/5: Parent Backend to Google Cloud Run..."
  gcloud run deploy edusure-parent-backend \
    --source . \
    --dockerfile apps/parent-backend/Dockerfile \
    --project "$GCP_PROJECT" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars="NODE_ENV=production,PORT=8080"
  echo "✅ Parent Backend Deployed successfully."
}

deploy_teacher() {
  echo "👨‍🏫 Deploying 3/5: Teacher Backend to Google Cloud Run..."
  gcloud run deploy edusure-teacher-backend \
    --source . \
    --dockerfile apps/teacher-backend/Dockerfile \
    --project "$GCP_PROJECT" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars="NODE_ENV=production,PORT=8080"
  echo "✅ Teacher Backend Deployed successfully."
}

deploy_student() {
  echo "🎓 Deploying 4/5: Student Backend to Google Cloud Run..."
  gcloud run deploy edusure-student-backend \
    --source . \
    --dockerfile apps/student-backend/Dockerfile \
    --project "$GCP_PROJECT" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --set-env-vars="NODE_ENV=production,PORT=8080"
  echo "✅ Student Backend Deployed successfully."
}

deploy_frontend() {
  echo "🌐 Deploying 5/5: EduSure Frontend to Google Cloud Run..."
  gcloud run deploy edusure-frontend \
    --source . \
    --dockerfile apps/web/Dockerfile \
    --project "$GCP_PROJECT" \
    --region "$REGION" \
    --platform managed \
    --allow-unauthenticated \
    --port 8080 \
    --memory 1Gi \
    --cpu 1 \
    --set-env-vars="NODE_ENV=production,PORT=8080"
  echo "✅ EduSure Frontend Deployed successfully."
}

case "$SERVICE" in
  auth)
    deploy_auth
    ;;
  parent)
    deploy_parent
    ;;
  teacher)
    deploy_teacher
    ;;
  student)
    deploy_student
    ;;
  frontend|web)
    deploy_frontend
    ;;
  all)
    deploy_auth
    deploy_parent
    deploy_teacher
    deploy_student
    deploy_frontend
    echo "🎉 All 5 EduSure services deployed successfully to Google Cloud Run!"
    ;;
  *)
    echo "Unknown service: $SERVICE"
    echo "Valid options: auth | parent | teacher | student | frontend | all"
    exit 1
    ;;
esac
