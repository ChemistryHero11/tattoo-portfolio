'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

interface UploadResult {
  file: string
  status: 'success' | 'error'
  message?: string
}

const ImageUploader = () => {
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<UploadResult[]>([])

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '')
    formData.append('folder', 'portfolio')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      return { file: file.name, status: 'success' as const }
    } catch (error) {
      return { file: file.name, status: 'error' as const, message: 'Upload failed' }
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    setResults([])

    const uploadPromises = acceptedFiles.map(uploadToCloudinary)
    const uploadResults = await Promise.all(uploadPromises)
    
    setResults(uploadResults)
    setUploading(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive 
            ? 'border-blood-red bg-blood-red/10' 
            : 'border-off-white/30 hover:border-blood-red hover:bg-charcoal/30'
          }
        `}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto text-4xl text-blood-red mb-4" />
        {isDragActive ? (
          <p className="text-off-white">Drop the images here...</p>
        ) : (
          <div>
            <p className="text-off-white mb-2">Drag & drop images here</p>
            <p className="text-off-white/70 text-sm">or click to select files</p>
          </div>
        )}
      </div>

      {uploading && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blood-red"></div>
          <p className="text-off-white/70 mt-2">Uploading images...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-off-white font-semibold mb-2">Upload Results:</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded ${
                result.status === 'success' 
                  ? 'bg-green-500/20 border border-green-500/50' 
                  : 'bg-red-500/20 border border-red-500/50'
              }`}
            >
              <span className="text-off-white text-sm">{result.file}</span>
              {result.status === 'success' ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageUploader
