'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ImageCard from './ImageCard'
import LightboxModal from './LightboxModal'

interface FeaturedWork {
  id: string
  src: string
  alt: string
  style: string
  year: string
}

const defaultFeaturedWorks: FeaturedWork[] = []

export default function FeaturedWorks() {
  const [selectedWork, setSelectedWork] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [featuredWorks, setFeaturedWorks] = useState<FeaturedWork[]>(defaultFeaturedWorks)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch images dynamically
    setIsLoading(true)
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        console.log('Featured Works API response:', data)
        const works: FeaturedWork[] = data.images.slice(0, 6).map((img: any, index: number) => ({
          id: img.id,
          src: img.src,
          alt: img.alt,
          style: img.style,
          year: index < 3 ? '2024' : '2023'
        }))
        console.log('Mapped featured works:', works)
        setFeaturedWorks(works)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch featured works:', err)
        setIsLoading(false)
      })
  }, [])

  const handleCardClick = (workId: string) => {
    setSelectedWork(workId)
    setIsLightboxOpen(true)
  }

  return (
    <section ref={sectionRef} className="section-padding bg-grey-50 relative z-10">
      <div className="container-wide">
        <div className="transition-all duration-1000">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-grey-600 mb-4 block">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
                Recent
                <br />
                <span className="text-grey-400">Creations</span>
              </h2>
            </div>
            <Link 
              href="/gallery" 
              className="group inline-flex items-center gap-4 text-sm uppercase tracking-wider mt-8 md:mt-0"
            >
              <span className="relative">
                View All Works
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
              <span className="w-12 h-px bg-grey-400 transition-all duration-300 group-hover:w-20 group-hover:bg-black"></span>
            </Link>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {featuredWorks.map((work: FeaturedWork, index: number) => (
            <div
              key={work.id}
              className={`transition-all duration-1000 ${
                index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: isLoading ? 0 : 1,
                transform: isLoading ? 'translateY(2rem)' : 'translateY(0)'
              }}
            >
              <div 
                className="group relative overflow-hidden bg-grey-100 cursor-pointer h-full"
                onClick={() => handleCardClick(work.id)}
              >
                <div className={`relative ${
                  index % 3 === 0 ? 'aspect-square' : 'aspect-[3/4]'
                }`}>
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="absolute inset-0 w-full h-full object-cover high-contrast transition-all duration-700 group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <p className="text-white text-sm uppercase tracking-wider mb-1">
                        {work.style}
                      </p>
                      <p className="text-white/70 text-xs">
                        {work.year}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedWork && (
        <LightboxModal
          images={featuredWorks}
          currentImage={featuredWorks.find(work => work.id === selectedWork)!}
          onClose={() => {
            setIsLightboxOpen(false)
            setSelectedWork(null)
          }}
        />
      )}
    </section>
  )
}
