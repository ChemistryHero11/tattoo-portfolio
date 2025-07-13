import { Metadata } from 'next'
import { Suspense } from 'react'
import GalleryClient from './GalleryClient'
import { getCloudinaryImages } from '@/lib/cloudinary'

export const metadata: Metadata = {
  title: 'Gallery | Ink Master Portfolio',
  description: 'Browse our extensive collection of tattoo designs including blackwork, neo-traditional, color, and flash art.',
}

export default async function GalleryPage() {
  // Server-side fetch images from Cloudinary
  const images = await getCloudinaryImages()
  console.log('Gallery page - fetched images:', images.length)

  return (
    <div className="page-transition min-h-screen">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="spinner"></div></div>}>
        <GalleryClient initialImages={images} />
      </Suspense>
    </div>
  )
}
