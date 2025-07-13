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

export async function getCloudinaryImages(): Promise<CloudinaryImage[]> {
  // For server-side rendering, we need to use the full URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  try {
    const response = await fetch(`${baseUrl}/api/images`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })
    if (!response.ok) {
      throw new Error('Failed to fetch images')
    }
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Error fetching images:', error)
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
