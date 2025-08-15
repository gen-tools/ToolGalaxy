import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title = 'ToolGalaxy - Free Online Tools for Everyone',
  description = 'Free online tools for image editing, PDF processing, text analysis, and more. No signup required, completely free forever.',
  keywords = 'free online tools, image resizer, pdf compressor, word counter, text converter, qr generator',
  image = '/og-image.svg',
  type = 'website',
  structuredData
}: SEOProps) {
  const location = useLocation();
  const url = `https://toolgalaxy.com${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'ToolGalaxy');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', image);
    updateMetaProperty('og:url', url);
    updateMetaProperty('og:type', type);
    updateMetaProperty('og:site_name', 'ToolGalaxy');

    // Twitter Card tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', image);

    // Canonical URL
    updateCanonical(url);

    // Structured Data
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      // Default structured data for the website
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "ToolGalaxy",
        "description": "Free online tools for image editing, PDF processing, text analysis, and more",
        "url": "https://toolgalaxy.com",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "ToolGalaxy"
        }
      };
      updateStructuredData(defaultStructuredData);
    }
  }, [title, description, keywords, image, type, url, structuredData]);

  return null; // This component doesn't render anything
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaName(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function updateStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

// Pre-defined SEO configs for different pages
export const seoConfigs = {
  home: {
    title: 'ToolGalaxy - Free Online Tools for Everyone | No Signup Required',
    description: 'Access 10+ free online tools for image editing, PDF processing, text analysis, and more. No registration, no watermarks, completely free forever.',
    keywords: 'free online tools, image resizer, pdf compressor, word counter, text converter, qr generator, online utilities',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ToolGalaxy",
      "description": "Free online tools for digital productivity",
      "url": "https://toolgalaxy.com",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  },
  
  imageResizer: {
    title: 'Free Image Resizer Online - Resize Images Without Quality Loss',
    description: 'Resize images online for free. Maintain aspect ratio, custom dimensions, and perfect quality. Supports JPG, PNG, GIF, WebP. No signup required.',
    keywords: 'image resizer, resize image online, photo resizer, image dimensions, scale image, crop image, image editor',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Image Resizer",
      "description": "Free online tool to resize images without quality loss",
      "url": "https://toolgalaxy.com/image-resizer",
      "applicationCategory": "MultimediaApplication"
    }
  },
  
  pdfCompressor: {
    title: 'Free PDF Compressor - Reduce PDF File Size Online',
    description: 'Compress PDF files online for free. Reduce file size up to 70% while maintaining quality. Perfect for email attachments and faster uploads.',
    keywords: 'pdf compressor, compress pdf online, reduce pdf size, pdf optimizer, shrink pdf, pdf file size reducer',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "PDF Compressor",
      "description": "Free online tool to compress PDF files",
      "url": "https://toolgalaxy.com/pdf-compressor",
      "applicationCategory": "UtilitiesApplication"
    }
  },
  
  wordCounter: {
    title: 'Free Word Counter - Count Words, Characters & Reading Time',
    description: 'Count words, characters, sentences and paragraphs instantly. Get reading time, speaking time, and word frequency analysis. Perfect for writers and students.',
    keywords: 'word counter, character counter, text analyzer, reading time calculator, word frequency, text statistics',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Word Counter",
      "description": "Free online tool to count words and analyze text",
      "url": "https://toolgalaxy.com/word-counter",
      "applicationCategory": "UtilitiesApplication"
    }
  }
};
