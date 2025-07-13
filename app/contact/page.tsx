import { Metadata } from 'next'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaClock } from 'react-icons/fa'
import contactData from '@/data/contact.json'

export const metadata: Metadata = {
  title: 'Contact | Ink Master Portfolio',
  description: 'Get in touch with Ink Master. Visit our studio or reach out for consultations and bookings.',
}

export default function ContactPage() {
  return (
    <div className="page-transition min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-off-white mb-4">
            Get in Touch
          </h1>
          <div className="w-20 h-1 bg-blood-red mx-auto mb-6"></div>
          <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
            Visit our studio or reach out to discuss your next tattoo project
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-cinzel text-2xl font-semibold text-off-white mb-6">
                Studio Information
              </h2>
              
              {/* Address */}
              <div className="flex items-start space-x-4 mb-6">
                <FaMapMarkerAlt className="text-blood-red mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Location</h3>
                  <p className="text-off-white/70">
                    {contactData.address.street}<br />
                    {contactData.address.city}, {contactData.address.state} {contactData.address.zip}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 mb-6">
                <FaPhone className="text-blood-red mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Phone</h3>
                  <a href={`tel:${contactData.phone}`} className="text-off-white/70 hover:text-blood-red transition-colors duration-300">
                    {contactData.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 mb-6">
                <FaEnvelope className="text-blood-red mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Email</h3>
                  <a href={`mailto:${contactData.email}`} className="text-off-white/70 hover:text-blood-red transition-colors duration-300">
                    {contactData.email}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-4 mb-6">
                <FaInstagram className="text-blood-red mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-off-white font-semibold mb-1">Instagram</h3>
                  <a 
                    href={`https://instagram.com/${contactData.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-off-white/70 hover:text-blood-red transition-colors duration-300"
                  >
                    @{contactData.instagram}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <FaClock className="text-blood-red mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-off-white font-semibold mb-2">Studio Hours</h3>
                  <div className="space-y-1 text-off-white/70">
                    {Object.entries(contactData.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}:</span>
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-charcoal/50 border border-off-white/20 p-6">
              <h3 className="font-cinzel text-xl font-semibold text-off-white mb-3">
                Walk-ins Welcome
              </h3>
              <p className="text-off-white/70">
                While appointments are preferred, we do accept walk-ins based on availability. 
                For best results and to ensure your spot, we recommend booking a consultation in advance.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] bg-charcoal/50 border border-off-white/20 relative overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6395475!2d${contactData.coordinates.lng}!3d${contactData.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA5JzM2LjAiTiAxMjLCsDI1JzEyLjAiVw!5e0!3m2!1sen!2sus!4v1234567890123`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(100%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ink Master Studio Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
