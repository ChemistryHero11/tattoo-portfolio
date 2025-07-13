import { Metadata } from 'next'
import Image from 'next/image'
import aboutData from '@/data/about.json'

export const metadata: Metadata = {
  title: 'About | Ink Master Portfolio',
  description: 'Learn about our tattoo artist\'s journey, experience, and artistic philosophy.',
}

export default function AboutPage() {
  return (
    <div className="page-transition min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-off-white mb-4">
            About the Artist
          </h1>
          <div className="w-20 h-1 bg-blood-red mx-auto"></div>
        </div>

        {/* Artist Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-blood-red/20 to-transparent overflow-hidden">
              <Image
                src="/images/artist-portrait-2.jpg"
                alt="Tattoo artist portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full border-2 border-blood-red"></div>
          </div>

          <div className="space-y-6">
            <h2 className="font-cinzel text-3xl font-bold text-off-white">
              {aboutData.artistName}
            </h2>
            <p className="text-off-white/80 text-lg leading-relaxed">
              {aboutData.fullBio}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-off-white/20">
              <div>
                <h3 className="font-cinzel text-2xl text-blood-red mb-2">{aboutData.experience}</h3>
                <p className="text-off-white/70">Years of Experience</p>
              </div>
              <div>
                <h3 className="font-cinzel text-2xl text-blood-red mb-2">{aboutData.awards}</h3>
                <p className="text-off-white/70">Industry Awards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="font-cinzel text-3xl font-bold text-off-white text-center mb-12">
            My Journey
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blood-red/30"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {aboutData.timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full md:w-1/2 md:px-8">
                    <div
                      className={`bg-charcoal/50 border border-off-white/20 p-6 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <h3 className="font-cinzel text-2xl text-blood-red mb-2">{item.year}</h3>
                      <h4 className="text-xl font-semibold text-off-white mb-2">{item.title}</h4>
                      <p className="text-off-white/70">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-blood-red rounded-full border-4 border-charcoal z-10">
                    <div className="w-3 h-3 bg-off-white rounded-full"></div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h2 className="font-cinzel text-3xl font-bold text-off-white mb-8">
            Certifications & Training
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-charcoal/50 border border-off-white/20 p-6 hover:border-blood-red transition-colors duration-300"
              >
                <h3 className="font-cinzel text-xl text-blood-red mb-2">{cert.name}</h3>
                <p className="text-off-white/70 text-sm">{cert.issuer}</p>
                <p className="text-off-white/50 text-sm mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
