import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SEO } from '../components/SEO';

export function AllTools() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tools = [
    // AI Tools
    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Generate high-quality content instantly with AI. Create blogs, social media posts, product descriptions, and more. Professional-grade content creation tool.',
      icon: 'fas fa-robot',
      category: 'ai',
      link: '/ai-text-generator',
      keywords: 'ai text generator, content creation, blog writing, social media content, ai writing',
      popular: true,
      rating: 4.9,
      users: '25K+',
      featured: true
    },
    {
      id: 'image-to-text',
      name: 'Image to Text',
      description: 'Extract text from images using advanced OCR technology. Convert screenshots, documents, and photos to editable text instantly.',
      icon: 'fas fa-eye',
      category: 'ai',
      link: '/image-to-text-generator',
      keywords: 'ocr, image to text, extract text from image, screenshot to text, document scanner',
      popular: true,
      rating: 4.8,
      users: '20K+',
      featured: true
    },
    // Image Tools
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Compress images online for free. Reduce JPG, PNG, GIF file sizes by up to 80% while maintaining quality. Perfect for web optimization and faster loading times.',
      icon: 'fas fa-compress-alt',
      category: 'image',
      link: '/image-compressor',
      keywords: 'image compressor, compress image online, reduce image size, optimize images',
      popular: true,
      rating: 4.9,
      users: '50K+'
    },
    {
      id: 'image-resizer',
      name: 'Image Resizer',
      description: 'Resize images to any dimension online for free. Perfect for social media, websites, and print. Maintain aspect ratio and image quality with our advanced resizing tool.',
      icon: 'fas fa-expand-alt',
      category: 'image',
      link: '/image-resizer',
      keywords: 'image resizer, resize image online, change image dimensions, scale images',
      popular: true,
      rating: 4.8,
      users: '45K+'
    },
    {
      id: 'image-enhancer',
      name: 'Image Enhancer',
      description: 'Enhance image quality with AI-powered tools. Adjust brightness, contrast, saturation, and sharpness automatically. Make your photos look professional instantly.',
      icon: 'fas fa-magic',
      category: 'image',
      link: '/image-enhancer',
      keywords: 'image enhancer, enhance image quality, photo editor, improve image',
      rating: 4.7,
      users: '30K+'
    },
    {
      id: 'background-remover',
      name: 'Background Remover',
      description: 'Remove image backgrounds automatically in seconds. AI-powered background removal for perfect product photos, portraits, and creative projects.',
      icon: 'fas fa-eraser',
      category: 'image',
      link: '/background-remover',
      keywords: 'background remover, remove background, transparent background, photo editor',
      popular: true,
      rating: 4.8,
      users: '35K+'
    },
    {
      id: 'png-to-jpg',
      name: 'PNG to JPG Converter',
      description: 'Convert PNG to JPG online for free. Batch convert images with custom quality settings. Reduce file sizes while preserving image quality for web use.',
      icon: 'fas fa-sync-alt',
      category: 'image',
      link: '/png-to-jpg',
      keywords: 'png to jpg converter, convert png to jpeg, image format converter',
      rating: 4.6,
      users: '25K+'
    },
    {
      id: 'png-to-svg',
      name: 'PNG to SVG Converter',
      description: 'Convert PNG images to scalable SVG format online. Perfect for logos, icons, and graphics that need to scale without quality loss.',
      icon: 'fas fa-file-image',
      category: 'image',
      link: '/png-to-svg',
      keywords: 'png to svg converter, vector converter, scalable graphics',
      rating: 4.5,
      users: '15K+'
    },
    // PDF Tools
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Compress PDF files online for free. Reduce PDF size by up to 70% without losing quality. Perfect for email attachments and faster downloads.',
      icon: 'fas fa-file-pdf',
      category: 'pdf',
      link: '/pdf-compressor',
      keywords: 'pdf compressor, compress pdf online, reduce pdf size, optimize pdf',
      popular: true,
      rating: 4.9,
      users: '60K+'
    },
    {
      id: 'pdf-splitter',
      name: 'PDF Splitter',
      description: 'Split PDF documents into separate files online. Extract specific pages or split by page ranges. Secure, fast, and completely free to use.',
      icon: 'fas fa-cut',
      category: 'pdf',
      link: '/pdf-splitter',
      keywords: 'pdf splitter, split pdf online, extract pdf pages, divide pdf',
      rating: 4.8,
      users: '40K+'
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word Converter',
      description: 'Convert PDF to Word documents online for free. Maintain formatting and layout while making PDFs editable. Works with all PDF types.',
      icon: 'fas fa-file-word',
      category: 'pdf',
      link: '/pdf-to-word',
      keywords: 'pdf to word converter, pdf to doc, convert pdf to word online',
      rating: 4.7,
      users: '35K+'
    },
    // Text Tools
    {
      id: 'word-counter',
      name: 'Word Counter',
      description: 'Count words, characters, sentences, and paragraphs instantly. Get reading time estimates and detailed text statistics for writers and students.',
      icon: 'fas fa-calculator',
      category: 'text',
      link: '/word-counter',
      keywords: 'word counter, character counter, text analyzer, word count tool',
      popular: true,
      rating: 4.8,
      users: '55K+'
    },
    {
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text between uppercase, lowercase, title case, and sentence case instantly. Perfect for formatting text and content creation.',
      icon: 'fas fa-font',
      category: 'text',
      link: '/text-case-converter',
      keywords: 'text case converter, uppercase lowercase converter, text formatter',
      rating: 4.6,
      users: '20K+'
    },
    // Utility Tools
    {
      id: 'qr-generator',
      name: 'QR Code Generator',
      description: 'Generate QR codes for URLs, text, WiFi, contact info, and more. Download in multiple formats including PNG, SVG, and PDF. Completely free.',
      icon: 'fas fa-qrcode',
      category: 'utility',
      link: '/qr-generator',
      keywords: 'qr code generator, create qr code, generate qr code online, free qr code',
      popular: true,
      rating: 4.9,
      users: '70K+'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: 'fas fa-star', count: tools.length },
    { id: 'ai', name: 'AI Tools', icon: 'fas fa-robot', count: tools.filter(t => t.category === 'ai').length },
    { id: 'image', name: 'Image Tools', icon: 'fas fa-image', count: tools.filter(t => t.category === 'image').length },
    { id: 'pdf', name: 'PDF Tools', icon: 'fas fa-file-pdf', count: tools.filter(t => t.category === 'pdf').length },
    { id: 'text', name: 'Text Tools', icon: 'fas fa-font', count: tools.filter(t => t.category === 'text').length },
    { id: 'utility', name: 'Utility Tools', icon: 'fas fa-tools', count: tools.filter(t => t.category === 'utility').length }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const seoData = {
    title: 'All Tools - Free Online Tools Collection | ToolGalaxy',
    description: 'Discover our complete collection of free online tools for images, PDFs, text processing, and more. Over 100,000 users trust our secure, fast, and privacy-focused tools.',
    keywords: 'free online tools, all tools, image tools, pdf tools, text tools, online utilities, web tools, file converter',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "All Tools - Free Online Tools Collection",
      "description": "Complete collection of free online tools for productivity and file processing",
      "url": "https://toolgalaxy.com/all-tools",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": tools.length,
        "itemListElement": tools.map((tool, index) => ({
          "@type": "SoftwareApplication",
          "position": index + 1,
          "name": tool.name,
          "description": tool.description,
          "url": `https://toolgalaxy.com${tool.link}`,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }))
      }
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 galaxy-title">
            All Free Online Tools in One Place
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Discover our complete collection of <strong>100% free online tools</strong> for image processing, PDF management, text analysis, and more. 
            Trusted by over <strong>100,000+ users worldwide</strong> for secure, fast, and privacy-focused file processing.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 bg-gray-800/60 border border-gray-600 rounded-xl focus:border-primary focus:outline-none text-gray-200 placeholder-gray-400"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <div className="text-2xl font-bold text-primary">{tools.length}+</div>
              <div className="text-sm text-gray-400">Free Tools</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <div className="text-2xl font-bold text-secondary">100K+</div>
              <div className="text-sm text-gray-400">Happy Users</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-400">Free Forever</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-sm text-gray-400">Sign-ups Required</div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full border transition-all transform hover:scale-105 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-glow'
                    : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 border-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                <i className={category.icon}></i>
                {category.name}
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold galaxy-title">
              {activeCategory === 'all' ? 'All Tools' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-gray-400">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </div>
          </div>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
              <p className="text-gray-400">No tools found matching your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="mt-4 bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.link}
                  className="group bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/70 hover:transform hover:scale-105 hover:shadow-cosmic relative overflow-hidden"
                >
                  {/* Top border gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  
                  {/* Popular badge */}
                  {tool.popular && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg flex items-center gap-1">
                      <i className="fas fa-star"></i>
                      POPULAR
                    </div>
                  )}
                  
                  {/* Free badge */}
                  {!tool.popular && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                      FREE
                    </div>
                  )}
                  
                  <div className="flex items-start mb-4">
                    <div className="bg-primary/15 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/25 transition-colors">
                      <i className={`${tool.icon} text-xl text-primary`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star text-xs ${i < Math.floor(tool.rating) ? '' : 'opacity-30'}`}></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{tool.rating}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tool.users} users
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Action button */}
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <span className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors group-hover:bg-primary group-hover:text-white">
                      Use Tool <i className="fas fa-arrow-right ml-2"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Our Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Why Choose ToolGalaxy for All Your Online Tool Needs?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50 text-center">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">100% Private & Secure</h3>
              <p className="text-gray-300">
                All tools process files locally in your browser. Your data never leaves your device, ensuring complete privacy and security for sensitive documents.
              </p>
            </div>
            
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50 text-center">
              <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast Processing</h3>
              <p className="text-gray-300">
                Advanced algorithms ensure rapid file processing. Most tools complete tasks in seconds, saving you valuable time and boosting productivity.
              </p>
            </div>
            
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50 text-center">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Always Free, No Limits</h3>
              <p className="text-gray-300">
                Every tool is completely free with no hidden costs, premium tiers, or usage limits. We believe powerful tools should be accessible to everyone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-primary">Perfect for Professionals</h3>
              <ul className="space-y-2 text-gray-300">
                <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Web developers and designers</li>
                <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Content creators and bloggers</li>
                <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Students and researchers</li>
                <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Small business owners</li>
                <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Digital marketers</li>
              </ul>
            </div>
            
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-bold mb-4 text-secondary">Supported Formats</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Images</h4>
                  <p className="text-sm">JPG, PNG, GIF, WebP, SVG, BMP</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Documents</h4>
                  <p className="text-sm">PDF, DOC, DOCX, TXT</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Data</h4>
                  <p className="text-sm">CSV, JSON, XML, Base64</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Utilities</h4>
                  <p className="text-sm">QR Codes, Text Processing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Frequently Asked Questions About Our Free Online Tools
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Are all tools completely free to use?",
                answer: "Yes! Every tool on ToolGalaxy is 100% free with no hidden costs, premium tiers, or usage limits. We believe powerful online tools should be accessible to everyone without any barriers."
              },
              {
                question: "Do I need to create an account to use the tools?",
                answer: "No account required! All tools work instantly without any sign-up process. Simply visit the tool page, upload your file, and start processing immediately."
              },
              {
                question: "How secure are my files when using these tools?",
                answer: "Your files are completely secure. All processing happens locally in your browser - your files never get uploaded to our servers. This ensures maximum privacy and security for your sensitive documents."
              },
              {
                question: "What file size limits do the tools have?",
                answer: "Most tools support files up to 25MB, which covers the vast majority of use cases. For larger files, the processing happens locally, so the main limitation is your device's available memory."
              },
              {
                question: "Can I use these tools on mobile devices?",
                answer: "Absolutely! All tools are fully responsive and work perfectly on smartphones, tablets, and desktop computers. The mobile experience is optimized for touch interfaces."
              },
              {
                question: "How often are new tools added?",
                answer: "We regularly add new tools based on user feedback and emerging needs. Follow our blog or social media for announcements about new tool releases and feature updates."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Supercharge Your Productivity?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join <strong>100,000+ users</strong> who trust ToolGalaxy for their daily file processing needs. 
              All tools are free, secure, and work instantly in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-glow inline-flex items-center justify-center"
              >
                <i className="fas fa-tools mr-2"></i>
                Explore All Tools
              </button>
              <Link
                to="/blog"
                className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                <i className="fas fa-blog mr-2"></i>
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
