'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-off-white/20 hover:border-blood-red/50 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-charcoal/30 transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <span className="text-off-white font-semibold pr-4">{question}</span>
        <FaChevronDown
          className={`text-blood-red flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={16}
        />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4 animate-fade-in">
          <p className="text-off-white/70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default FAQItem
