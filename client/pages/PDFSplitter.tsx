import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Plus, Download, FileText, Scissors, Trash2 } from 'lucide-react';

interface PageRange {
  id: string;
  start: number;
  end: number;
}

interface SplitFile {
  name: string;
  pages: string;
  size: number;
  id: string;
}

export const PDFSplitter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [splitMethod, setSplitMethod] = useState<'range' | 'single' | 'every'>('range');
  const [pageRanges, setPageRanges] = useState<PageRange[]>([]);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [splitInterval, setSplitInterval] = useState('1');
  const [splitFiles, setSplitFiles] = useState<SplitFile[]>([]);
  const [showResults, setShowResults] = useState(false);
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
    } else {
      alert('Please select a PDF file.');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file.');
    }
  }, []);

  const addPageRange = () => {
    const start = parseInt(startPage);
    const end = parseInt(endPage);
    
    if (!start || !end) {
      alert('Please enter both start and end pages.');
      return;
    }
    
    if (start > end) {
      alert('Start page cannot be greater than end page.');
      return;
    }
    
    if (start < 1 || end < 1) {
      alert('Page numbers must be at least 1.');
      return;
    }
    
    const newRange: PageRange = {
      id: Date.now().toString(),
      start,
      end
    };
    
    setPageRanges([...pageRanges, newRange]);
    setStartPage('');
    setEndPage('');
  };

  const removePageRange = (id: string) => {
    setPageRanges(pageRanges.filter(range => range.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSplit = async () => {
    if (!file) return;
    
    if (splitMethod === 'range' && pageRanges.length === 0) {
      alert('Please add at least one page range.');
      return;
    }
    
    if (splitMethod === 'every' && (!splitInterval || parseInt(splitInterval) < 1)) {
      alert('Please enter a valid number of pages per file.');
      return;
    }
    
    setIsConverting(true);
    
    // Simulate splitting process
    setTimeout(() => {
      const results: SplitFile[] = [];
      const baseName = file.name.split('.')[0];
      
      if (splitMethod === 'range') {
        pageRanges.forEach((range, index) => {
          const fileSize = Math.floor(Math.random() * 500) + 100;
          results.push({
            name: `${baseName}_pages_${range.start}-${range.end}.pdf`,
            pages: `${range.start}-${range.end}`,
            size: fileSize * 1024,
            id: `file-${index}-${Date.now()}`
          });
        });
      } else if (splitMethod === 'single') {
        const pageCount = Math.floor(Math.random() * 20) + 5;
        for (let i = 1; i <= pageCount; i++) {
          const fileSize = Math.floor(Math.random() * 100) + 20;
          results.push({
            name: `${baseName}_page_${i}.pdf`,
            pages: `${i}`,
            size: fileSize * 1024,
            id: `file-${i}-${Date.now()}`
          });
        }
      } else if (splitMethod === 'every') {
        const interval = parseInt(splitInterval);
        const pageCount = Math.floor(Math.random() * 20) + 5;
        let fileIndex = 1;
        
        for (let i = 1; i <= pageCount; i += interval) {
          const start = i;
          const end = Math.min(i + interval - 1, pageCount);
          const fileSize = Math.floor(Math.random() * 400) + 50;
          
          results.push({
            name: `${baseName}_part_${fileIndex}.pdf`,
            pages: `${start}-${end}`,
            size: fileSize * 1024,
            id: `file-${fileIndex}-${Date.now()}`
          });
          
          fileIndex++;
        }
      }
      
      setSplitFiles(results);
      setShowResults(true);
      setIsConverting(false);
    }, 2000);
  };

  const downloadFile = (fileId: string) => {
    const file = splitFiles.find(f => f.id === fileId);
    if (file) {
      // Create a dummy PDF blob for demonstration
      const pdfContent = `%PDF-1.1
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/Contents 5 0 R
>>
endobj
4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
5 0 obj
<< /Length 73 >>
stream
BT
/F1 24 Tf
100 700 Td
(Generated by CosmicPDF) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000067 00000 n 
0000000120 00000 n 
0000000220 00000 n 
0000000296 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
394
%%EOF`;
      
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const downloadAll = () => {
    if (splitFiles.length === 0) return;
    alert('In a real application, this would download a ZIP file containing all split PDFs.');
  };

  const resetTool = () => {
    setFile(null);
    setPageRanges([]);
    setSplitFiles([]);
    setShowResults(false);
    setStartPage('');
    setEndPage('');
    setSplitInterval('1');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-12 fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl">
            <Scissors className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 galaxy-title">
          Cosmic PDF Splitter
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto fade-in delay-1">
          Split your PDF documents across the cosmos. Extract pages, split by ranges, or separate every page.
        </p>
      </section>

      {/* Main Tool */}
      <section className="tool-container rounded-2xl shadow-cosmic p-6 md:p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upload PDF</h2>
            
            <div
              className={`drop-zone rounded-xl p-8 text-center mb-6 cursor-pointer ${
                isDragging ? 'drag-over' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="border-2 border-dashed border-gray-500 rounded-xl py-12 px-4 cosmic-border">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <Upload className="text-2xl" size={32} />
                </div>
                <p className="font-medium mb-1">Drag & drop your PDF here</p>
                <p className="text-gray-500 text-sm mb-4">or</p>
                <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg cursor-pointer transition-colors btn-glow">
                  <FileText className="inline mr-2" size={16} />
                  Choose PDF
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileSelect}
                />
                <p className="text-gray-500 text-xs mt-4">Supports: PDF files (Max: 25MB)</p>
              </div>
            </div>

            {file && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="text-2xl text-red-500 mr-3" size={32} />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={resetTool}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Page Preview */}
            {file && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Page Preview</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((pageNum) => (
                    <div key={pageNum} className="page-preview relative">
                      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                        <div className="w-full h-24 bg-gray-700/50 rounded border border-gray-600 flex items-center justify-center mb-2">
                          <span className="text-gray-400 text-sm">Page {pageNum}</span>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs">
                          {pageNum}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Total pages: <span>12</span> | File size: <span>{formatFileSize(file.size)}</span></p>
                </div>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Split Settings</h2>
            
            {/* Split Method */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Split Method</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'range', label: 'Page Ranges' },
                  { id: 'single', label: 'Single Pages' },
                  { id: 'every', label: 'Every N Pages' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSplitMethod(method.id as 'range' | 'single' | 'every')}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      splitMethod === method.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Range Selection */}
            {splitMethod === 'range' && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Page Ranges</h3>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Start Page</label>
                    <input
                      type="number"
                      min="1"
                      value={startPage}
                      onChange={(e) => setStartPage(e.target.value)}
                      className="page-input w-full p-3 border rounded-lg"
                      placeholder="Start"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">End Page</label>
                    <input
                      type="number"
                      min="1"
                      value={endPage}
                      onChange={(e) => setEndPage(e.target.value)}
                      className="page-input w-full p-3 border rounded-lg"
                      placeholder="End"
                    />
                  </div>
                  <div className="self-end">
                    <button
                      onClick={addPageRange}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg btn-glow"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  {pageRanges.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No ranges added yet</p>
                  ) : (
                    <div className="space-y-2">
                      {pageRanges.map((range) => (
                        <div key={range.id} className="page-range-item">
                          <span>{range.start} - {range.end}</span>
                          <span
                            className="remove-range ml-2 cursor-pointer text-red-500"
                            onClick={() => removePageRange(range.id)}
                          >
                            <X size={14} />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Every N Pages */}
            {splitMethod === 'every' && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Split Every N Pages</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Pages per file</label>
                  <input
                    type="number"
                    min="1"
                    value={splitInterval}
                    onChange={(e) => setSplitInterval(e.target.value)}
                    className="page-input w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSplit}
                disabled={!file || isConverting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? 'Splitting...' : 'Split PDF'}
              </button>
              {showResults && (
                <button
                  onClick={downloadAll}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors btn-glow"
                >
                  <Download className="inline mr-2" size={16} />
                  Download All
                </button>
              )}
            </div>

            {/* Conversion Progress */}
            {isConverting && (
              <div className="mt-6 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p>Splitting your PDF across the cosmos...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold galaxy-title">Your Cosmic PDF Files</h2>
            <div className="text-sm text-gray-500">
              <span>{splitFiles.length} files</span> created
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {splitFiles.map((file) => (
              <div
                key={file.id}
                className="split-file tool-container p-5 flex flex-col"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-red-100/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <FileText className="text-red-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-500">Pages: {file.pages}</p>
                  </div>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                  <button
                    onClick={() => downloadFile(file.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors btn-glow"
                  >
                    <Download className="inline mr-1" size={14} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
          Why Use Our Cosmic PDF Splitter?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="tool-container p-6">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Processing</h3>
            <p className="text-gray-400">Files are automatically deleted after processing. Your documents stay private.</p>
          </div>
          <div className="tool-container p-6">
            <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center mb-4">
              <Scissors size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Split large PDFs in seconds with our optimized processing engine.</p>
          </div>
          <div className="tool-container p-6">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Universal Access</h3>
            <p className="text-gray-400">Works on any device - desktop, tablet, or mobile.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-16">
        <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Space Explorer',
              text: 'This cosmic-themed PDF splitter made document management an out-of-this-world experience!',
              color: 'blue'
            },
            {
              name: 'Galaxy Researcher',
              text: 'Splitting research papers has never been this beautiful. The cosmic design is truly stellar!',
              color: 'teal'
            },
            {
              name: 'Cosmic Developer',
              text: 'As a developer, I appreciate both the functionality and the stunning space-themed interface.',
              color: 'purple'
            }
          ].map((testimonial, index) => (
            <div key={index} className="tool-container p-6">
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 bg-${testimonial.color}-500/20 rounded-full flex items-center justify-center mr-3`}>
                  <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <div className="flex text-yellow-400">
                    {'���★★★★'.split('').map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
