import { Metadata } from 'next'
import GalleryClient from './GalleryClient'
import { getCloudinaryImages } from '@/lib/cloudinary'

export const metadata: Metadata = {
  title: 'Gallery | Ink Master Portfolio',
  description: 'Browse our extensive collection of tattoo designs including blackwork, neo-traditional, color, and flash art.',
}

export default async function GalleryPage() {
  // Server-side fetch images from Cloudinary
  const images = await getCloudinaryImages()

  return (
    <div className="page-transition min-h-screen">
      <GalleryClient initialImages={images} />
    </div>
  )
}
