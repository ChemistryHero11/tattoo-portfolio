import { Metadata } from 'next'
import FAQItem from './FAQItem'
import faqData from '@/data/faq.json'

export const metadata: Metadata = {
  title: 'FAQ | Ink Master Portfolio',
  description: 'Frequently asked questions about tattoos, aftercare, pricing, and booking process.',
}

export default function FAQPage() {
  return (
    <div className="page-transition min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-off-white mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-20 h-1 bg-blood-red mx-auto mb-6"></div>
          <p className="text-off-white/70 text-lg max-w-2xl mx-auto">
            Find answers to common questions about the tattoo process, aftercare, and what to expect
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {Object.entries(faqData.categories).map(([category, questions]) => (
            <div key={category}>
              <h2 className="font-cinzel text-2xl font-semibold text-off-white mb-6 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <div className="space-y-4">
                {questions.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-charcoal/50 border border-off-white/20 p-8">
          <h3 className="font-cinzel text-2xl font-semibold text-off-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-off-white/70 mb-6">
            Don't hesitate to reach out! I'm here to help make your tattoo experience as smooth as possible.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  )
}
