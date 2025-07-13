'use client'

import Image from 'next/image'

interface ImageCardProps {
  src: string
  alt: string
  style?: string
  onClick?: () => void
}

const ImageCard = ({ src, alt, style, onClick }: ImageCardProps) => {
  return (
    <div 
      className="relative group cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden bg-charcoal/50">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {style && (
              <p className="text-blood-red font-semibold text-sm uppercase tracking-wider">
                {style}
              </p>
            )}
            <p className="text-off-white text-sm mt-1">{alt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
