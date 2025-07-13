'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import TagFilter from '@/components/TagFilter'
import { motion, useScroll, useTransform } from 'framer-motion'

interface GalleryImage {
  id: string
  src: string
  alt: string
  style: string
  tags: string[]
}

interface GalleryClientProps {
  initialImages: GalleryImage[]
}

const GalleryClient = ({ initialImages }: GalleryClientProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(initialImages)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedStyle = searchParams.get('style')

  const availableTags = [
    'All',
    'Blackwork',
    'Neo-Traditional',
    'Color',
    'Flash',
    'Japanese',
    'Realism',
    'Geometric',
  ]

  useEffect(() => {
    if (!selectedStyle || selectedStyle === 'All') {
      setFilteredImages(initialImages)
    } else {
      setFilteredImages(
        initialImages.filter((img) => 
          img.tags.includes(selectedStyle) || img.style === selectedStyle
        )
      )
    }
  }, [selectedStyle, initialImages])

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag === 'All') {
      params.delete('style')
    } else {
      params.set('style', tag)
    }
    router.push(`/gallery?${params.toString()}`)
  }

  // Setup intersection observer for fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1 }
    )

    const images = document.querySelectorAll('.gallery-image')
    images.forEach((img) => observer.observe(img))

    return () => {
      images.forEach((img) => observer.unobserve(img))
    }
  }, [filteredImages])

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Tag Filter */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-charcoal/80 backdrop-blur-md py-4">
        <div className="container mx-auto px-4">
          <TagFilter
            tags={availableTags}
            activeTag={selectedStyle || 'All'}
            onTagSelect={handleTagSelect}
          />
        </div>
      </div>

      {/* Full Screen Images */}
      <div className="mt-20">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-image relative h-screen flex items-center justify-center overflow-hidden opacity-0 transition-opacity duration-1000"
            style={{
              scrollSnapAlign: 'start',
            }}
          >
            {/* Parallax Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                quality={95}
                priority={index < 2}
              />
            </motion.div>

            {/* Overlay with image info */}
            <motion.div
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="font-cinzel text-xl md:text-2xl lg:text-3xl text-off-white mb-1 md:mb-2">
                {image.style}
              </h3>
              <p className="text-off-white/70 text-sm md:text-base">{image.alt}</p>
            </motion.div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="h-screen flex items-center justify-center">
          <p className="text-off-white/70 text-lg">
            No tattoos found for this style. Check back soon!
          </p>
        </div>
      )}

      {/* Scroll Indicator */}
      {filteredImages.length > 0 && (
        <motion.div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-off-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-off-white/50 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .gallery-image.in-view {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default GalleryClient
