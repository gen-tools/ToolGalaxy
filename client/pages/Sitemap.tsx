import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Sitemap() {
  const sitePages = [
    { name: 'Home', url: '/', description: 'Free online tools for image processing, PDF manipulation, and text utilities' },
    { name: 'All Tools', url: '/all-tools', description: 'Complete collection of free online tools' },
    { name: 'Blog', url: '/blog', description: 'Professional guides and tutorials for using our tools' },
    { name: 'About', url: '/about', description: 'Learn about ToolGalaxy and our mission' },
    { name: 'Contact', url: '/contact', description: 'Get in touch with our support team' },
    { name: 'Privacy Policy', url: '/privacy-policy', description: 'Our privacy policy and data protection practices' }
  ];

  const imageTools = [
    { name: 'Image Resizer', url: '/image-resizer', description: 'Resize images to any dimension while maintaining quality' },
    { name: 'Image Enhancer', url: '/image-enhancer', description: 'Enhance image quality with professional editing tools' },
    { name: 'Image Compressor', url: '/image-compressor', description: 'Reduce image file sizes without quality loss' },
    { name: 'Background Remover', url: '/background-remover', description: 'Remove image backgrounds automatically' },
    { name: 'PNG to JPG', url: '/png-to-jpg', description: 'Convert PNG images to JPG format' },
    { name: 'Image to Text Generator', url: '/image-to-text-generator', description: 'Extract text from images using OCR technology' }
  ];

  const pdfTools = [
    { name: 'PDF Compressor', url: '/pdf-compressor', description: 'Compress PDF files to reduce file size' },
    { name: 'PDF Splitter', url: '/pdf-splitter', description: 'Split PDF documents into separate files' },
    { name: 'PDF to Word', url: '/pdf-to-word', description: 'Convert PDF files to editable Word documents' }
  ];

  const textTools = [
    { name: 'Word Counter', url: '/word-counter', description: 'Count words, characters, and sentences in text' },
    { name: 'Text Case Converter', url: '/text-case-converter', description: 'Convert text between different cases' },
    { name: 'AI Text Generator', url: '/ai-text-generator', description: 'Generate content using artificial intelligence' }
  ];

  const dataTools = [
    { name: 'XML to Excel Converter', url: '/xml-to-excel-converter', description: 'Convert XML files to Excel spreadsheets' },
    { name: 'Excel to XML Converter', url: '/excel-to-xml-converter', description: 'Transform Excel spreadsheets to XML format' }
  ];

  const utilityTools = [
    { name: 'QR Code Generator', url: '/qr-generator', description: 'Create custom QR codes for various purposes' }
  ];

  const seoData = {
    title: 'Sitemap | ToolGalaxy - Free Online Tools',
    description: 'Complete sitemap of all free online tools available on ToolGalaxy. Find image processing, PDF manipulation, text utilities, and data conversion tools.',
    keywords: 'sitemap, free online tools, image tools, pdf tools, text tools, web utilities'
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 galaxy-title">
              Sitemap
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Complete overview of all pages and tools available on ToolGalaxy. Find the perfect tool for your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Pages */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-home mr-3 text-cyan-400"></i>
                Main Pages
              </h2>
              <div className="space-y-4">
                {sitePages.map((page) => (
                  <div key={page.url} className="border-l-4 border-cyan-400 pl-4">
                    <Link 
                      to={page.url}
                      className="text-lg font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {page.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{page.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Tools */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-image mr-3 text-green-400"></i>
                Image Tools
              </h2>
              <div className="space-y-4">
                {imageTools.map((tool) => (
                  <div key={tool.url} className="border-l-4 border-green-400 pl-4">
                    <Link 
                      to={tool.url}
                      className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Tools */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-file-pdf mr-3 text-red-400"></i>
                PDF Tools
              </h2>
              <div className="space-y-4">
                {pdfTools.map((tool) => (
                  <div key={tool.url} className="border-l-4 border-red-400 pl-4">
                    <Link 
                      to={tool.url}
                      className="text-lg font-medium text-red-400 hover:text-red-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Tools */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-font mr-3 text-purple-400"></i>
                Text Tools
              </h2>
              <div className="space-y-4">
                {textTools.map((tool) => (
                  <div key={tool.url} className="border-l-4 border-purple-400 pl-4">
                    <Link 
                      to={tool.url}
                      className="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Tools */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-exchange-alt mr-3 text-blue-400"></i>
                Data Tools
              </h2>
              <div className="space-y-4">
                {dataTools.map((tool) => (
                  <div key={tool.url} className="border-l-4 border-blue-400 pl-4">
                    <Link 
                      to={tool.url}
                      className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Utility Tools */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <i className="fas fa-tools mr-3 text-yellow-400"></i>
                Utility Tools
              </h2>
              <div className="space-y-4">
                {utilityTools.map((tool) => (
                  <div key={tool.url} className="border-l-4 border-yellow-400 pl-4">
                    <Link 
                      to={tool.url}
                      className="text-lg font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              All tools are free to use with no registration required. 
              <Link to="/" className="text-cyan-400 hover:text-cyan-300 ml-1">
                Start using ToolGalaxy tools now →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
