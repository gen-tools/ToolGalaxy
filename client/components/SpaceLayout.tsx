import { Link, useLocation } from 'react-router-dom';
import { SpaceBackground } from './SpaceBackground';
import { useState } from 'react';

interface SpaceLayoutProps {
  children: React.ReactNode;
}

export function SpaceLayout({ children }: SpaceLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen text-gray-200">
      <SpaceBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-cosmic header-glow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center">
              <i className="fas fa-rocket text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold">
              Tool<span className="text-secondary">Galaxy</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <i className="fas fa-home mr-2"></i>Home
            </Link>
            <Link 
              to="/all-tools" 
              className={`font-medium transition-colors ${
                isActive('/all-tools') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <i className="fas fa-tools mr-2"></i>All Tools
            </Link>
            <Link 
              to="/blog" 
              className={`font-medium transition-colors ${
                isActive('/blog') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <i className="fas fa-blog mr-2"></i>Blog
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <i className="fas fa-info-circle mr-2"></i>About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <i className="fas fa-envelope mr-2"></i>Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium transition-colors ${
                  isActive('/') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-home mr-2"></i>Home
              </Link>
              <Link 
                to="/all-tools" 
                className={`font-medium transition-colors ${
                  isActive('/all-tools') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-tools mr-2"></i>All Tools
              </Link>
              <Link 
                to="/blog" 
                className={`font-medium transition-colors ${
                  isActive('/blog') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-blog mr-2"></i>Blog
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors ${
                  isActive('/about') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-info-circle mr-2"></i>About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors ${
                  isActive('/contact') ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-envelope mr-2"></i>Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm py-12 relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                  <i className="fas fa-rocket text-white"></i>
                </div>
                <span className="text-xl font-bold">
                  Tool<span className="text-secondary">Galaxy</span>
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your ultimate destination for free online tools. Process files instantly, privately, and efficiently without any sign-up requirements.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/toolgalaxy" className="text-gray-500 hover:text-primary transition-colors" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/toolgalaxy" className="text-gray-500 hover:text-primary transition-colors" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://github.com/toolgalaxy" className="text-gray-500 hover:text-primary transition-colors" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                <i className="fas fa-tools mr-2"></i>Popular Tools
              </h3>
              <ul className="space-y-2">
                <li><Link to="/image-compressor" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-compress-alt mr-2"></i>Image Compressor
                </Link></li>
                <li><Link to="/pdf-compressor" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-file-pdf mr-2"></i>PDF Compressor
                </Link></li>
                <li><Link to="/image-resizer" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-expand-alt mr-2"></i>Image Resizer
                </Link></li>
                <li><Link to="/qr-generator" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-qrcode mr-2"></i>QR Generator
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                <i className="fas fa-sitemap mr-2"></i>Quick Links
              </h3>
              <ul className="space-y-2">
                <li><Link to="/all-tools" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-tools mr-2"></i>All Tools
                </Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-blog mr-2"></i>Blog
                </Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-info-circle mr-2"></i>About Us
                </Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-envelope mr-2"></i>Contact
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                <i className="fas fa-shield-alt mr-2"></i>Legal & Support
              </h3>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-user-shield mr-2"></i>Privacy Policy
                </Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-file-contract mr-2"></i>Terms of Service
                </Link></li>
                <li><Link to="/sitemap" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-sitemap mr-2"></i>Sitemap
                </Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-primary transition-colors">
                  <i className="fas fa-question-circle mr-2"></i>Help Center
                </Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-center md:text-left">
                © 2024 ToolGalaxy. All rights reserved. <i className="fas fa-heart text-red-400"></i> Free online tools for everyone, forever!
              </p>
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">🌟 Trusted by 100,000+ users</span>
                <span className="text-gray-400 text-sm">🔒 100% Privacy Guaranteed</span>
                <span className="text-gray-400 text-sm">⚡ Lightning Fast Processing</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
