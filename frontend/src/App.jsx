import { useState } from 'react'
import { Upload, Download, Image as ImageIcon, Loader2, Sparkles, CheckCircle } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setProcessedImage(null)
      setError(null)
      setSuccess(false)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setProcessedImage(null)
      setError(null)
      setSuccess(false)
    }
  }

  const handleRemoveBackground = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post(`${API_URL}/remove-background`, formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const imageUrl = URL.createObjectURL(response.data)
      setProcessedImage(imageUrl)
      setSuccess(true)
    } catch (err) {
      setError('处理图片时出错，请重试')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      link.download = 'background-removed.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setProcessedImage(null)
    setError(null)
    setSuccess(false)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">智能抠图</h1>
                <p className="text-sm text-gray-300">AI Background Removal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            一键智能抠图
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            使用先进的AI技术，自动去除图片背景，支持多种图片格式
          </p>
        </div>

        {/* Upload Area */}
        {!previewUrl && (
          <div
            className="max-w-2xl mx-auto"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <label className="block">
              <div className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-white/5 transition-all duration-300">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-white mb-2">点击或拖拽上传图片</p>
                <p className="text-sm text-gray-400">支持 PNG, JPG, JPEG, WebP 等格式</p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
            </label>
          </div>
        )}

        {/* Preview and Result */}
        {previewUrl && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Original Image */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  原始图片
                </h3>
                <div className="relative aspect-square bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Processed Image */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  处理结果
                </h3>
                <div className="relative aspect-square bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                  {isProcessing ? (
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                      <p className="text-gray-300">正在处理中...</p>
                    </div>
                  ) : processedImage ? (
                    <img
                      src={processedImage}
                      alt="Processed"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>等待处理</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {!processedImage && !isProcessing && (
                <button
                  onClick={handleRemoveBackground}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>开始抠图</span>
                </button>
              )}

              {processedImage && (
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  <span>下载结果</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                重新上传
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-6 bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-green-300">处理完成！</p>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI 智能识别</h3>
            <p className="text-gray-400">使用先进的深度学习模型，精准识别主体</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">简单易用</h3>
            <p className="text-gray-400">拖拽上传，一键处理，无需专业技能</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 text-center">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">快速下载</h3>
            <p className="text-gray-400">处理完成后立即下载，支持 PNG 格式</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            智能抠图 - 基于 AI 的图片背景去除工具
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
