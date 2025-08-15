import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SEO } from '../components/SEO';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 'ultimate-guide-image-compression',
      title: 'Ultimate Guide to Image Compression: Reduce File Sizes by 80% Without Quality Loss',
      excerpt: 'Master professional image compression techniques for web optimization. Learn how to dramatically reduce file sizes while maintaining visual quality for faster loading websites.',
      category: 'Image Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-20',
      readTime: '12 min read',
      image: 'fas fa-compress-alt',
      keywords: 'image compression, web optimization, reduce image size, website performance, image optimization',
      featured: true,
      toolLink: '/image-compressor'
    },
    {
      id: 'image-resizing-responsive-design',
      title: 'Image Resizing for Responsive Design: Complete Guide to Perfect Dimensions',
      excerpt: 'Learn professional image resizing techniques for responsive web design. Master aspect ratios, resolution optimization, and multi-device compatibility.',
      category: 'Image Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-18',
      readTime: '11 min read',
      image: 'fas fa-expand-alt',
      keywords: 'image resizing, responsive design, image dimensions, web optimization, aspect ratio',
      toolLink: '/image-resizer'
    },
    {
      id: 'ai-text-generator-content-creation',
      title: 'AI Text Generator: Revolutionizing Content Creation in 2024',
      excerpt: 'Discover how AI text generators are transforming content creation. Learn professional techniques to create blogs, social media posts, and marketing copy instantly.',
      category: 'AI Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-16',
      readTime: '13 min read',
      image: 'fas fa-robot',
      keywords: 'ai text generator, content creation, artificial intelligence writing, automated content, ai copywriting',
      featured: true,
      toolLink: '/ai-text-generator'
    },
    {
      id: 'image-to-text-ocr-technology',
      title: 'OCR Technology: How Image to Text Conversion is Changing Document Management',
      excerpt: 'Explore the power of OCR technology for converting images to text. Learn how modern image-to-text tools revolutionize document digitization and data extraction.',
      category: 'AI Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-14',
      readTime: '12 min read',
      image: 'fas fa-eye',
      keywords: 'ocr technology, image to text conversion, document digitization, optical character recognition, text extraction',
      featured: true,
      toolLink: '/image-to-text-generator'
    },
    {
      id: 'xml-excel-conversion-data-transformation',
      title: 'XML to Excel Conversion: The Complete Guide to Data Transformation in 2024',
      excerpt: 'Master XML to Excel and Excel to XML conversion for seamless data migration. Learn best practices, avoid common pitfalls, and streamline your data workflow with professional techniques.',
      category: 'Data Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-22',
      readTime: '15 min read',
      image: 'fas fa-exchange-alt',
      keywords: 'xml to excel conversion, excel to xml converter, data transformation, file conversion, xml excel migration, data import export',
      featured: true,
      toolLink: '/xml-to-excel-converter'
    },
    {
      id: 'word-counter-content-optimization',
      title: 'Word Count Optimization: How Text Analysis Improves Content Performance',
      excerpt: 'Discover the science behind optimal word counts for different content types. Learn how text analysis and word counting enhance content effectiveness and SEO.',
      category: 'Text Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-12',
      readTime: '11 min read',
      image: 'fas fa-calculator',
      keywords: 'word count optimization, text analysis, content performance, seo optimization, content length',
      toolLink: '/word-counter'
    },
    {
      id: 'text-case-conversion-professional-writing',
      title: 'Text Case Conversion: Professional Writing Standards and Best Practices',
      excerpt: 'Master text case conversion for professional writing. Learn when to use uppercase, lowercase, title case, and sentence case for maximum impact and readability.',
      category: 'Text Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-10',
      readTime: '10 min read',
      image: 'fas fa-font',
      keywords: 'text case conversion, professional writing, title case, sentence case, writing standards',
      toolLink: '/text-case-converter'
    },
    {
      id: 'pdf-compression-document-optimization',
      title: 'PDF Compression Mastery: Reduce File Sizes While Maintaining Professional Quality',
      excerpt: 'Learn advanced PDF compression techniques to dramatically reduce file sizes without compromising document quality. Essential for business, education, and publishing.',
      category: 'PDF Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-08',
      readTime: '12 min read',
      image: 'fas fa-compress-alt',
      keywords: 'pdf compression, document optimization, file size reduction, business documents, pdf optimization',
      toolLink: '/pdf-compressor'
    },
    {
      id: 'qr-code-marketing-strategy',
      title: 'QR Code Marketing Revolution: Creative Strategies for 2024 Business Growth',
      excerpt: 'Discover innovative QR code marketing strategies that drive engagement and conversions. Learn creative campaign ideas and implementation best practices.',
      category: 'Utility Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-06',
      readTime: '13 min read',
      image: 'fas fa-qrcode',
      keywords: 'qr code marketing, digital marketing strategy, qr code campaigns, mobile marketing, customer engagement',
      toolLink: '/qr-generator'
    },
    {
      id: 'image-enhancer-professional-photography',
      title: 'Image Enhancement Mastery: Transform Photos with Professional Editing Techniques',
      excerpt: 'Learn advanced image enhancement techniques to improve photo quality. Master brightness, contrast, saturation adjustments for professional results.',
      category: 'Image Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-04',
      readTime: '11 min read',
      image: 'fas fa-magic',
      keywords: 'image enhancement, photo editing, image quality, professional photography, photo enhancement',
      toolLink: '/image-enhancer'
    },
    {
      id: 'png-to-jpg-conversion-guide',
      title: 'PNG to JPG Conversion: Complete Guide for Web Optimization and File Size Reduction',
      excerpt: 'Master PNG to JPG conversion for web optimization. Learn when and how to convert image formats for better performance and smaller file sizes.',
      category: 'Image Tools',
      author: 'ToolGalaxy Team',
      date: '2024-01-02',
      readTime: '10 min read',
      image: 'fas fa-sync-alt',
      keywords: 'png to jpg conversion, image format conversion, web optimization, file size reduction, image compression',
      toolLink: '/png-to-jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'AI Tools', name: 'AI Tools', count: blogPosts.filter(p => p.category === 'AI Tools').length },
    { id: 'Image Tools', name: 'Image Tools', count: blogPosts.filter(p => p.category === 'Image Tools').length },
    { id: 'Text Tools', name: 'Text Tools', count: blogPosts.filter(p => p.category === 'Text Tools').length },
    { id: 'PDF Tools', name: 'PDF Tools', count: blogPosts.filter(p => p.category === 'PDF Tools').length },
    { id: 'Utility Tools', name: 'Utility Tools', count: blogPosts.filter(p => p.category === 'Utility Tools').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const seoData = {
    title: 'ToolGalaxy Blog - Free Online Tool Guides & Tutorials',
    description: 'Discover expert guides and tutorials for using free online tools effectively. Learn optimization techniques, best practices, and professional tips for digital productivity.',
    keywords: 'online tools blog, digital productivity, tool tutorials, optimization guides, free software tips',
    structuredData: {
      "@type": "Blog",
      "name": "ToolGalaxy Blog",
      "description": "Expert guides and tutorials for free online tools and digital productivity optimization.",
      "url": "https://toolgalaxy.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "ToolGalaxy"
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "datePublished": post.date,
        "url": `https://toolgalaxy.com/blog/${post.id}`,
        "keywords": post.keywords
      }))
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 galaxy-title">
            Expert Guides & Tool Tutorials
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Master free online tools with our comprehensive guides. Discover optimization techniques, 
            professional tips, and best practices that transform how you work with digital content.
          </p>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 galaxy-title">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                        <i className={`${post.image} text-xl text-primary`} alt={`${post.keywords} tutorial guide optimization`}></i>
                      </div>
                      <div>
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {post.category}
                        </div>
                        <div className="text-sm text-gray-400">{post.readTime}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full border transition-all transform hover:scale-105 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-glow'
                    : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 border-gray-600 hover:border-primary hover:text-primary'
                }`}
              >
                {category.name}
                <span className="bg-gray-700/50 text-xs px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-3xl font-bold mb-8 galaxy-title">
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                        <i className={`${post.image} text-xl text-primary`} alt={`${post.keywords} professional tutorial guide`}></i>
                      </div>
                      <div>
                        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {post.category}
                        </div>
                        <div className="text-sm text-gray-400">{post.readTime}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </Link>
                  {post.toolLink && (
                    <div className="pt-4 border-t border-gray-700/50">
                      <Link
                        to={post.toolLink}
                        className="inline-flex items-center text-primary hover:text-secondary transition-colors text-sm font-medium"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Try the Tool
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Tool Tips</h2>
            <p className="text-xl opacity-90 mb-8">
              Get weekly expert guides, new tool announcements, and productivity tips delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-glow">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
