'use client'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onTagSelect: (tag: string) => void
}

const TagFilter = ({ tags, activeTag, onTagSelect }: TagFilterProps) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 mb-8 px-4 min-w-max md:justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`
              px-3 py-1.5 md:px-4 md:py-2 font-semibold text-xs md:text-sm uppercase tracking-wider
              transition-all duration-300 border-2 relative whitespace-nowrap
              ${
                activeTag === tag
                  ? 'text-blood-red border-blood-red'
                  : 'text-off-white/70 border-off-white/30 hover:text-off-white hover:border-off-white'
              }
            `}
          >
            {tag}
            {activeTag === tag && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blood-red animate-fade-in"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter
