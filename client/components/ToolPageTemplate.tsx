import React from 'react';
import { SEO } from './SEO';

interface ToolFeature {
  icon: string;
  title: string;
  description: string;
}

interface UseCaseItem {
  icon: string;
  title: string;
  description: string;
}

interface ToolPageTemplateProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
  features: ToolFeature[];
  useCases: UseCaseItem[];
  humanContent: {
    title: string;
    paragraphs: string[];
  };
  keywords?: string;
  canonical?: string;
}

export function ToolPageTemplate({
  title,
  description,
  icon,
  children,
  features,
  useCases,
  humanContent,
  keywords,
  canonical
}: ToolPageTemplateProps) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  const seoConfig = {
    title: `${title} - Free Online Tool | ToolGalaxy`,
    description: description,
    keywords: keywords || `${title.toLowerCase()}, free online tool, web tool, ${title.toLowerCase().replace(/\s+/g, '-')}, online ${title.toLowerCase()}`,
    canonical: canonical || `https://toolgalaxy.com${currentPath}`,
    ogTitle: `${title} - Free Online Tool`,
    ogDescription: description,
    image: '/og-image.svg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title,
      "description": description,
      "applicationCategory": "Utility",
      "operatingSystem": "Web Browser",
      "url": `https://toolgalaxy.com${currentPath}`,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "provider": {
        "@type": "Organization",
        "name": "ToolGalaxy",
        "url": "https://toolgalaxy.com"
      }
    }
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-4 rounded-2xl animate-float">
              <i className={`${icon} w-8 h-8 text-white text-2xl`}></i>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">
            {title}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-delay">
            {description}
          </p>
        </header>

        {/* Main Tool Interface */}
        <main className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 mb-12 animate-slide-up">
          {children}
        </main>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Why Use Our {title}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <article 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center animate-fade-in-stagger hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} w-6 h-6 text-white`} aria-hidden="true"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Perfect For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <article 
                key={index} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-center animate-fade-in-stagger hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${useCase.icon} w-6 h-6 text-white`} aria-hidden="true"></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Human-written Content Section */}
        <article className="max-w-6xl mx-auto mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {humanContent.title}
            </span>
          </h2>
          <div className="prose prose-lg prose-invert mx-auto">
            {humanContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
