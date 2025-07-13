'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [heroImages, setHeroImages] = useState<string[]>([])
  
  useEffect(() => {
    // Fetch images dynamically
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        const imageUrls = data.images.map((img: any) => img.src)
        setHeroImages(imageUrls)
      })
      .catch(() => {
        console.error('Failed to fetch hero images')
      })
  }, [])

  useEffect(() => {
    if (heroImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Slightly slower for smoother transitions
    return () => clearInterval(interval)
  }, [heroImages])

  return (
    <section className="relative h-screen overflow-hidden bg-white">
      {/* Background Image Carousel with enhanced contrast */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 hero-image-transition gpu-accelerated ${
              index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <Image
              src={img}
              alt="High contrast tattoo art"
              fill
              priority={index === 0}
              quality={95}
              className="object-cover filter grayscale contrast-125"
              onLoad={() => index === 0 && setImageLoaded(true)}
            />
            {/* Enhanced overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
            {/* Noise overlay for texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay noise"></div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1 transition-all duration-500 ${
              index === currentImage ? 'w-12 bg-white' : 'w-6 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <div className={`container-wide w-full transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="max-w-3xl relative">
              {/* Glass morphism background */}
              <div className="absolute inset-0 -inset-x-12 -inset-y-8 bg-black/20 backdrop-blur-sm rounded-3xl" />
              <div className="relative z-10 p-12">
              {/* Animated title with better visibility */}
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tighter mb-8 text-white">
                <span className="block overflow-hidden">
                  <span className="block animate-[slideUp_1s_ease-out_0.2s_both]">MINIMALIST</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block animate-[slideUp_1s_ease-out_0.4s_both]">LUXURY</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block animate-[slideUp_1s_ease-out_0.6s_both] opacity-80">TATTOOS</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-md mb-12 leading-relaxed animate-[fadeIn_1s_ease-out_0.8s_both]">
                Where minimalist artistry meets timeless expression. 
                Each design crafted with precision and purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 animate-[fadeIn_1s_ease-out_1s_both]">
                <Link 
                  href="/gallery" 
                  className="group inline-flex items-center gap-4 text-sm uppercase tracking-wider text-white"
                >
                  <span className="relative">
                    View Gallery
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                  </span>
                  <span className="w-12 h-px bg-white/40 transition-all duration-500 group-hover:w-20 group-hover:bg-white"></span>
                </Link>
                <Link 
                  href="/booking" 
                  className="group inline-flex items-center gap-4 text-sm uppercase tracking-wider text-white border border-white/30 px-6 py-3 transition-all duration-500 hover:bg-white hover:text-black"
                >
                  <span className="relative">
                    Book Session
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-4 animate-[fadeIn_1s_ease-out_1.2s_both]">
            <span className="text-xs uppercase tracking-[0.3em] text-white/60 rotate-90 origin-center mb-8">Scroll</span>
            <div className="relative w-px h-20 bg-white/20 overflow-hidden">
              <div className="absolute top-0 w-full h-6 bg-white animate-[slideDown_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(400%); }
          100% { transform: translateY(400%); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
