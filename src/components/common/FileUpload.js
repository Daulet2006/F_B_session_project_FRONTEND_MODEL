// src/components/common/FileUpload.js
import { useState, useRef } from "react"

const FileUpload = ({ onChange, preview, label = "Upload Image" }) => {
  const [previewUrl, setPreviewUrl] = useState(preview || "")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Create a preview URL
    const fileUrl = URL.createObjectURL(file)
    setPreviewUrl(fileUrl)

    // Call the parent onChange handler
    onChange(file)
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="space-y-2">
      <label className="form-label">{label}</label>

      <div
        onClick={handleClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors"
      >
        {previewUrl ? (
          <div className="space-y-4">
            <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="mx-auto max-h-48 object-contain" />
            <p className="text-sm text-gray-500">Click to change image</p>
          </div>
        ) : (
          <div className="py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
          </div>
        )}

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
    </div>
  )
}

export default FileUpload
