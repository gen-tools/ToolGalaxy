import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, FileText, File, Settings, Check } from 'lucide-react';

interface ConversionOptions {
  preserveFormatting: boolean;
  textOnly: boolean;
  preserveImages: boolean;
  extractTables: boolean;
  ocrOption: boolean;
}

export const PDFToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ConversionOptions>({
    preserveFormatting: true,
    textOnly: false,
    preserveImages: true,
    extractTables: true,
    ocrOption: false
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
    const pdfFile = droppedFiles.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      setFile(pdfFile);
      setConversionComplete(false);
    } else {
      alert('Please select a PDF file.');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setConversionComplete(false);
    } else {
      alert('Please select a PDF file.');
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
    setProgress(0);
    
    // Simulate conversion process with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setConversionComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleDownload = () => {
    if (!file) return;
    
    // Create a dummy Word document for download
    const content = "This is a demo file. In a real application, this would be your converted Word document.";
    const blob = new Blob([content], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    // Create filename based on original name
    const originalName = file.name.split('.')[0];
    link.download = `${originalName}.docx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetTool = () => {
    setFile(null);
    setConversionComplete(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleOption = (key: keyof ConversionOptions) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl">
              <File className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            PDF to Word Converter
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Convert your PDF documents to editable Microsoft Word files while preserving formatting, images, and layout.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Upload PDF</h2>
              
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
                <p className="font-medium mb-2">Drag & drop your PDF here</p>
                <p className="text-gray-400 text-sm mb-4">or</p>
                <label className="inline-block bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-all">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Choose PDF
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                  />
                </label>
                <p className="text-gray-500 text-xs mt-4">Max file size: 25MB</p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-red-500 mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                        <p className="text-sm text-gray-400">{Math.floor(Math.random() * 20) + 5} pages</p>
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

              {file && (
                <div className="mt-6 p-4 bg-white/5 rounded-xl">
                  <h3 className="font-medium mb-3">Document Preview</h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 flex justify-center items-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-red-500 mx-auto mb-3" />
                      <p className="font-medium">PDF Document Preview</p>
                      <p className="text-gray-400 text-sm mt-1">Preview not available in this demo</p>
                    </div>
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
                  <div
                    onClick={() => toggleOption('preserveFormatting')}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      options.preserveFormatting
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Preserve Formatting</p>
                        <p className="text-sm text-gray-400">Maintains original layout and styling</p>
                      </div>
                      {options.preserveFormatting && (
                        <Check className="w-5 h-5 text-cyan-400 ml-auto" />
                      )}
                    </div>
                  </div>
                  
                  <div
                    onClick={() => toggleOption('textOnly')}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                      options.textOnly
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-gray-300" />
                      </div>
                      <div>
                        <p className="font-medium">Text Only</p>
                        <p className="text-sm text-gray-400">Extracts text without formatting</p>
                      </div>
                      {options.textOnly && (
                        <Check className="w-5 h-5 text-cyan-400 ml-auto" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Additional Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.preserveImages}
                      onChange={() => toggleOption('preserveImages')}
                      className="w-5 h-5 text-cyan-400 bg-transparent border-2 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                    />
                    <span className="ml-3 text-sm">Preserve images in document</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.extractTables}
                      onChange={() => toggleOption('extractTables')}
                      className="w-5 h-5 text-cyan-400 bg-transparent border-2 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                    />
                    <span className="ml-3 text-sm">Extract tables as editable tables</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.ocrOption}
                      onChange={() => toggleOption('ocrOption')}
                      className="w-5 h-5 text-cyan-400 bg-transparent border-2 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                    />
                    <span className="ml-3 text-sm">Enable OCR for scanned documents</span>
                  </label>
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
                      Convert to Word
                    </>
                  )}
                </button>
                
                {conversionComplete && (
                  <button
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
                  >
                    <Download className="w-5 h-5 inline mr-2" />
                    Download DOCX
                  </button>
                )}
              </div>

              {/* Progress Bar */}
              {isConverting && (
                <div className="mt-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Converting your document...</span>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {conversionComplete && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Your Converted Document
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Original PDF</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <FileText className="w-16 h-16 text-red-500 mx-auto mb-3" />
                  <p className="font-medium mb-1">{file?.name}</p>
                  <p className="text-sm text-gray-400">{file && formatFileSize(file.size)}</p>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>Pages: {Math.floor(Math.random() * 20) + 5}</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Converted Word Document</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <File className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <p className="font-medium mb-1">{file?.name.split('.')[0]}.docx</p>
                  <p className="text-sm text-gray-400">{file && formatFileSize(file.size * 0.8)}</p>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                  <p>Conversion quality: High</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Choose Our PDF to Word Converter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Conversion</h3>
              <p className="text-gray-400">Your files are automatically deleted after conversion. We never store or share your documents.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
              <p className="text-gray-400">Convert documents in seconds with our optimized processing engine, even for large files.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <File className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Quality</h3>
              <p className="text-gray-400">Preserve formatting, images, tables, and layout with our advanced conversion algorithm.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
