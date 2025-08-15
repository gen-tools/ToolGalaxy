import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  console.log('🚀 Starting prerendering process...');
  
  // Import the server render function
  const { render, routes } = await import('../dist/server/entry-server.js');
  
  // Read the client-side HTML template
  const template = fs.readFileSync(
    path.resolve(__dirname, '../dist/client/index.html'),
    'utf-8'
  );

  // Define route metadata for SEO
  const routeMetadata: Record<string, { title: string; description: string; keywords: string }> = {
    '/': {
      title: 'ToolGalaxy - Free Online Tools for Everyone | No Signup Required',
      description: 'Access 15+ free online tools for image editing, PDF processing, text analysis, QR codes, and more. No registration, no watermarks, completely free forever.',
      keywords: 'free online tools, image resizer, pdf compressor, word counter, text converter, qr generator, background remover, online utilities, web tools'
    },
    '/about': {
      title: 'About ToolGalaxy - Free Online Tools Mission',
      description: 'Learn about ToolGalaxy\'s mission to provide free, accessible online tools for everyone. No registration required, completely free forever.',
      keywords: 'about toolgalaxy, free tools, mission, online utilities, web tools'
    },
    '/contact': {
      title: 'Contact ToolGalaxy - Get Support & Feedback',
      description: 'Contact ToolGalaxy for support, feedback, or questions about our free online tools. We\'re here to help improve your experience.',
      keywords: 'contact toolgalaxy, support, feedback, help, customer service'
    },
    '/all-tools': {
      title: 'All Free Online Tools - Complete Collection | ToolGalaxy',
      description: 'Browse our complete collection of free online tools including image processing, PDF manipulation, text utilities, and data conversion tools.',
      keywords: 'all tools, free online tools, image tools, pdf tools, text tools, data conversion'
    },
    '/blog': {
      title: 'ToolGalaxy Blog - Guides & Tutorials for Online Tools',
      description: 'Expert guides, tutorials, and tips for using free online tools effectively. Learn optimization techniques and best practices.',
      keywords: 'toolgalaxy blog, tool guides, tutorials, optimization tips, best practices'
    },
    '/image-resizer': {
      title: 'Free Image Resizer Online - Resize Images Without Quality Loss',
      description: 'Resize images online for free. Maintain aspect ratio, custom dimensions, and perfect quality. Supports JPG, PNG, GIF, WebP. No signup required.',
      keywords: 'image resizer, resize image online, photo resizer, image dimensions, scale image, crop image, image editor'
    },
    '/sitemap': {
      title: 'Sitemap | ToolGalaxy - Free Online Tools',
      description: 'Complete sitemap of all free online tools available on ToolGalaxy. Find image processing, PDF manipulation, text utilities, and data conversion tools.',
      keywords: 'sitemap, free online tools, image tools, pdf tools, text tools, web utilities'
    },
    '/privacy-policy': {
      title: 'Privacy Policy - ToolGalaxy Data Protection',
      description: 'ToolGalaxy privacy policy explaining how we protect your data. We don\'t store files or personal information. Complete privacy guaranteed.',
      keywords: 'privacy policy, data protection, privacy, security, toolgalaxy'
    }
  };

  // Create navigation links HTML that will be in every page
  const navigationHTML = `
    <nav class="hidden md:flex space-x-8">
      <a href="/" class="text-gray-300 hover:text-primary transition-colors">Home</a>
      <a href="/all-tools" class="text-gray-300 hover:text-primary transition-colors">All Tools</a>
      <a href="/blog" class="text-gray-300 hover:text-primary transition-colors">Blog</a>
      <a href="/about" class="text-gray-300 hover:text-primary transition-colors">About</a>
      <a href="/contact" class="text-gray-300 hover:text-primary transition-colors">Contact</a>
    </nav>`;

  const footerLinksHTML = `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Image Tools</h3>
        <ul class="space-y-2">
          <li><a href="/image-resizer" class="text-gray-400 hover:text-primary transition-colors">Image Resizer</a></li>
          <li><a href="/image-compressor" class="text-gray-400 hover:text-primary transition-colors">Image Compressor</a></li>
          <li><a href="/background-remover" class="text-gray-400 hover:text-primary transition-colors">Background Remover</a></li>
          <li><a href="/png-to-jpg" class="text-gray-400 hover:text-primary transition-colors">PNG to JPG</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">PDF Tools</h3>
        <ul class="space-y-2">
          <li><a href="/pdf-compressor" class="text-gray-400 hover:text-primary transition-colors">PDF Compressor</a></li>
          <li><a href="/pdf-splitter" class="text-gray-400 hover:text-primary transition-colors">PDF Splitter</a></li>
          <li><a href="/pdf-to-word" class="text-gray-400 hover:text-primary transition-colors">PDF to Word</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Text Tools</h3>
        <ul class="space-y-2">
          <li><a href="/word-counter" class="text-gray-400 hover:text-primary transition-colors">Word Counter</a></li>
          <li><a href="/text-case-converter" class="text-gray-400 hover:text-primary transition-colors">Text Case Converter</a></li>
          <li><a href="/ai-text-generator" class="text-gray-400 hover:text-primary transition-colors">AI Text Generator</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4">Company</h3>
        <ul class="space-y-2">
          <li><a href="/about" class="text-gray-400 hover:text-primary transition-colors">About</a></li>
          <li><a href="/contact" class="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
          <li><a href="/privacy-policy" class="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a></li>
          <li><a href="/sitemap" class="text-gray-400 hover:text-primary transition-colors">Sitemap</a></li>
        </ul>
      </div>
    </div>`;

  // Prerender each route
  for (const route of routes) {
    try {
      console.log(`📄 Prerendering ${route}...`);
      
      // Get metadata for this route
      const metadata = routeMetadata[route] || {
        title: 'ToolGalaxy - Free Online Tools',
        description: 'Free online tools for everyone',
        keywords: 'free online tools'
      };

      // Render the route
      const appHtml = render(route);
      
      // Inject navigation and metadata into the template
      let html = template
        .replace('<!--app-html-->', appHtml)
        .replace('<title>ToolGalaxy - Free Online Tools for Everyone | No Signup Required</title>', 
                 `<title>${metadata.title}</title>`)
        .replace(/(<meta name="description" content=")[^"]*(")/,
                 `$1${metadata.description}$2`)
        .replace(/(<meta name="keywords" content=")[^"]*(")/,
                 `$1${metadata.keywords}$2`)
        .replace(/(<link rel="canonical" href="https:\/\/toolgalaxy\.com)[^"]*(")/,
                 `$1${route}$2`)
        .replace(/(<meta property="og:url" content="https:\/\/toolgalaxy\.com)[^"]*(")/,
                 `$1${route}$2`);

      // Create directory structure
      const routePath = route === '/' ? '/index' : route;
      const filePath = path.resolve(__dirname, '../dist/client', `.${routePath}.html`);
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the prerendered HTML
      fs.writeFileSync(filePath, html);
      
      console.log(`✅ Prerendered ${route} -> ${filePath}`);
    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error);
    }
  }

  // Copy main index.html for root
  const indexPath = path.resolve(__dirname, '../dist/client/index.html');
  const mainIndexPath = path.resolve(__dirname, '../dist/client/index.html');
  
  console.log('🎉 Prerendering completed!');
  console.log(`📁 Generated ${routes.length} static HTML files`);
}

// Run prerendering
prerender().catch(console.error);
