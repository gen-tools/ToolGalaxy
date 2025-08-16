import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to copy folders
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  const files = fs.readdirSync(from);
  files.forEach(file => {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);

    if (fs.statSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route configuration with SEO metadata
const routes = [
  {
    path: '/',
    title: 'ToolGalaxy - Free Online Tools for Everyone | No Signup Required',
    description: 'Access 15+ free online tools for image editing, PDF processing, text analysis, QR codes, and more. No registration, no watermarks, completely free forever.',
    keywords: 'free online tools, image resizer, pdf compressor, word counter, text converter, qr generator, background remover, online utilities, web tools'
  },
  {
    path: '/about',
    title: 'About ToolGalaxy - Free Online Tools Mission',
    description: 'Learn about ToolGalaxy\'s mission to provide free, accessible online tools for everyone. No registration required, completely free forever.',
    keywords: 'about toolgalaxy, free tools, mission, online utilities, web tools'
  },
  {
    path: '/contact',
    title: 'Contact ToolGalaxy - Get Support & Feedback',
    description: 'Contact ToolGalaxy for support, feedback, or questions about our free online tools. We\'re here to help improve your experience.',
    keywords: 'contact toolgalaxy, support, feedback, help, customer service'
  },
  {
    path: '/all-tools',
    title: 'All Free Online Tools - Complete Collection | ToolGalaxy',
    description: 'Browse our complete collection of free online tools including image processing, PDF manipulation, text utilities, and data conversion tools.',
    keywords: 'all tools, free online tools, image tools, pdf tools, text tools, data conversion'
  },
  {
    path: '/blog',
    title: 'ToolGalaxy Blog - Guides & Tutorials for Online Tools',
    description: 'Expert guides, tutorials, and tips for using free online tools effectively. Learn optimization techniques and best practices.',
    keywords: 'toolgalaxy blog, tool guides, tutorials, optimization tips, best practices'
  },
  {
    path: '/image-resizer',
    title: 'Free Image Resizer Online - Resize Images Without Quality Loss',
    description: 'Resize images online for free. Maintain aspect ratio, custom dimensions, and perfect quality. Supports JPG, PNG, GIF, WebP. No signup required.',
    keywords: 'image resizer, resize image online, photo resizer, image dimensions, scale image, crop image, image editor'
  },
  {
    path: '/sitemap',
    title: 'Sitemap | ToolGalaxy - Free Online Tools',
    description: 'Complete sitemap of all free online tools available on ToolGalaxy. Find image processing, PDF manipulation, text utilities, and data conversion tools.',
    keywords: 'sitemap, free online tools, image tools, pdf tools, text tools, web utilities'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - ToolGalaxy Data Protection',
    description: 'ToolGalaxy privacy policy explaining how we protect your data. We don\'t store files or personal information. Complete privacy guaranteed.',
    keywords: 'privacy policy, data protection, privacy, security, toolgalaxy'
  },
  // Add all tool pages
  {
    path: '/image-compressor',
    title: 'Free Image Compressor - Reduce Image File Size Online',
    description: 'Compress images online for free. Reduce JPG, PNG, GIF file sizes by up to 80% without quality loss. No registration required.',
    keywords: 'image compressor, compress image online, reduce image size, image optimization, photo compressor'
  },
  {
    path: '/image-enhancer',
    title: 'Free Image Enhancer - Improve Photo Quality Online',
    description: 'Enhance image quality online for free. Improve brightness, contrast, sharpness, and colors. Professional photo editing without software.',
    keywords: 'image enhancer, photo enhancer, improve image quality, photo editor, image editor online'
  },
  {
    path: '/background-remover',
    title: 'Free Background Remover - Remove Image Backgrounds Online',
    description: 'Remove image backgrounds automatically in seconds. AI-powered background removal for photos. No manual editing required.',
    keywords: 'background remover, remove background online, photo background removal, transparent background'
  },
  {
    path: '/png-to-jpg',
    title: 'PNG to JPG Converter - Convert Images Online Free',
    description: 'Convert PNG to JPG online for free. Reduce file sizes while maintaining quality. Batch conversion supported.',
    keywords: 'png to jpg, convert png to jpg, image converter, png jpg converter, image format converter'
  },
  {
    path: '/pdf-compressor',
    title: 'Free PDF Compressor - Reduce PDF File Size Online',
    description: 'Compress PDF files online for free. Reduce file size up to 70% while maintaining quality. Perfect for email attachments.',
    keywords: 'pdf compressor, compress pdf online, reduce pdf size, pdf optimizer, shrink pdf'
  },
  {
    path: '/word-counter',
    title: 'Free Word Counter - Count Words, Characters & Reading Time',
    description: 'Count words, characters, sentences and paragraphs instantly. Get reading time, speaking time, and word frequency analysis.',
    keywords: 'word counter, character counter, text analyzer, reading time calculator, word frequency'
  },
  {
    path: '/qr-generator',
    title: 'Free QR Code Generator - Create QR Codes Online',
    description: 'Generate QR codes for free. Create QR codes for URLs, WiFi, contact info, and more. Download in multiple formats.',
    keywords: 'qr code generator, create qr code, free qr code, qr generator online, wifi qr code'
<<<<<<< HEAD
=======
  },
  // Missing PDF Tools
  {
    path: '/pdf-splitter',
    title: 'Free PDF Splitter - Split PDF Files Online',
    description: 'Split PDF documents into separate files by page range or extract specific pages. Free online PDF splitter tool.',
    keywords: 'pdf splitter, split pdf online, extract pdf pages, pdf page splitter, divide pdf'
  },
  {
    path: '/pdf-to-word',
    title: 'PDF to Word Converter - Convert PDF to DOC Online',
    description: 'Convert PDF documents to editable Word files while preserving formatting. Free PDF to Word converter online.',
    keywords: 'pdf to word, convert pdf to doc, pdf to docx, pdf word converter, editable pdf'
  },
  // Missing Text Tools
  {
    path: '/text-case-converter',
    title: 'Text Case Converter - Change Text Case Online',
    description: 'Convert text between uppercase, lowercase, title case, and sentence case instantly. Free text case converter.',
    keywords: 'text case converter, uppercase lowercase, title case, sentence case, change text case'
  },
  {
    path: '/ai-text-generator',
    title: 'AI Text Generator - Create Content with AI',
    description: 'Generate high-quality content using AI. Create articles, blogs, social media posts, and more with artificial intelligence.',
    keywords: 'ai text generator, ai content generator, artificial intelligence writing, auto content creation'
  },
  {
    path: '/image-to-text-generator',
    title: 'Image to Text Generator - OCR Text Extraction',
    description: 'Extract text from images using advanced OCR technology. Convert photos, screenshots, and documents to editable text.',
    keywords: 'image to text, ocr online, extract text from image, photo to text, screenshot to text'
  },
  // Missing Data Conversion Tools
  {
    path: '/xml-to-excel-converter',
    title: 'XML to Excel Converter - Convert XML to XLSX Online',
    description: 'Convert XML files to Excel spreadsheets with smart formatting and data preservation. Free XML to Excel converter.',
    keywords: 'xml to excel converter, convert xml to excel, xml to xlsx, xml excel transformation'
  },
  {
    path: '/excel-to-xml-converter',
    title: 'Excel to XML Converter - Convert XLSX to XML Online',
    description: 'Transform Excel spreadsheets to structured XML format with customizable options. Free Excel to XML converter.',
    keywords: 'excel to xml converter, convert excel to xml, xlsx to xml, excel xml transformation'
>>>>>>> c248af9 (Initial commit)
  }
];

// Create static navigation HTML that search engines can crawl
const createNavigationHTML = () => `
  <!-- SEO-friendly main navigation -->
  <nav style="display: none;" id="seo-nav">
    <a href="/">Home</a>
    <a href="/all-tools">All Tools</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    
    <!-- Tool pages -->
    <a href="/image-resizer">Image Resizer</a>
    <a href="/image-compressor">Image Compressor</a>
    <a href="/image-enhancer">Image Enhancer</a>
    <a href="/background-remover">Background Remover</a>
    <a href="/png-to-jpg">PNG to JPG</a>
    <a href="/image-to-text-generator">Image to Text</a>
    
    <a href="/pdf-compressor">PDF Compressor</a>
    <a href="/pdf-splitter">PDF Splitter</a>
    <a href="/pdf-to-word">PDF to Word</a>
    
    <a href="/word-counter">Word Counter</a>
    <a href="/text-case-converter">Text Case Converter</a>
    <a href="/ai-text-generator">AI Text Generator</a>
    
    <a href="/xml-to-excel-converter">XML to Excel</a>
    <a href="/excel-to-xml-converter">Excel to XML</a>
    
    <a href="/qr-generator">QR Code Generator</a>
    
    <!-- Footer pages -->
    <a href="/privacy-policy">Privacy Policy</a>
    <a href="/sitemap">Sitemap</a>
  </nav>
`;

// Create structured data for the site
const createStructuredData = (route) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ToolGalaxy",
    "url": `https://toolgalaxy.com${route.path}`,
    "description": route.description,
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

  return `<script type="application/ld+json">${JSON.stringify(baseStructuredData, null, 2)}</script>`;
};

async function generateStaticPages() {
  console.log('🚀 Generating SEO-optimized static pages...');
  
  // Read the base template from built SPA
  const templatePath = path.resolve(__dirname, '../dist/spa/index.html');
  let template;

  try {
    template = fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error('❌ Could not read template file:', error);
    console.log('💡 Make sure to run "npm run build:client" first');
    return;
  }

  // Copy SPA build to dist root
  const spaDir = path.resolve(__dirname, '../dist/spa');
  const distDir = path.resolve(__dirname, '../dist');

  // Copy all files from spa to root dist
  console.log('📁 Copying SPA files to dist root...');
  if (fs.existsSync(spaDir)) {
    copyFolderSync(spaDir, distDir);
  }
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Generate each route
  for (const route of routes) {
    try {
      console.log(`📄 Generating ${route.path}...`);
      
      // Create customized HTML for each route
      let html = template
        .replace(
          '<title>ToolGalaxy - Free Online Tools for Everyone | No Signup Required</title>',
          `<title>${route.title}</title>`
        )
        .replace(
          /(<meta name="description" content=")[^"]*(")/,
          `$1${route.description}$2`
        )
        .replace(
          /(<meta name="keywords" content=")[^"]*(")/,
          `$1${route.keywords}$2`
        )
        .replace(
          /(<link rel="canonical" href="https:\/\/toolgalaxy\.com)[^"]*(")/,
          `$1${route.path}$2`
        )
        .replace(
          /(<meta property="og:url" content="https:\/\/toolgalaxy\.com)[^"]*(")/,
          `$1${route.path}$2`
        )
        .replace(
          /(<meta property="og:title" content=")[^"]*(")/,
          `$1${route.title}$2`
        )
        .replace(
          /(<meta property="og:description" content=")[^"]*(")/,
          `$1${route.description}$2`
        )
        .replace(
          /(<meta property="twitter:title" content=")[^"]*(")/,
          `$1${route.title}$2`
        )
        .replace(
          /(<meta property="twitter:description" content=")[^"]*(")/,
          `$1${route.description}$2`
        );

      // Add SEO navigation
      html = html.replace(
        '</body>',
        `${createNavigationHTML()}</body>`
      );

      // Add structured data
      html = html.replace(
        '</head>',
        `${createStructuredData(route)}</head>`
      );

      // Determine file path
      const routePath = route.path === '/' ? '/index' : route.path;
      const filePath = path.resolve(distDir, `.${routePath}.html`);
      const dir = path.dirname(filePath);
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(filePath, html);
      console.log(`✅ Generated ${route.path} -> ${filePath}`);
      
    } catch (error) {
      console.error(`❌ Error generating ${route.path}:`, error);
    }
  }

  console.log(`🎉 Generated ${routes.length} SEO-optimized pages!`);
  console.log('📁 All pages now include:');
  console.log('   • Proper canonical URLs');
  console.log('   • SEO-friendly navigation links');
  console.log('   • Open Graph tags');
  console.log('   • Structured data');
  console.log('   • Custom meta tags per page');
}

// Run the generator
generateStaticPages().catch(console.error);
