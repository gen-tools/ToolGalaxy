import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Image as ImageIcon, Settings, Layers } from 'lucide-react';

export const PNGToSVG: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const [settings, setSettings] = useState({
    colorThreshold: 128,
    smoothing: 5,
    transparentBg: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFile(pngFile);
      setConversionComplete(false);
    } else {
      alert('Please select a PNG image file.');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
      setConversionComplete(false);
    } else {
      alert('Please select a PNG image file.');
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    // Simulate conversion process
    setTimeout(() => {
      // Create a simulated SVG string
      const width = Math.floor(Math.random() * 400) + 200;
      const height = Math.floor(Math.random() * 400) + 200;
      
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${settings.transparentBg ? '' : `<rect width="100%" height="100%" fill="#ffffff"/>`}
        <text x="50%" y="50%" text-anchor="middle" fill="#007CF0" font-family="Arial" font-size="24">SVG Conversion</text>
        <text x="50%" y="60%" text-anchor="middle" fill="#00DFD8" font-family="Arial" font-size="18">(Demo Preview)</text>
        <circle cx="50" cy="50" r="30" fill="rgba(0, 124, 240, 0.3)" stroke="#007CF0" stroke-width="2"/>
        <rect x="${width - 100}" y="${height - 80}" width="60" height="40" fill="rgba(0, 223, 216, 0.3)" stroke="#00DFD8" stroke-width="2"/>
      </svg>`;
      
      setSvgContent(svg);
      setIsConverting(false);
      setConversionComplete(true);
    }, 2000);
  };

  const handleDownload = () => {
    if (!svgContent || !file) return;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // Create filename based on original name
    const originalName = file.name.split('.')[0];
    link.download = `${originalName}_converted.svg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setSvgContent('');
    setConversionComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl">
              <Layers className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PNG to SVG Converter
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Convert your PNG images to scalable vector graphics (SVG) for high-quality resizing without loss of quality.
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
                <p className="font-medium mb-2">Drag & drop your PNG image here</p>
                <p className="text-gray-400 text-sm mb-4">or</p>
                <label className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-all">
                  <Image className="w-4 h-4 inline mr-2" />
                  Choose PNG
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/png"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-gray-500 text-xs mt-4">Maximum file size: 5MB</p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image className="w-8 h-8 text-blue-500 mr-3" />
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
            </div>

            {/* Settings Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Conversion Settings</h2>
              
              {/* Conversion Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Conversion Options</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm">Color Threshold</label>
                      <span className="text-sm">{settings.colorThreshold}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="255"
                      value={settings.colorThreshold}
                      onChange={(e) => setSettings(prev => ({ ...prev, colorThreshold: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm">Smoothing Level</label>
                      <span className="text-sm">{settings.smoothing}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={settings.smoothing}
                      onChange={(e) => setSettings(prev => ({ ...prev, smoothing: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="transparentBg"
                      checked={settings.transparentBg}
                      onChange={(e) => setSettings(prev => ({ ...prev, transparentBg: e.target.checked }))}
                      className="w-5 h-5 text-cyan-400 bg-transparent border-2 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                    />
                    <label htmlFor="transparentBg" className="ml-3 text-sm">Transparent Background</label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleConvert}
                  disabled={!file || isConverting}
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
                      Convert to SVG
                    </>
                  )}
                </button>
                
                {conversionComplete && (
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Download SVG
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
              Your Converted Image
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Original PNG</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                    <p className="font-medium">PNG Image Preview</p>
                    <p className="text-gray-400 text-sm mt-1">Original file: {file?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Converted SVG</h3>
                <div className="bg-white rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                  {svgContent && (
                    <div
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                      className="max-w-full max-h-full"
                    />
                  )}
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>File size: {svgContent ? `${(svgContent.length / 1024).toFixed(2)} KB` : '0 KB'}</p>
                  <p>Format: SVG (Scalable Vector Graphics)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Convert PNG to SVG?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Infinite Scalability</h3>
              <p className="text-gray-400">SVG images can be scaled to any size without losing quality, perfect for responsive designs.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smaller File Sizes</h3>
              <p className="text-gray-400">SVG files are often smaller than PNGs, reducing load times and bandwidth usage.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Editable & Stylable</h3>
              <p className="text-gray-400">SVGs can be edited with code, styled with CSS, and animated for dynamic effects.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
