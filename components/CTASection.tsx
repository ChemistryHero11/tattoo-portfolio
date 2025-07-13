'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const speed = 0.5
      const yPos = rect.top * speed
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        parallaxRef.current.style.transform = `translateY(${yPos}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative section-padding overflow-hidden bg-black">
      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 -top-20 -bottom-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal to-black opacity-90"></div>
        <div className="absolute inset-0 noise-overlay"></div>
      </div>
      
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
            <span className="text-sm uppercase tracking-[0.3em] text-grey-400 mb-8 block">
              Start Your Journey
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-white mb-8">
              Transform Your
              <br />
              <span className="font-normal">Vision</span> Into
              <br />
              <span className="text-grey-400">Art</span>
            </h2>
          </div>
          
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000" style={{ transitionDelay: '200ms' }}>
            <p className="text-grey-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Every tattoo tells a story. Let's craft yours with precision, 
              artistry, and a minimalist approach that stands the test of time.
            </p>
          </div>
          
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000" style={{ transitionDelay: '400ms' }}>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link 
                href="/gallery" 
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 block px-12 py-4 text-white border border-white/20 uppercase tracking-wider text-sm transition-all duration-500 group-hover:text-black">
                  View Portfolio
                </span>
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
              
              <Link 
                href="/booking" 
                className="group relative overflow-hidden bg-white"
              >
                <span className="relative z-10 block px-12 py-4 text-black uppercase tracking-wider text-sm font-medium transition-all duration-500">
                  Book Session
                </span>
                <span className="absolute inset-0 bg-grey-100 transform scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100"></span>
              </Link>
            </div>
          </div>
          
          {/* Bottom accent */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 mt-20" style={{ transitionDelay: '600ms' }}>
            <div className="flex items-center justify-center gap-8">
              <span className="h-px w-20 bg-grey-600"></span>
              <span className="text-grey-600 text-xs uppercase tracking-[0.2em]">Est. 2015</span>
              <span className="h-px w-20 bg-grey-600"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
