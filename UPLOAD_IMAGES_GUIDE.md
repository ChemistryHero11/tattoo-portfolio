# How to Upload and Use Your Tattoo Images

## Step 1: Upload Your Images
Place your tattoo images in the `/public/images/` folder with descriptive names:
- `/public/images/geometric-arm-tattoo.jpg`
- `/public/images/minimalist-back-piece.jpg`
- `/public/images/blackwork-sleeve.jpg`
- etc.

## Step 2: Update the Code

### For Hero Section Carousel
In `components/HeroSection.tsx` (lines 12-19), replace:
```typescript
const heroImages = [
  '/images/geometric-arm-tattoo.jpg',
  '/images/minimalist-back-piece.jpg',
  '/images/blackwork-sleeve.jpg',
  // Add more local images
]
```

### For Featured Works Section
In `components/FeaturedWorks.tsx` (lines 8-50), replace:
```typescript
const featuredWorks = [
  {
    id: '1',
    src: '/images/your-tattoo-1.jpg',
    alt: 'Geometric arm piece',
    style: 'Geometric',
    year: '2024',
  },
  {
    id: '2',
    src: '/images/your-tattoo-2.jpg',
    alt: 'Minimalist back tattoo',
    style: 'Minimalist',
    year: '2024',
  },
  // Add more tattoos
]
```

### For About Section (Artist Photo)
In `components/AboutSection.tsx` (around line 75), replace:
```typescript
src="/images/artist-portrait.jpg"
```

## Step 3: For Gallery Page
The gallery page loads images from `data/gallery.json`. Update it with your images:

```json
{
  "tattoos": [
    {
      "id": "1",
      "src": "/images/your-tattoo.jpg",
      "alt": "Description",
      "tags": ["blackwork", "geometric"],
      "date": "2024-01-15"
    }
  ]
}
```

## Image Requirements
- **Format**: JPEG or PNG
- **Size**: 1000-2000px width for best quality
- **Style**: High contrast, well-lit photos work best
- **Naming**: Use descriptive names (e.g., geometric-sleeve-2024.jpg)

## Quick Example
1. Copy your image `amazing-tattoo.jpg` to `/public/images/`
2. In the code, use: `src: '/images/amazing-tattoo.jpg'`
3. Save and refresh the browser
