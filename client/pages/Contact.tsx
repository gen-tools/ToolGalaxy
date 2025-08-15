import { useState } from 'react';
import { SEO } from '../components/SEO';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactMethods = [
    {
      title: 'General Support',
      description: 'Questions about our tools, features, or how to use them effectively.',
      icon: 'fas fa-life-ring',
      email: 'sa0663787@gmail.com',
      responseTime: 'Within 24 hours'
    },
    {
      title: 'Technical Issues',
      description: 'Bug reports, technical problems, or tool performance issues.',
      icon: 'fas fa-tools',
      email: 'technical@toolgalaxy.com',
      responseTime: 'Within 12 hours'
    },
    {
      title: 'Feature Requests',
      description: 'Suggestions for new tools or improvements to existing ones.',
      icon: 'fas fa-lightbulb',
      email: 'features@toolgalaxy.com',
      responseTime: 'Within 48 hours'
    },
    {
      title: 'Business Inquiries',
      description: 'Partnerships, collaborations, or business-related questions.',
      icon: 'fas fa-handshake',
      email: 'business@toolgalaxy.com',
      responseTime: 'Within 24 hours'
    }
  ];

  const faqs = [
    {
      question: 'How can I report a bug or technical issue?',
      answer: 'Please use our contact form below and select "Technical Issue" as the category. Include details about what tool you were using, what browser you\'re on, and what error you encountered. Screenshots are helpful too!'
    },
    {
      question: 'Can you add a specific tool I need?',
      answer: 'Absolutely! We love feature requests. Tell us what tool you need and how you\'d use it. We prioritize new tools based on user demand and technical feasibility.'
    },
    {
      question: 'Do you offer API access for your tools?',
      answer: 'Currently, all our tools are designed for browser use only. However, we\'re exploring API options for the future. Contact us to discuss your specific needs.'
    },
    {
      question: 'How do you ensure my files stay private?',
      answer: 'All file processing happens in your browser - your files never get uploaded to our servers. This is built into how our tools work, ensuring complete privacy by design.'
    },
    {
      question: 'Can I integrate your tools into my website?',
      answer: 'While our tools aren\'t currently available as embeddable widgets, we\'re working on this feature. Contact us to discuss your integration needs.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const seoData = {
    title: 'Contact Us - Get Support for Free Online Tools | ToolGalaxy',
    description: 'Need help with our free online tools? Contact ToolGalaxy for technical support, feature requests, or general questions. We respond within 24 hours.',
    keywords: 'contact toolgalaxy, tool support, technical help, feature request, customer service',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact ToolGalaxy",
      "description": "Get support and contact ToolGalaxy for questions about free online tools",
      "url": "https://toolgalaxy.com/contact"
    }
  };

  return (
    <>
      <SEO {...seoData} />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 galaxy-title">
            Get in Touch with ToolGalaxy
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Have questions about our free online tools? Need technical support? Want to suggest a new feature? 
            We're here to help! Our team responds to all inquiries within <strong>24 hours</strong>.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/50">
              <span className="text-primary font-semibold">⚡ Fast Response</span>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/50">
              <span className="text-secondary font-semibold">👥 Friendly Support</span>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/50">
              <span className="text-green-400 font-semibold">🆓 Always Free</span>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Choose Your Contact Method
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mr-4">
                    <i className={`${method.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <p className="text-gray-300 mb-3">{method.description}</p>
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${method.email}`}
                        className="text-primary hover:text-secondary transition-colors font-medium flex items-center"
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        {method.email}
                      </a>
                      <p className="text-sm text-gray-400">
                        <i className="fas fa-clock mr-2"></i>
                        Response time: {method.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
              Send Us a Message
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-400 mr-3"></i>
                      <div>
                        <div className="font-medium text-green-400">Message Sent Successfully!</div>
                        <div className="text-sm text-gray-300">We'll get back to you within 24 hours.</div>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <i className="fas fa-exclamation-circle text-red-400 mr-3"></i>
                      <div>
                        <div className="font-medium text-red-400">Error Sending Message</div>
                        <div className="text-sm text-gray-300">Please try again or email us directly.</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-gray-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-gray-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-gray-200"
                    >
                      <option value="general">General Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="feature">Feature Request</option>
                      <option value="business">Business Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-gray-200"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary focus:outline-none text-gray-200 resize-none"
                      placeholder="Please provide as much detail as possible..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">Other Ways to Reach Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-primary mr-4"></i>
                      <div>
                        <div className="font-medium">Email Support</div>
                        <div className="text-gray-400 text-sm">hello@toolgalaxy.com</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-twitter text-primary mr-4"></i>
                      <div>
                        <div className="font-medium">Twitter</div>
                        <div className="text-gray-400 text-sm">@toolgalaxy</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="fab fa-github text-primary mr-4"></i>
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-gray-400 text-sm">github.com/toolgalaxy</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                  <h3 className="text-xl font-bold mb-4">Response Times</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">General Inquiries</span>
                      <span className="text-primary font-medium">&lt; 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Technical Issues</span>
                      <span className="text-secondary font-medium">&lt; 12 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Feature Requests</span>
                      <span className="text-purple-400 font-medium">&lt; 48 hours</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-3">Quick Tip</h3>
                  <p className="text-sm opacity-90">
                    For faster support, include your browser type, operating system, and specific steps to reproduce any issues you're experiencing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 galaxy-title">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
