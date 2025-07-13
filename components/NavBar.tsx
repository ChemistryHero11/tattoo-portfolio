'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/booking', label: 'Book' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-24">
          {/* Left-aligned Navigation */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative overflow-hidden"
            >
              <span className="text-2xl font-light tracking-[0.3em] text-white mix-blend-difference transition-all duration-500 group-hover:tracking-[0.4em]">
                INKCRAFT
              </span>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-white mix-blend-difference transition-all duration-500 group-hover:w-full"></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-light tracking-wider text-white mix-blend-difference overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-y-[-2px]">
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 h-px bg-white mix-blend-difference transition-all duration-500 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white mix-blend-difference animate-pulse"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - CTA or Menu Button */}
          <div className="flex items-center gap-6">
            <Link 
              href="/booking" 
              className="hidden md:block group relative overflow-hidden border border-white/20 px-6 py-2 text-sm font-light tracking-wider text-white mix-blend-difference transition-all duration-500 hover:border-white/40"
            >
              <span className="relative z-10">Book Session</span>
              <span className="absolute inset-0 bg-white mix-blend-difference transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center"
              aria-label="Toggle menu"
            >
              <span className={`absolute h-px w-7 bg-white mix-blend-difference transition-all duration-500 ${isOpen ? 'rotate-45' : '-translate-y-2.5'}`}></span>
              <span className={`absolute h-px w-7 bg-white mix-blend-difference transition-all duration-500 ${isOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`absolute h-px w-7 bg-white mix-blend-difference transition-all duration-500 ${isOpen ? '-rotate-45' : 'translate-y-2.5'}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Glass effect */}
      <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ${
        isOpen 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform -translate-y-full pointer-events-none'
      }`}>
        <div className="bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="container-wide py-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-lg font-light tracking-wider text-white transition-all duration-300 hover:text-grey-300 hover:translate-x-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
