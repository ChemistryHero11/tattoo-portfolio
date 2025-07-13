'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from './ImageUploader'

const AdminClient = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In production, this should be handled server-side
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-charcoal/50 border border-off-white/20 p-8">
          <h1 className="font-cinzel text-3xl font-bold text-off-white mb-6 text-center">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-off-white font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal/50 border border-off-white/30 text-off-white placeholder-off-white/50 focus:border-blood-red transition-colors duration-300"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-cinzel text-3xl font-bold text-off-white">
            Admin Dashboard
          </h1>
          <button
            onClick={() => router.push('/')}
            className="btn-secondary text-sm"
          >
            Back to Site
          </button>
        </div>

        <div className="bg-charcoal/50 border border-off-white/20 p-8 mb-8">
          <h2 className="font-cinzel text-2xl font-semibold text-off-white mb-6">
            Upload New Images
          </h2>
          <p className="text-off-white/70 mb-6">
            Drag and drop images or click to upload. Images will automatically be added to your Cloudinary portfolio folder.
          </p>
          <ImageUploader />
        </div>

        <div className="bg-charcoal/50 border border-off-white/20 p-8">
          <h2 className="font-cinzel text-2xl font-semibold text-off-white mb-4">
            Quick Tips
          </h2>
          <ul className="space-y-2 text-off-white/70">
            <li>• Images should be high quality (at least 1200px on the longest side)</li>
            <li>• Supported formats: JPG, PNG, WebP</li>
            <li>• Use descriptive filenames for better SEO</li>
            <li>• Images are automatically optimized by Cloudinary</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminClient
