# Firebase Hosting Setup for ToolGalaxy

This guide will help you deploy ToolGalaxy to Firebase Hosting.

## Prerequisites

1. **Node.js** installed on your machine
2. **npm** or **yarn** package manager
3. **Firebase account** (free tier is sufficient)

## Step-by-Step Setup

### 1. Install Firebase CLI

```bash
npm run firebase:install
# or
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
npm run firebase:login
# or
firebase login
```

### 3. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `toolgalaxy-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Wait for project creation

### 4. Initialize Firebase in Your Project

```bash
npm run firebase:init
# or
firebase init hosting
```

**Configuration Options:**
- Select "Use an existing project"
- Choose your Firebase project
- Set public directory: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds: `No`
- Overwrite index.html: `No`

### 5. Update Project ID (if different)

Edit `.firebaserc` file and update the project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 6. Build and Deploy

```bash
# Deploy to production
npm run firebase:deploy

# Or deploy to preview channel
npm run firebase:deploy:preview
```

## Firebase Configuration

### firebase.json Features

- **SPA Routing**: All routes redirect to `/index.html`
- **Cache Headers**: Optimized caching for assets
- **Clean URLs**: Removes `.html` extensions
- **Performance**: Long-term caching for static assets

### Environment Variables

If you need environment variables for production:

1. Create `.env.production` file
2. Add your variables:
   ```
   VITE_API_URL=https://your-api-domain.com
   VITE_FIREBASE_CONFIG=your-config
   ```

### Custom Domain (Optional)

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

## Deployment Commands

```bash
# One-time setup
npm run firebase:install
npm run firebase:login
npm run firebase:init

# Regular deployment
npm run firebase:deploy

# Preview deployment
npm run firebase:deploy:preview

# Manual deployment with script
./deploy.sh
```

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run typecheck`
- Verify build works locally: `npm run build:firebase`

### Deployment Errors
- Verify Firebase project exists and you have permissions
- Check `.firebaserc` has correct project ID
- Ensure you're logged in: `firebase login --reauth`

### Performance Optimization
- Enable compression in Firebase Console
- Use Firebase CDN for global distribution
- Monitor Core Web Vitals in Firebase Performance

## Costs

Firebase Hosting free tier includes:
- **10 GB storage**
- **10 GB/month transfer**
- **1 GB/month** for Cloud Functions

This is more than sufficient for ToolGalaxy.

## Live URLs

After deployment, your app will be available at:
- **Primary**: `https://your-project-id.web.app`
- **Alternative**: `https://your-project-id.firebaseapp.com`

## Monitoring

Monitor your deployment in Firebase Console:
- **Hosting**: Usage, performance, and deployments
- **Analytics**: User engagement and traffic
- **Performance**: Core Web Vitals and loading metrics

---

🚀 **Your ToolGalaxy app is now ready for Firebase deployment!**
