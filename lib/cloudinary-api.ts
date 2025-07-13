import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface CloudinaryImage {
  id: string
  src: string
  alt: string
  style: string
  tags: string[]
}

// Fetch images from your Cloudinary account
export async function fetchCloudinaryImages(): Promise<CloudinaryImage[]> {
  try {
    console.log('Fetching images from Cloudinary...')
    console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
    
    // Fetch all images from your Cloudinary account
    const result = await cloudinary.search
      .expression('resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute()

    console.log('Cloudinary response:', result)
    console.log('Number of images found:', result.resources?.length || 0)

    // Filter out sample images and transform to our format
    const tattooImages = result.resources
      .filter((resource: any) => {
        // Only include images from tattoo-portfolio folder or with tattoo-related names
        const publicId = resource.public_id?.toLowerCase() || ''
        const folder = resource.folder || ''
        return folder === 'tattoo-portfolio' || 
               (!publicId.includes('sample') && !publicId.includes('logo'))
      })
      .map((resource: any, index: number) => ({
        id: resource.public_id,
        src: resource.secure_url,
        alt: resource.context?.alt || `Tattoo design ${index + 1}`,
        style: resource.context?.custom?.style || determineStyle(resource),
        tags: resource.tags || [],
      }))
    
    console.log('Filtered tattoo images:', tattooImages.length)
    return tattooImages
  } catch (error) {
    console.error('Error fetching from Cloudinary:', error)
    // Return empty array if fetch fails
    return []
  }
}

// Helper to determine style from filename or tags
function determineStyle(resource: any): string {
  const filename = resource.filename?.toLowerCase() || ''
  const tags = resource.tags || []
  
  // Check tags first
  if (tags.includes('geometric')) return 'Geometric'
  if (tags.includes('realism')) return 'Realism'
  if (tags.includes('blackwork')) return 'Blackwork'
  if (tags.includes('traditional')) return 'Traditional'
  if (tags.includes('minimalist')) return 'Minimalist'
  
  // Check filename
  if (filename.includes('geometric')) return 'Geometric'
  if (filename.includes('realism')) return 'Realism'
  if (filename.includes('portrait')) return 'Realism'
  if (filename.includes('traditional')) return 'Traditional'
  if (filename.includes('minimal')) return 'Minimalist'
  
  return 'Blackwork' // Default style
}
