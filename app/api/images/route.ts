import { NextResponse } from 'next/server'
import { fetchCloudinaryImages } from '@/lib/cloudinary-api'

// Placeholder images as fallback
const placeholderImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
    alt: 'Geometric wolf portrait tattoo',
    style: 'Geometric',
    tags: ['Geometric', 'Portrait', 'Animal', 'Blackwork'],
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80',
    alt: 'Floral design tattoo',
    style: 'Blackwork',
    tags: ['Floral', 'Nature', 'Blackwork', 'Traditional'],
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80',
    alt: 'Minimalist line art tattoo',
    style: 'Minimalist',
    tags: ['Line', 'Minimalist', 'Simple', 'Modern'],
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&q=80',
    alt: 'Traditional Japanese tattoo',
    style: 'Japanese',
    tags: ['Japanese', 'Traditional', 'Color', 'Detailed'],
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80',
    alt: 'Skull and roses tattoo',
    style: 'Neo-Traditional',
    tags: ['Skull', 'Roses', 'Neo-Traditional', 'Blackwork'],
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1475163007786-36b3604985b1?w=800&q=80',
    alt: 'Mandala design tattoo',
    style: 'Geometric',
    tags: ['Mandala', 'Geometric', 'Pattern', 'Detailed'],
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80',
    alt: 'Portrait realism tattoo',
    style: 'Realism',
    tags: ['Portrait', 'Realism', 'Detailed', 'Blackwork'],
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80',
    alt: 'Flash tattoo designs',
    style: 'Flash',
    tags: ['Flash', 'Traditional', 'Sheet', 'Various'],
  },
]

// GET /api/images - Return uploaded images from Cloudinary or placeholders
export async function GET() {
  try {
    // Try to fetch images from Cloudinary first
    const cloudinaryImages = await fetchCloudinaryImages()
    
    // Use Cloudinary images if available, otherwise use placeholders
    const images = cloudinaryImages.length > 0 ? cloudinaryImages : placeholderImages
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}
