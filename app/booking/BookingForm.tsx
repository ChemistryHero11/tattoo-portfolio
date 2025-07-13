'use client'

import { useState } from 'react'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredStyle: '',
    idea: '',
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob)
      }
    })

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '#', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredStyle: '',
          idea: '',
          file: null,
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-off-white font-semibold mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white placeholder-off-white/50 focus:border-blood-red transition-colors duration-300"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-off-white font-semibold mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white placeholder-off-white/50 focus:border-blood-red transition-colors duration-300"
          placeholder="john@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-off-white font-semibold mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white placeholder-off-white/50 focus:border-blood-red transition-colors duration-300"
          placeholder="(123) 456-7890"
        />
      </div>

      {/* Preferred Style */}
      <div>
        <label htmlFor="preferredStyle" className="block text-off-white font-semibold mb-2">
          Preferred Style
        </label>
        <select
          id="preferredStyle"
          name="preferredStyle"
          value={formData.preferredStyle}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white focus:border-blood-red transition-colors duration-300"
        >
          <option value="">Select a style</option>
          <option value="blackwork">Blackwork</option>
          <option value="neo-traditional">Neo-Traditional</option>
          <option value="japanese">Japanese</option>
          <option value="realism">Realism</option>
          <option value="geometric">Geometric</option>
          <option value="color">Color</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Idea Description */}
      <div>
        <label htmlFor="idea" className="block text-off-white font-semibold mb-2">
          Describe Your Tattoo Idea *
        </label>
        <textarea
          id="idea"
          name="idea"
          value={formData.idea}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white placeholder-off-white/50 focus:border-blood-red transition-colors duration-300 resize-none"
          placeholder="Tell me about your tattoo idea, placement, size, and any specific details..."
        />
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="file" className="block text-off-white font-semibold mb-2">
          Reference Images (Optional)
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blood-red file:text-off-white hover:file:bg-blood-red/80"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/20 border border-green-500 text-green-400 text-center">
          Thank you! Your booking request has been sent. I&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500 text-red-400 text-center">
          Sorry, there was an error sending your request. Please try again or contact me directly.
        </div>
      )}
    </form>
  )
}

export default BookingForm
