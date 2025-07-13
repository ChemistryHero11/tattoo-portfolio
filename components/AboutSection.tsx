'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import aboutData from '@/data/about.json'

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay for smoother sequential animations
            setTimeout(() => {
              entry.target.classList.add('in-view')
            }, 50)
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px' // Trigger slightly after element is visible
      }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-white relative z-10">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
              <span className="text-sm uppercase tracking-[0.3em] text-grey-600 mb-6 block">
                About the Artist
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6 md:mb-8">
                {aboutData.title.split(' ').map((word, i) => (
                  <span key={i} className="block">
                    {word}
                    {i === 0 && <span className="text-grey-400">.</span>}
                  </span>
                ))}
              </h2>
              <div className="space-y-6 text-grey-700 leading-relaxed">
                {aboutData.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex gap-16 mt-12">
                <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200">
                  <div className="text-5xl font-light tracking-tighter">
                    {aboutData.experience}
                  </div>
                  <div className="text-sm uppercase tracking-wider text-grey-600 mt-2">
                    Years Creating
                  </div>
                </div>
                <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
                  <div className="text-5xl font-light tracking-tighter">
                    {aboutData.clients}+
                  </div>
                  <div className="text-sm uppercase tracking-wider text-grey-600 mt-2">
                    Works Completed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="animate-on-scroll opacity-0 scale-95 transition-all duration-1000 delay-300">
              <div className="relative aspect-[3/4] overflow-hidden bg-grey-100">
                <Image
                  src="/tattoo-artist-portrait.jpg"
                  alt="Colin Griffin - Tattoo Artist"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover high-contrast hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-grey-300 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
