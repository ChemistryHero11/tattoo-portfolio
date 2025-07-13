interface CloudinaryImage {
  id: string
  src: string
  alt: string
  style: string
  tags: string[]
}

interface CloudinaryResource {
  public_id: string
  secure_url: string
  context?: {
    custom?: {
      alt?: string
      caption?: string
      tags?: string
    }
  }
  tags?: string[]
  created_at: string
}

// Helper function to determine style from filename or tags
function determineStyle(filename: string, tags: string[]): string {
  const lowerFilename = filename.toLowerCase()
  const lowerTags = tags.map(t => t.toLowerCase())
  
  // Check tags first
  if (lowerTags.includes('realism')) return 'Realism'
  if (lowerTags.includes('blackwork')) return 'Blackwork'
  if (lowerTags.includes('minimalist')) return 'Minimalist'
  if (lowerTags.includes('geometric')) return 'Geometric'
  if (lowerTags.includes('traditional')) return 'Traditional'
  if (lowerTags.includes('portrait')) return 'Portrait'
  if (lowerTags.includes('nature')) return 'Nature'
  
  // Check filename
  if (lowerFilename.includes('portrait') || lowerFilename.includes('face')) return 'Portrait'
  if (lowerFilename.includes('geometric') || lowerFilename.includes('mandala')) return 'Geometric'
  if (lowerFilename.includes('animal') || lowerFilename.includes('bird') || lowerFilename.includes('dog')) return 'Nature'
  if (lowerFilename.includes('cross') || lowerFilename.includes('religious')) return 'Religious'
  if (lowerFilename.includes('minimal') || lowerFilename.includes('simple')) return 'Minimalist'
  
  // Default style
  return 'Blackwork'
}

// User's uploaded images - These are now fetched from Cloudinary API
const userImages: CloudinaryImage[] = []

// Server-side function to get images from the API route
export async function getCloudinaryImages(): Promise<CloudinaryImage[]> {
  // In production, we need to use absolute URL for server-side fetches
  // Try to get the URL from environment variable first
  let apiUrl = '/api/images'
  
  if (process.env.VERCEL_URL) {
    // Vercel provides this automatically
    apiUrl = `https://${process.env.VERCEL_URL}/api/images`
  } else if (process.env.NEXT_PUBLIC_SITE_URL) {
    // Fallback to manual env var
    apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/images`
  } else if (typeof window === 'undefined') {
    // Server-side fallback
    apiUrl = 'http://localhost:3000/api/images'
  }
  
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`)
    }
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Error fetching images from:', apiUrl, error)
    // Return empty array instead of static images to see if API is working
    return []
  }
}

export function generateCloudinaryUrl(publicId: string, transformations?: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`
  }
  
  return `${baseUrl}/${publicId}`
}
