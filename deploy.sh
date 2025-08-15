#!/bin/bash

echo "🚀 Starting Firebase deployment for ToolGalaxy..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Login to Firebase (if not already logged in)
    echo "🔐 Checking Firebase authentication..."
    firebase login --reauth
    
    # Initialize Firebase project (if not already initialized)
    echo "🔧 Setting up Firebase project..."
    
    # Deploy to Firebase
    echo "🌐 Deploying to Firebase Hosting..."
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌍 Your app is now live at: https://toolgalaxy-app.web.app"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi
