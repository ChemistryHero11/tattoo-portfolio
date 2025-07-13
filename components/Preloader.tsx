'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a maximum loading time to prevent getting stuck
    const maxLoadTime = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Maximum 3 seconds

    // Wait for all images to load
    const images = document.querySelectorAll('img')
    
    // If no images, hide loader immediately after a short delay
    if (images.length === 0) {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(maxLoadTime)
    }

    const imagePromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve()
      return new Promise((resolve) => {
        img.addEventListener('load', resolve)
        img.addEventListener('error', resolve) // Resolve even on error to not block
      })
    })

    Promise.all(imagePromises).then(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 500) // Small delay for smoother transition
    })

    // Cleanup timeout
    return () => clearTimeout(maxLoadTime)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-grey-400 border-t-off-white rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <div className="mt-8 text-off-white text-sm tracking-widest uppercase animate-pulse">
          Loading
        </div>
      </div>
    </div>
  )
}
