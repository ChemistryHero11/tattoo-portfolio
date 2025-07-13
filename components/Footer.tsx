import Link from 'next/link'
import { FaInstagram, FaTiktok, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/gallery', label: 'Gallery' },
    { href: '/booking', label: 'Book Now' },
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
  ]

  const socialLinks = [
    { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://tiktok.com', icon: FaTiktok, label: 'TikTok' },
    { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
  ]

  return (
    <footer className="bg-charcoal border-t border-off-white/10 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-blood-red mb-4">INK MASTER</h3>
            <p className="text-off-white/70 mb-4">
              Where every tattoo tells a story and every design is a masterpiece.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-off-white/70 hover:text-blood-red transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold text-off-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-off-white/70 hover:text-blood-red transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold text-off-white mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:info@inkmaster.com"
                className="flex items-center space-x-2 text-off-white/70 hover:text-blood-red transition-colors duration-300"
              >
                <FaEnvelope />
                <span>info@inkmaster.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-off-white/70 hover:text-blood-red transition-colors duration-300"
              >
                <FaPhone />
                <span>(123) 456-7890</span>
              </a>
              <p className="text-off-white/70">
                123 Tattoo Street<br />
                Art District, AD 12345
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-off-white/10 pt-8 text-center">
          <p className="text-off-white/50 text-sm">
            © {currentYear} Ink Master. All rights reserved. | 
            <Link href="/privacy" className="hover:text-blood-red transition-colors duration-300 ml-1">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
