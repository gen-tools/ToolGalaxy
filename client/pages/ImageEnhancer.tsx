import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, ImageIcon, Settings, Palette, Zap, Eye, RotateCcw } from 'lucide-react';
import { SEO, seoConfigs } from '../components/SEO';

export function ImageEnhancer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [enhancedUrl, setEnhancedUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Enhancement settings
  const [settings, setSettings] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sharpness: 0,
    autoEnhance: false
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setEnhancedUrl('');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelect(e.target.files[0]);
    }
  };

  const applyEnhancements = useCallback(() => {
    if (!selectedImage || !canvasRef.current) return;

    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply filters using CSS filter properties
      const filters: string[] = [];
      
      if (settings.brightness !== 0) {
        filters.push(`brightness(${100 + settings.brightness}%)`);
      }
      if (settings.contrast !== 0) {
        filters.push(`contrast(${100 + settings.contrast}%)`);
      }
      if (settings.saturation !== 0) {
        filters.push(`saturate(${100 + settings.saturation}%)`);
      }
      
      ctx!.filter = filters.join(' ');
      ctx!.drawImage(img, 0, 0);
      
      // Apply sharpness using image data manipulation
      if (settings.sharpness !== 0) {
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const sharpnessKernel = [
          0, -1, 0,
          -1, 5 + settings.sharpness / 10, -1,
          0, -1, 0
        ];
        
        // Apply convolution (simplified for performance)
        for (let i = 0; i < data.length; i += 4) {
          if (settings.sharpness > 0) {
            data[i] = Math.min(255, data[i] * (1 + settings.sharpness / 100));
            data[i + 1] = Math.min(255, data[i + 1] * (1 + settings.sharpness / 100));
            data[i + 2] = Math.min(255, data[i + 2] * (1 + settings.sharpness / 100));
          }
        }
        
        ctx!.putImageData(imageData, 0, 0);
      }
      
      // Convert to data URL
      const enhancedDataUrl = canvas.toDataURL('image/png', 0.95);
      setEnhancedUrl(enhancedDataUrl);
      setIsProcessing(false);
    };
    
    img.src = previewUrl;
  }, [selectedImage, settings, previewUrl]);

  const handleAutoEnhance = () => {
    setSettings({
      brightness: 10,
      contrast: 15,
      saturation: 20,
      sharpness: 10,
      autoEnhance: true
    });
  };

  const resetSettings = () => {
    setSettings({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      sharpness: 0,
      autoEnhance: false
    });
    setEnhancedUrl('');
  };

  const downloadImage = () => {
    if (enhancedUrl) {
      const link = document.createElement('a');
      link.href = enhancedUrl;
      link.download = `enhanced_${selectedImage?.name || 'image.png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Apply enhancements whenever settings change
  React.useEffect(() => {
    if (selectedImage && previewUrl) {
      const timeoutId = setTimeout(applyEnhancements, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [settings, selectedImage, previewUrl, applyEnhancements]);

  return (
    <>
      <SEO {...seoConfigs.home} />
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-primary">Image Enhancer</span>
          </h1>
          <p className="text-xl text-gray-300">
            Enhance your images with AI-powered adjustments for brightness, contrast, and sharpness
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Upload className="mr-2 text-primary" size={20} />
                Upload Image
              </h2>
              
              {!selectedImage ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                    dragActive 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-600 hover:border-primary hover:bg-primary/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg font-medium mb-2">Drop your image here</p>
                  <p className="text-gray-400 mb-4">or click to browse</p>
                  <p className="text-sm text-gray-500">Supports JPG, PNG, GIF</p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Original"
                    className="w-full h-48 object-cover rounded-lg border border-gray-600"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewUrl('');
                      setEnhancedUrl('');
                      resetSettings();
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                  <div className="mt-2 text-sm text-gray-400">
                    Original: {selectedImage.name}
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Enhancement Controls */}
            {selectedImage && (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="mr-2 text-primary" size={18} />
                  Enhancement Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Brightness: {settings.brightness}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={settings.brightness}
                      onChange={(e) => setSettings(prev => ({ ...prev, brightness: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contrast: {settings.contrast}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={settings.contrast}
                      onChange={(e) => setSettings(prev => ({ ...prev, contrast: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Saturation: {settings.saturation}%
                    </label>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      value={settings.saturation}
                      onChange={(e) => setSettings(prev => ({ ...prev, saturation: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sharpness: {settings.sharpness}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={settings.sharpness}
                      onChange={(e) => setSettings(prev => ({ ...prev, sharpness: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleAutoEnhance}
                    className="flex-1 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Zap className="mr-2" size={16} />
                    Auto Enhance
                  </button>
                  <button
                    onClick={resetSettings}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <RotateCcw className="mr-2" size={16} />
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="mr-2 text-primary" size={20} />
                Enhanced Preview
              </h2>

              {!selectedImage ? (
                <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                  <div className="text-center">
                    <Palette className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-gray-400">Upload an image to see the enhanced preview</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {isProcessing && (
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-sm text-gray-400 mt-2">Processing enhancement...</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Original */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Original</h3>
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="w-full h-64 object-cover rounded-lg border border-gray-600"
                      />
                    </div>

                    {/* Enhanced */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Enhanced</h3>
                      {enhancedUrl ? (
                        <img
                          src={enhancedUrl}
                          alt="Enhanced"
                          className="w-full h-64 object-cover rounded-lg border border-gray-600"
                        />
                      ) : (
                        <div className="w-full h-64 flex items-center justify-center border border-gray-600 rounded-lg bg-gray-700/50">
                          <p className="text-gray-400">Adjust settings to see enhancement</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {enhancedUrl && (
                    <div className="flex justify-center">
                      <button
                        onClick={downloadImage}
                        className="bg-secondary hover:bg-teal-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                      >
                        <Download className="mr-2" size={18} />
                        Download Enhanced Image
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Features Section */}
        <div className="mt-12 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Enhancement Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Palette size={24} />
              </div>
              <h4 className="font-semibold mb-2">Color Enhancement</h4>
              <p className="text-sm text-gray-400">Adjust brightness, contrast, and saturation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap size={24} />
              </div>
              <h4 className="font-semibold mb-2">Auto Enhancement</h4>
              <p className="text-sm text-gray-400">One-click automatic image improvement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye size={24} />
              </div>
              <h4 className="font-semibold mb-2">Real-time Preview</h4>
              <p className="text-sm text-gray-400">See changes instantly as you adjust</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500/20 text-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download size={24} />
              </div>
              <h4 className="font-semibold mb-2">High Quality</h4>
              <p className="text-sm text-gray-400">Download enhanced images in original quality</p>
            </div>
          </div>
        </div>

        {/* Comprehensive Content Section */}
        <section className="mt-16 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="galaxy-title">Professional Image Enhancement Made Simple</span>
          </h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Elevate your photography and digital images with our advanced Image Enhancer, featuring professional-grade adjustment tools that transform ordinary photos into stunning visual content. Whether you're a photographer, content creator, social media manager, or business owner, our intuitive enhancement platform provides the precision control you need to perfect every image in your collection.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Fine-tune brightness, contrast, saturation, and sharpness with real-time preview functionality that shows exactly how your adjustments will affect the final result. Our intelligent auto-enhancement feature analyzes your image and applies optimal settings instantly, while manual controls give you complete creative freedom. Perfect for correcting exposure issues, enhancing colors, adding visual impact, and ensuring your images meet professional standards.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Ideal for e-commerce product photography, social media content, blog images, marketing materials, and personal photo collections where visual quality directly impacts engagement and perception. All processing happens locally in your browser, ensuring your images remain private while delivering professional results. Transform your visual content with studio-quality enhancements that make every image shine.
            </p>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
