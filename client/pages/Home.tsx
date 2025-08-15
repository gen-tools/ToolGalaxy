import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SEO, seoConfigs } from '../components/SEO';

export function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const tools = [
    // Featured AI Tools
    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Generate high-quality content instantly with AI. Perfect for blogs, social media, and marketing copy.',
      icon: 'fas fa-robot',
      category: 'ai',
      link: '/ai-text-generator',
      badge: 'AI Tools',
      popular: true,
      featured: true
    },
    {
      id: 'image-to-text',
      name: 'Image to Text',
      description: 'Extract text from images using advanced OCR technology. Convert screenshots and documents.',
      icon: 'fas fa-eye',
      category: 'ai',
      link: '/image-to-text-generator',
      badge: 'AI Tools',
      popular: true,
      featured: true
    },
    // Image Tools
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Reduce image file size without losing quality. Perfect for websites and faster loading.',
      icon: 'fas fa-compress-alt',
      category: 'image',
      link: '/image-compressor',
      badge: 'Image Tools',
      popular: true
    },
    {
      id: 'image-resizer',
      name: 'Image Resizer',
      description: 'Resize images to any dimension while maintaining aspect ratio and quality.',
      icon: 'fas fa-expand-alt',
      category: 'image',
      link: '/image-resizer',
      badge: 'Image Tools',
      popular: true
    },
    {
      id: 'image-enhancer',
      name: 'Image Enhancer',
      description: 'Enhance image quality, adjust brightness, contrast, and sharpness automatically.',
      icon: 'fas fa-magic',
      category: 'image',
      link: '/image-enhancer',
      badge: 'Image Tools'
    },
    {
      id: 'background-remover',
      name: 'Background Remover',
      description: 'Remove image backgrounds automatically in seconds. No manual editing required.',
      icon: 'fas fa-eraser',
      category: 'image',
      link: '/background-remover',
      badge: 'Image Tools'
    },
    {
      id: 'png-to-jpg',
      name: 'PNG to JPG',
      description: 'Convert PNG images to JPG format with adjustable quality settings.',
      icon: 'fas fa-sync-alt',
      category: 'image',
      link: '/png-to-jpg',
      badge: 'Image Tools'
    },
    {
      id: 'image-cropper',
      name: 'Image Cropper',
      description: 'Crop images to any dimension or aspect ratio. Perfect for profile pictures and thumbnails.',
      icon: 'fas fa-crop-alt',
      category: 'image',
      link: '/image-cropper',
      badge: 'Image Tools'
    },
    // PDF Tools
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Reduce PDF file size without losing quality. Perfect for email attachments.',
      icon: 'fas fa-compress-alt',
      category: 'pdf',
      link: '/pdf-compressor',
      badge: 'PDF Tools',
      popular: true
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document with drag and drop interface.',
      icon: 'fas fa-object-group',
      category: 'pdf',
      link: '/pdf-merger',
      badge: 'PDF Tools'
    },
    {
      id: 'pdf-splitter',
      name: 'PDF Splitter',
      description: 'Split PDF documents into separate files by page range or extract specific pages.',
      icon: 'fas fa-cut',
      category: 'pdf',
      link: '/pdf-splitter',
      badge: 'PDF Tools'
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      description: 'Convert PDF documents to editable Word files while preserving formatting.',
      icon: 'fas fa-file-word',
      category: 'pdf',
      link: '/pdf-to-word',
      badge: 'PDF Tools'
    },
    // Text Tools
    {
      id: 'word-counter',
      name: 'Word Counter',
      description: 'Count words, characters, sentences, and paragraphs in your text instantly.',
      icon: 'fas fa-calculator',
      category: 'text',
      link: '/word-counter',
      badge: 'Text Tools'
    },
    {
      id: 'text-case-converter',
      name: 'Text Case Converter',
      description: 'Convert text between uppercase, lowercase, title case, and sentence case instantly.',
      icon: 'fas fa-font',
      category: 'text',
      link: '/text-case-converter',
      badge: 'Text Tools'
    },
    // Utility Tools
    {
      id: 'qr-generator',
      name: 'QR Code Generator',
      description: 'Create custom QR codes for URLs, contact info, WiFi, and more. Download in multiple formats.',
      icon: 'fas fa-qrcode',
      category: 'utility',
      link: '/qr-generator',
      badge: 'Utility Tools',
      popular: true
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Pick colors from images or enter values to get HEX, RGB, and HSL color codes.',
      icon: 'fas fa-eye-dropper',
      category: 'utility',
      link: '/color-picker',
      badge: 'Utility Tools'
    },
    // Data Conversion Tools
    {
      id: 'xml-to-excel-converter',
      name: 'XML to Excel Converter',
      description: 'Convert XML files to Excel spreadsheets with smart formatting and data preservation.',
      icon: 'fas fa-exchange-alt',
      category: 'utility',
      link: '/xml-to-excel-converter',
      badge: 'Data Tools'
    },
    {
      id: 'excel-to-xml-converter',
      name: 'Excel to XML Converter',
      description: 'Transform Excel spreadsheets to structured XML format with customizable options.',
      icon: 'fas fa-file-export',
      category: 'utility',
      link: '/excel-to-xml-converter',
      badge: 'Data Tools'
    }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Tools', icon: 'fas fa-star' },
    { id: 'ai', name: 'AI Tools', icon: 'fas fa-robot' },
    { id: 'image', name: 'Image Tools', icon: 'fas fa-image' },
    { id: 'pdf', name: 'PDF Tools', icon: 'fas fa-file-pdf' },
    { id: 'text', name: 'Text Tools', icon: 'fas fa-font' },
    { id: 'utility', name: 'Utility Tools', icon: 'fas fa-tools' }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Users This Month', icon: 'fas fa-users' },
    { number: '100%', label: 'Free Forever', icon: 'fas fa-heart' },
    { number: '24/7', label: 'Always Available', icon: 'fas fa-bolt' },
    { number: '0', label: 'Sign-ups Required', icon: 'fas fa-shield-alt' }
  ];

  return (
    <>
      <SEO {...seoConfigs.home} />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 mt-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              <span className="text-primary">Explore the Galaxy</span> of Free Digital Tools
            </h1>
            <p className="text-xl text-gray-300 mb-10 animate-fadeIn delay-100">
              No sign-ups, no pricing plans - just free tools to make your digital life easier.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-200">
            <Link
              to="/all-tools"
              className="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-glow hover:shadow-xl"
            >
              <i className="fas fa-rocket mr-2"></i>Start Using Tools
            </Link>
            <a
              href="#story"
              className="bg-secondary hover:bg-teal-500 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-glow hover:shadow-xl inline-flex items-center justify-center"
            >
              <i className="fas fa-heart mr-2"></i>Our Story
            </a>
          </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-soft-dark flex flex-col items-center justify-center animate-float border border-gray-700/50" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-4">
                  <i className={`${stat.icon} text-xl`}></i>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                <p className="font-medium text-center text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="mb-16">
          <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-center mb-8 galaxy-title">
              Why We Built ToolGalaxy
            </h2>
            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We built ToolGalaxy because we were tired of hunting down different free online tools scattered across the web. As someone who works with files daily, I know how frustrating it is to find a decent image compressor that doesn't plaster watermarks everywhere or require you to sign up for yet another account.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                That's why we created this collection of tools that actually work - no catches, no premium upgrades, just simple utilities that get the job done. Whether you need to compress photos for your website, extract text from a document, or generate content ideas, everything runs right in your browser.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Your files never leave your computer, which means your privacy stays intact. We've helped over 50,000 people this month alone save time on tedious digital tasks, and honestly, that's what keeps us motivated to add more free tools to the collection.
              </p>
              <div className="text-center mt-8">
                <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full">
                  <i className="fas fa-heart mr-2"></i>
                  <span className="font-medium">Made with love for the community</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured AI Tools Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="galaxy-title">
              <i className="fas fa-robot mr-3 text-primary"></i>
              Featured AI-Powered Tools
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {tools.filter(tool => tool.featured).map((tool) => (
              <Link
                key={tool.id}
                to={tool.link}
                className="group bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm p-8 rounded-2xl border border-primary/20 transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/20 hover:to-secondary/20 hover:transform hover:scale-105 hover:shadow-cosmic relative overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* NEW badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                  NEW
                </div>

                <div className="relative z-10">
                  <div className="flex items-start mb-6">
                    <div className="bg-primary/25 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-primary/35 transition-colors">
                      <i className={`${tool.icon} text-2xl text-primary`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-white">{tool.name}</h3>
                      <div className="inline-block bg-primary/20 text-primary text-sm px-3 py-1 rounded-full border border-primary/30">
                        {tool.badge}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors text-lg leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-6 flex items-center text-primary font-medium">
                    <span>Try it now</span>
                    <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Filter Buttons */}
        <section className="my-12">
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
              </button>
            ))}
          </div>
        </section>
        
        {/* Tools Section */}
        <section id="all-tools" className="my-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <span className="galaxy-title">
                Galaxy of Free Tools
              </span>
            </h2>
            <p className="text-primary font-medium">
              <i className="fas fa-star mr-2"></i>Explore Our Cosmic Toolkit
            </p>
          </div>
          
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
                    <h3 className="text-xl font-bold mb-1">{tool.name}</h3>
                    <div className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {tool.badge}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="galaxy-title">
              Why Choose ToolGalaxy?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50">
              <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-dollar-sign text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free Forever</h3>
              <p className="text-gray-300">
                All tools are completely free with no hidden costs, premium tiers, or subscription traps. Use them as much as you want.
              </p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-300">
                Your files are processed locally in your browser. Nothing gets uploaded to our servers, ensuring complete privacy.
              </p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-bolt text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Process files in seconds with our optimized tools. No waiting in queues, no server delays - just instant results.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="galaxy-title">
              User Experiences
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Web Designer",
                avatar: "SJ",
                text: "I was skeptical at first, but all tools are completely free! The image resizer is perfect for my client work. No watermarks, no limits."
              },
              {
                name: "Marcus Rivera",
                role: "Content Creator",
                avatar: "MR",
                text: "As a blogger, I process dozens of images daily. ToolGalaxy makes it so easy and keeps my site loading fast! The privacy aspect is huge for me."
              },
              {
                name: "Emily Chen",
                role: "Student",
                avatar: "EC",
                text: "The PDF tools are incredibly accurate. I use them for research papers and presentations. Saves me so much time compared to other tools."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-soft-dark border border-gray-700/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-4 text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-xs"></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 my-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join 50,000+ users who save time with our free tools - no signup required!
            </p>
            <Link
              to="/all-tools"
              className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-glow inline-flex items-center gap-2"
            >
              <i className="fas fa-rocket"></i>
              Explore All Tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
