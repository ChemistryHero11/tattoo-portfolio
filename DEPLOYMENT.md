# Vercel Deployment Guide

## Prerequisites Completed ✓
- Created private GitHub repository
- Created Vercel project
- Added environment variables in Vercel

## Next Steps to Deploy:

### 1. First, commit and push your code to GitHub:

```bash
# Initialize git if not already done
git init

# Add your GitHub repository as origin (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/tattoo-portfolio.git

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - tattoo portfolio"

# Push to GitHub
git push -u origin main
```

### 2. Connect GitHub to Vercel:

1. Go to your Vercel dashboard
2. Click on your project
3. Go to Settings → Git
4. Click "Connect Git Repository"
5. Select GitHub
6. Authorize Vercel to access your GitHub account
7. Select your tattoo-portfolio repository
8. Choose the main branch

### 3. Verify Environment Variables:

Make sure these are set in Vercel (Settings → Environment Variables):
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

### 4. Deploy:

Once connected, Vercel will automatically:
- Deploy your initial commit
- Set up automatic deployments for future pushes
- Provide you with a production URL

## Troubleshooting:

If deployment fails, check:
1. Build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify environment variables match your .env.local file
4. Check that build command is `npm run build`

## Your Project URLs:
- Production: `https://your-project-name.vercel.app`
- Preview deployments: Created for each push to non-main branches
