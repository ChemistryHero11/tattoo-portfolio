import { Metadata } from 'next'
import BookingForm from './BookingForm'

export const metadata: Metadata = {
  title: 'Book a Session | Ink Master Portfolio',
  description: 'Book your custom tattoo consultation. Share your ideas and let\'s create something amazing together.',
}

export default function BookingPage() {
  return (
    <div className="page-transition min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-off-white mb-4">
            Book a Session
          </h1>
          <div className="w-20 h-1 bg-blood-red mx-auto mb-6"></div>
          <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
            Ready to bring your tattoo vision to life? Fill out the form below and I'll get back to you within 24-48 hours.
          </p>
        </div>

        <BookingForm />

        {/* Additional Info */}
        <div className="mt-12 bg-charcoal/50 border border-off-white/10 p-8">
          <h2 className="font-cinzel text-2xl font-semibold text-off-white mb-4">
            Before You Book
          </h2>
          <ul className="space-y-3 text-off-white/70">
            <li className="flex items-start">
              <span className="text-blood-red mr-2">•</span>
              <span>All consultations require a $50 non-refundable deposit that goes toward your final tattoo cost</span>
            </li>
            <li className="flex items-start">
              <span className="text-blood-red mr-2">•</span>
              <span>Please be as detailed as possible about your design idea</span>
            </li>
            <li className="flex items-start">
              <span className="text-blood-red mr-2">•</span>
              <span>Reference images are highly encouraged</span>
            </li>
            <li className="flex items-start">
              <span className="text-blood-red mr-2">•</span>
              <span>Minimum age requirement is 18 years old with valid ID</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
