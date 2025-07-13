'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface LightboxModalProps {
  images: Array<{
    id: string
    src: string
    alt: string
    style?: string
  }>
  currentImage: {
    id: string
    src: string
    alt: string
    style?: string
  }
  onClose: () => void
}

const LightboxModal = ({ images, currentImage, onClose }: LightboxModalProps) => {
  const [activeIndex, setActiveIndex] = useState(
    images.findIndex((img) => img.id === currentImage.id)
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigatePrev()
      if (e.key === 'ArrowRight') navigateNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeIndex])

  const navigatePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const navigateNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const activeImage = images[activeIndex]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-off-white hover:text-blood-red transition-colors duration-300 z-50"
        aria-label="Close lightbox"
      >
        <FaTimes size={24} />
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={navigatePrev}
        className="absolute left-4 text-off-white hover:text-blood-red transition-colors duration-300 z-50"
        aria-label="Previous image"
      >
        <FaChevronLeft size={32} />
      </button>

      <button
        onClick={navigateNext}
        className="absolute right-4 text-off-white hover:text-blood-red transition-colors duration-300 z-50"
        aria-label="Next image"
      >
        <FaChevronRight size={32} />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] mx-auto p-8">
        <div className="relative w-full h-full">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Image Info */}
        <div className="absolute bottom-8 left-8 right-8 text-center">
          {activeImage.style && (
            <p className="text-blood-red font-semibold text-sm uppercase tracking-wider mb-2">
              {activeImage.style}
            </p>
          )}
          <p className="text-off-white text-lg">{activeImage.alt}</p>
        </div>
      </div>
    </div>
  )
}

export default LightboxModal
