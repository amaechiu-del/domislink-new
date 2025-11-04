#!/bin/bash

# DomisLink Enterprise AI Proctoring Deployment Script
echo "🚀 Starting DomisLink AI Proctoring Deployment..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p database
mkdir -p ai-proctoring-service
mkdir -p monitoring-dashboard
mkdir -p logs

# Set environment variables
export DOMISLINK_VERSION="2.0.0"
export DEPLOYMENT_ENV="production"

echo "🔧 Environment: $DEPLOYMENT_ENV"
echo "📦 Version: $DOMISLINK_VERSION"

# Build and start services
echo "🏗️ Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "🔍 Checking service status..."
services=("domislink-app" "domislink-db" "domislink-redis" "ai-proctoring" "monitoring-dashboard")

for service in "${services[@]}"; do
    if docker-compose ps | grep -q "$service.*Up"; then
        echo "✅ $service is running"
    else
        echo "❌ $service failed to start"
        docker-compose logs "$service"
    fi
done

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec domislink-db psql -U postgres -d domislink -f /docker-entrypoint-initdb.d/init.sql

# Initialize AI models
echo "🤖 Initializing AI models..."
docker-compose exec ai-proctoring node init-models.js

# Display deployment information
echo ""
echo "🎉 DomisLink AI Proctoring Deployment Complete!"
echo ""
echo "📊 Services Overview:"
echo "   • Main Application: http://localhost:3000"
echo "   • Monitoring Dashboard: http://localhost:3001"
echo "   • AI Proctoring Service: http://localhost:5001"
echo "   • PostgreSQL Database: localhost:5432"
echo "   • Redis Cache: localhost:6379"
echo ""
echo "🔧 Management Commands:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo "   • Scale services: docker-compose up -d --scale domislink-app=3"
echo ""
echo "📈 Next Steps:"
echo "   1. Access the monitoring dashboard"
echo "   2. Configure NCAA compliance settings"
echo "   3. Test proctoring with sample exams"
echo "   4. Review system analytics"
echo ""
echo "🛡️ DomisLink Aviation Academy - NCAA Compliant Proctoring"