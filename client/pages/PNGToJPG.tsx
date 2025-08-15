import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Image as ImageIcon, Settings, Palette } from 'lucide-react';
import { SEO, seoConfigs } from '../components/SEO';

interface QualitySettings {
  level: 'low' | 'medium' | 'high';
  value: number;
}

interface BackgroundSettings {
  type: 'white' | 'transparent' | 'custom';
  color: string;
}

export const PNGToJPG: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<QualitySettings>({ level: 'high', value: 0.9 });
  const [background, setBackground] = useState<BackgroundSettings>({ type: 'white', color: '#ffffff' });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const pngFile = droppedFiles.find(file => file.type === 'image/png');
    
    if (pngFile) {
      handleFileLoad(pngFile);
    } else {
      alert('Please select a PNG image file.');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      handleFileLoad(selectedFile);
    } else {
      alert('Please select a PNG image file.');
    }
  }, []);

  const handleFileLoad = (file: File) => {
    setFile(file);
    setConversionComplete(false);
    setConvertedImageUrl(null);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConvert = useCallback(() => {
    if (!originalImage || !canvasRef.current) return;
    
    setIsConverting(true);
    
    setTimeout(() => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      // Set canvas dimensions
      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;
      
      // Fill background if needed
      if (background.type !== 'transparent') {
        ctx.fillStyle = background.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw image to canvas
      ctx.drawImage(originalImage, 0, 0);
      
      // Convert to JPG
      const jpgDataUrl = canvas.toDataURL('image/jpeg', quality.value);
      setConvertedImageUrl(jpgDataUrl);
      setIsConverting(false);
      setConversionComplete(true);
    }, 1000);
  }, [originalImage, quality.value, background]);

  const handleDownload = () => {
    if (!convertedImageUrl || !file) return;
    
    const link = document.createElement('a');
    link.href = convertedImageUrl;
    
    // Create filename based on original name
    const originalName = file.name.split('.')[0];
    link.download = `${originalName}.jpg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setFile(null);
    setOriginalImage(null);
    setConvertedImageUrl(null);
    setConversionComplete(false);
    setOriginalDimensions({ width: 0, height: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const setQualityLevel = (level: 'low' | 'medium' | 'high') => {
    const values = { low: 0.5, medium: 0.7, high: 0.9 };
    setQuality({ level, value: values[level] });
  };

  const setBackgroundType = (type: 'white' | 'transparent' | 'custom') => {
    setBackground(prev => ({ ...prev, type }));
  };

  // Calculate converted file size (approximation)
  const getConvertedSize = () => {
    if (!convertedImageUrl) return 0;
    const base64 = convertedImageUrl.split(',')[1];
    const binaryString = atob(base64);
    return binaryString.length;
  };

  return (
    <>
      <SEO {...seoConfigs.home} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PNG to JPG Converter
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Convert your PNG images to JPG format instantly while maintaining quality. Perfect for reducing file size while preserving image details.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upload PNG Image</h2>
              
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium mb-2">Drag & drop your PNG file here</p>
                <p className="text-gray-400 text-sm mb-4">or</p>
                <label className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-all">
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Choose Image
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/png"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-gray-500 text-xs mt-4">Supports PNG files up to 25MB</p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ImageIcon className="w-8 h-8 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={resetTool}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {originalImage && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Preview</h3>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <div className="max-h-64 overflow-hidden rounded-lg">
                      <img
                        src={originalImage.src}
                        alt="Original PNG"
                        className="max-w-full max-h-64 mx-auto"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-400">
                    <p>Dimensions: {originalDimensions.width} × {originalDimensions.height} px</p>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Conversion Settings</h2>
              
              {/* Quality Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Output Quality</h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setQualityLevel('high')}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      quality.level === 'high'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-medium">High</p>
                    <p className="text-xs text-gray-400">Best quality</p>
                  </button>
                  
                  <button
                    onClick={() => setQualityLevel('medium')}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      quality.level === 'medium'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Settings className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="font-medium">Medium</p>
                    <p className="text-xs text-gray-400">Balanced</p>
                  </button>
                  
                  <button
                    onClick={() => setQualityLevel('low')}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      quality.level === 'low'
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Settings className="w-4 h-4 text-gray-300" />
                    </div>
                    <p className="font-medium">Low</p>
                    <p className="text-xs text-gray-400">Small file size</p>
                  </button>
                </div>
              </div>

              {/* Background Options */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Background Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="background"
                      checked={background.type === 'white'}
                      onChange={() => setBackgroundType('white')}
                      className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-gray-600 focus:ring-cyan-400"
                    />
                    <span className="ml-3 text-sm">White Background</span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="background"
                      checked={background.type === 'transparent'}
                      onChange={() => setBackgroundType('transparent')}
                      className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-gray-600 focus:ring-cyan-400"
                    />
                    <span className="ml-3 text-sm">Transparent (Keep Alpha)</span>
                  </label>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="background"
                      checked={background.type === 'custom'}
                      onChange={() => setBackgroundType('custom')}
                      className="w-4 h-4 text-cyan-400 bg-transparent border-2 border-gray-600 focus:ring-cyan-400"
                    />
                    <span className="ml-3 text-sm">Custom Background Color:</span>
                    <input
                      type="color"
                      value={background.color}
                      onChange={(e) => setBackground(prev => ({ ...prev, color: e.target.value }))}
                      disabled={background.type !== 'custom'}
                      className="ml-2 w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleConvert}
                  disabled={!originalImage || isConverting}
                  className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
                >
                  {isConverting ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block mr-2"></div>
                      Converting...
                    </>
                  ) : (
                    <>
                      <Settings className="w-5 h-5 inline mr-2" />
                      Convert to JPG
                    </>
                  )}
                </button>
                
                {conversionComplete && (
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {conversionComplete && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Your Converted JPG Image
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Original PNG</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="max-h-80 overflow-hidden rounded-lg">
                    {originalImage && (
                      <img
                        src={originalImage.src}
                        alt="Original PNG"
                        className="max-w-full max-h-80 mx-auto"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>Dimensions: {originalDimensions.width} × {originalDimensions.height} px</p>
                  <p>File size: {file && formatFileSize(file.size)}</p>
                  <p>Format: PNG</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Converted JPG</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="max-h-80 overflow-hidden rounded-lg">
                    {convertedImageUrl && (
                      <img
                        src={convertedImageUrl}
                        alt="Converted JPG"
                        className="max-w-full max-h-80 mx-auto"
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>Dimensions: {originalDimensions.width} × {originalDimensions.height} px</p>
                  <p>File size: {formatFileSize(getConvertedSize())}</p>
                  <p>Quality: {quality.level.charAt(0).toUpperCase() + quality.level.slice(1)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Convert PNG to JPG?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reduce File Size</h3>
              <p className="text-gray-400">JPG files are significantly smaller than PNGs, saving storage and bandwidth.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Web Compatibility</h3>
              <p className="text-gray-400">JPG is universally supported by all browsers and image viewing applications.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Photo Optimization</h3>
              <p className="text-gray-400">Ideal for photographs with millions of colors and smooth gradients.</p>
            </div>
          </div>

          {/* Comprehensive Content Section */}
          <section className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Professional PNG to JPG Conversion for Web and Print</span>
            </h2>
            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Transform your PNG images into high-quality JPG format with our professional conversion tool, designed for photographers, web developers, and content creators who need optimized images for their projects. Whether you're preparing images for websites, reducing file sizes for faster loading, or ensuring compatibility across all platforms, our converter delivers exceptional results while maintaining visual quality.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                PNG files excel at preserving transparency and crisp graphics, but their larger file sizes can impact website performance and storage requirements. Our intelligent conversion process analyzes your image content and applies optimal compression settings that dramatically reduce file sizes - often by 60-80% - while preserving the visual integrity that matters most. Advanced background handling lets you choose white, custom colors, or maintain transparency for specific use cases.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Perfect for e-commerce product images, blog photography, social media content, and digital marketing materials where file size optimization directly impacts user experience and SEO performance. All processing happens locally in your browser, ensuring your images remain private and secure. Experience professional-grade image conversion that combines speed, quality, and complete control over your visual content.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
};
