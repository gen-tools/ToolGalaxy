import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function About() {
  const stats = [
    { number: '100,000+', label: 'Happy Users', icon: 'fas fa-users' },
    { number: '15+', label: 'Free Tools', icon: 'fas fa-tools' },
    { number: '50M+', label: 'Files Processed', icon: 'fas fa-file' },
    { number: '99.9%', label: 'Uptime', icon: 'fas fa-clock' }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former Google engineer with 10+ years in web development. Passionate about making powerful tools accessible to everyone.',
      avatar: 'SJ',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: 'https://twitter.com/sarah_codes'
    },
    {
      name: 'Mike Chen',
      role: 'Lead Developer',
      bio: 'Full-stack developer specializing in browser-based applications and file processing algorithms.',
      avatar: 'MC',
      linkedin: 'https://linkedin.com/in/mike-chen-dev',
      github: 'https://github.com/mikechen'
    },
    {
      name: 'Emma Davis',
      role: 'UX Designer',
      bio: 'Design expert focused on creating intuitive interfaces that make complex tools simple to use.',
      avatar: 'ED',
      linkedin: 'https://linkedin.com/in/emma-davis-ux',
      dribbble: 'https://dribbble.com/emmadavis'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Security Engineer',
      bio: 'Cybersecurity specialist ensuring all tools maintain the highest privacy and security standards.',
      avatar: 'AR',
      linkedin: 'https://linkedin.com/in/alex-rodriguez-sec',
      twitter: 'https://twitter.com/alex_security'
    }
  ];

  const values = [
    {
      title: 'Privacy First',
      description: 'Your files never leave your device. All processing happens locally in your browser, ensuring complete privacy and security.',
      icon: 'fas fa-shield-alt',
      color: 'text-primary'
    },
    {
      title: 'Always Free',
      description: 'We believe powerful tools should be accessible to everyone. No hidden costs, no premium tiers, no limitations.',
      icon: 'fas fa-heart',
      color: 'text-red-400'
    },
    {
      title: 'Lightning Fast',
      description: 'Optimized algorithms and local processing ensure rapid results. Most tasks complete in seconds, not minutes.',
      icon: 'fas fa-bolt',
      color: 'text-yellow-400'
    },
    {
      title: 'User Focused',
      description: 'Every feature is designed based on real user feedback. We build tools that solve actual problems people face daily.',
      icon: 'fas fa-users',
      color: 'text-secondary'
    }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Vision',
      description: 'Started with a simple idea: why should people pay for basic file processing tools or compromise their privacy?'
    },
    {
      year: '2023',
      title: 'First Tools',
      description: 'Launched with 5 essential tools: Image Compressor, PDF Splitter, QR Generator, Word Counter, and Text Converter.'
    },
    {
      year: '2024',
      title: 'Growing Community',
      description: 'Reached 50,000+ users and expanded to 15+ tools based on community feedback and requests.'
    },
    {
      year: '2024',
      title: 'The Future',
      description: 'Working on AI-powered tools while maintaining our core values of privacy, speed, and accessibility.'
    }
  ];

  const seoData = {
    title: 'About ToolGalaxy - Free Online Tools for Everyone | Our Story',
    description: 'Learn about ToolGalaxy\'s mission to provide free, secure, and fast online tools. Discover our team, values, and commitment to user privacy and accessibility.',
    keywords: 'about toolgalaxy, free online tools company, tool developers, privacy focused tools, about us',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About ToolGalaxy",
      "description": "ToolGalaxy's mission to provide free, secure, and fast online tools for everyone",
      "url": "https://toolgalaxy.com/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "ToolGalaxy",
        "description": "Provider of free online tools for file processing and digital productivity",
        "foundingDate": "2023",
        "founder": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "numberOfEmployees": "4",
        "url": "https://toolgalaxy.com"
      }
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 galaxy-title">
            Building the Future of Free Online Tools
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            We're on a mission to make powerful digital tools accessible to everyone. 
            No sign-ups, no subscriptions, no compromises on privacy. 
            Just <strong>free, fast, and secure tools</strong> that work when you need them.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400 flex items-center justify-center">
                  <i className={`${stat.icon} mr-2`}></i>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
              Our Story: From Frustration to Solution
            </h2>
            
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-12">
              <div className="prose prose-lg prose-invert mx-auto">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  ToolGalaxy was born from a simple frustration that millions of people face every day. As developers and content creators, 
                  we were constantly searching for reliable online tools to compress images, split PDFs, or convert file formats. 
                  The options were either expensive, required sign-ups, added watermarks, or worse - compromised our privacy by uploading sensitive files to unknown servers.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  We realized there had to be a better way. With modern web technologies, most file processing can happen right in your browser - 
                  faster, more secure, and without any server uploads. So we built ToolGalaxy: a collection of professional-grade tools that 
                  process everything locally on your device.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Today, over <strong>100,000 people</strong> use ToolGalaxy every month to streamline their digital workflows. 
                  From students compressing images for assignments to businesses optimizing documents for email, 
                  our tools save time while protecting privacy. And we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Our Journey So Far
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-start">
                  <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mr-4 bg-opacity-20`}>
                    <i className={`${value.icon} text-xl ${value.color}`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Meet the Team Behind ToolGalaxy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <i className="fab fa-github"></i>
                    </a>
                  )}
                  {member.dribbble && (
                    <a href={member.dribbble} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <i className="fab fa-dribbble"></i>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Built with Modern Technology
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 text-primary">Frontend Technologies</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>React 18 with TypeScript for type safety</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>HTML5 Canvas for image processing</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Web APIs for file handling</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Service Workers for offline capability</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Progressive Web App features</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 text-secondary">Security & Privacy</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>100% client-side processing</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>No file uploads to servers</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>Memory cleanup after processing</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>HTTPS encryption throughout</li>
                  <li><i className="fas fa-check-circle text-green-400 mr-2"></i>No tracking or analytics cookies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Commitment to You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <i className="fas fa-heart text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-2">Always Free</h3>
                  <p className="opacity-90">No hidden costs, no premium tiers, no limitations on usage.</p>
                </div>
                <div>
                  <i className="fas fa-shield-alt text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-2">Privacy Protected</h3>
                  <p className="opacity-90">Your files stay on your device. We never see or store your data.</p>
                </div>
                <div>
                  <i className="fas fa-rocket text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold mb-2">Continuously Improving</h3>
                  <p className="opacity-90">Regular updates, new features, and performance enhancements.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/all-tools"
                  className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <i className="fas fa-tools mr-2"></i>
                  Try Our Tools
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition-all transform hover:scale-105 inline-flex items-center justify-center"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
