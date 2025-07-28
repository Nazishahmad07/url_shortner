#!/bin/bash

echo "🚀 URL Shortener Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Your commit message'"
    exit 1
fi

echo "✅ Repository is ready for deployment"
echo ""
echo "📋 Deployment Options:"
echo "1. Render (Recommended - Free)"
echo "2. Railway (Free tier available)"
echo "3. Heroku (Free tier available)"
echo "4. Vercel (Free tier available)"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🔧 Prerequisites:"
echo "- MongoDB database (Atlas, Railway, etc.)"
echo "- Git repository (GitHub, GitLab, etc.)"
echo "- Environment variables configured"
echo ""
echo "🎯 Quick Start (Render):"
echo "1. Push your code to GitHub"
echo "2. Go to https://render.com"
echo "3. Connect your GitHub repository"
echo "4. Set environment variables:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your_mongodb_connection_string"
echo "   - JWT_SECRET=your_secret_key"
echo "5. Deploy!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md" 