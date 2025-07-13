import { getCloudinaryImages } from './cloudinary'

// Cache for images to avoid multiple API calls
let cachedImages: any[] | null = null

export async function getAllImages() {
  if (cachedImages) {
    return cachedImages
  }
  
  const images = await getCloudinaryImages()
  cachedImages = images
  return images
}

export async function getHeroImages() {
  const allImages = await getAllImages()
  // Return first 6 images for hero carousel, or all if less than 6
  return allImages.slice(0, 6)
}

export async function getFeaturedImages() {
  const allImages = await getAllImages()
  // Return up to 6 featured images (can be same as hero or different selection)
  // For now, return all images up to 6
  return allImages.slice(0, 6)
}

// Clear cache when new images are uploaded
export function clearImageCache() {
  cachedImages = null
}
