# Cloudinary Setup Guide

Follow these steps to configure Cloudinary for your tattoo portfolio:

## 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account (if you don't have one)
3. Verify your email

## 2. Get Your Credentials

1. Log in to your [Cloudinary Console](https://cloudinary.com/console)
2. On the Dashboard, you'll see:
   - **Cloud Name**: (e.g., `dxxxxxx`)
   - **API Key**: (e.g., `123456789012345`)
   - **API Secret**: (keep this secure!)

## 3. Create an Upload Preset

1. Go to Settings (gear icon) → Upload
2. Scroll to "Upload presets" section
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `tattoo-uploads` (remember this exact name)
   - **Signing Mode**: **Unsigned** (IMPORTANT!)
   - **Folder**: `tattoo-portfolio` (optional, for organization)
5. Under "Upload Control":
   - Set allowed formats: `jpg`, `jpeg`, `png`, `webp`
   - Max file size: 10MB (or your preference)
6. Save the preset

## 4. Update Your Environment Variables

In your `.env.local` file, replace the placeholder values:

```bash
# Required for uploading images
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tattoo-uploads

# Optional: Only if you want to fetch images via API
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 5. Restart Your Development Server

Stop the server (Ctrl+C) and restart:

```bash
npm run dev
```

## 6. Upload Your Images

1. Go to http://localhost:3000/admin
2. Enter your admin password: `TattooAdmin2024!`
3. Upload your tattoo images
4. They'll automatically appear in your gallery!

## Troubleshooting

- **"Upload preset not found"**: Make sure the preset is set to "Unsigned"
- **Images not showing**: Check that your cloud name is correct
- **Upload fails**: Verify file size and format restrictions

## Alternative: Use Local Images Only

If you don't want to set up Cloudinary:
1. Just upload images to `/public/images/` manually
2. Reference them in your code as `/images/filename.jpg`
3. The admin upload won't work, but everything else will

## Testing Upload
1. Go to `/admin`
2. Login with your password
3. Click "Upload New Image"
4. Select a tattoo photo
5. Add tags like "blackwork", "geometric", etc.
6. Click Upload

The image will appear in your Gallery page automatically!
