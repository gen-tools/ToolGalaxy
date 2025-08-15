import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Download, QrCode, Globe, Wifi, Phone, Mail, User, Type, Settings } from 'lucide-react';
import QRCodeLib from 'qrcode';
import { ToolPageTemplate } from '../components/ToolPageTemplate';

interface QRContent {
  type: 'url' | 'text' | 'wifi' | 'contact' | 'email' | 'phone';
  value: string;
}

interface QRSettings {
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  color: string;
  backgroundColor: string;
}

export const QRCodeGenerator: React.FC = () => {
  const [content, setContent] = useState<QRContent>({ type: 'url', value: 'https://example.com' });
  const [qrSettings, setQRSettings] = useState<QRSettings>({
    size: 300,
    errorCorrection: 'M',
    color: '#000000',
    backgroundColor: '#ffffff'
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form fields for different content types
  const [urlInput, setUrlInput] = useState('https://example.com');
  const [textInput, setTextInput] = useState('');
  const [wifiData, setWifiData] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '', company: '' });
  const [emailData, setEmailData] = useState({ address: '', subject: '', body: '' });
  const [phoneInput, setPhoneInput] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = useCallback(async () => {
    if (!content.value.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      await QRCodeLib.toCanvas(canvas, content.value, {
        width: qrSettings.size,
        errorCorrectionLevel: qrSettings.errorCorrection,
        color: {
          dark: qrSettings.color,
          light: qrSettings.backgroundColor
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      setQrCodeUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [content.value, qrSettings]);

  useEffect(() => {
    if (content.value.trim()) {
      generateQRCode();
    }
  }, [generateQRCode]);

  const handleContentTypeChange = (type: QRContent['type']) => {
    let newValue = '';
    
    switch (type) {
      case 'url':
        newValue = urlInput;
        break;
      case 'text':
        newValue = textInput;
        break;
      case 'wifi':
        newValue = `WIFI:S:${wifiData.ssid};T:${wifiData.encryption};P:${wifiData.password};;`;
        break;
      case 'contact':
        newValue = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nORG:${contactData.company}\nEND:VCARD`;
        break;
      case 'email':
        newValue = `mailto:${emailData.address}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        break;
      case 'phone':
        newValue = `tel:${phoneInput}`;
        break;
    }
    
    setContent({ type, value: newValue });
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContentForm = () => {
    switch (content.type) {
      case 'url':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Website URL</label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setContent(prev => ({ ...prev, value: e.target.value }));
              }}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              placeholder="https://example.com"
            />
          </div>
        );
      
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Text Content</label>
            <textarea
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
                setContent(prev => ({ ...prev, value: e.target.value }));
              }}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              rows={3}
              placeholder="Enter text to encode"
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiData.ssid}
                  onChange={(e) => {
                    const newWifiData = { ...wifiData, ssid: e.target.value };
                    setWifiData(newWifiData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `WIFI:S:${newWifiData.ssid};T:${newWifiData.encryption};P:${newWifiData.password};;`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="MyWiFiNetwork"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="text"
                  value={wifiData.password}
                  onChange={(e) => {
                    const newWifiData = { ...wifiData, password: e.target.value };
                    setWifiData(newWifiData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `WIFI:S:${newWifiData.ssid};T:${newWifiData.encryption};P:${newWifiData.password};;`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="SecurePassword"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Encryption Type</label>
              <select
                value={wifiData.encryption}
                onChange={(e) => {
                  const newWifiData = { ...wifiData, encryption: e.target.value };
                  setWifiData(newWifiData);
                  setContent(prev => ({ 
                    ...prev, 
                    value: `WIFI:S:${newWifiData.ssid};T:${newWifiData.encryption};P:${newWifiData.password};;`
                  }));
                }}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Encryption</option>
              </select>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(e) => {
                    const newContactData = { ...contactData, name: e.target.value };
                    setContactData(newContactData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `BEGIN:VCARD\nVERSION:3.0\nFN:${newContactData.name}\nTEL:${newContactData.phone}\nEMAIL:${newContactData.email}\nORG:${newContactData.company}\nEND:VCARD`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => {
                    const newContactData = { ...contactData, phone: e.target.value };
                    setContactData(newContactData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `BEGIN:VCARD\nVERSION:3.0\nFN:${newContactData.name}\nTEL:${newContactData.phone}\nEMAIL:${newContactData.email}\nORG:${newContactData.company}\nEND:VCARD`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={contactData.email}
                onChange={(e) => {
                  const newContactData = { ...contactData, email: e.target.value };
                  setContactData(newContactData);
                  setContent(prev => ({ 
                    ...prev, 
                    value: `BEGIN:VCARD\nVERSION:3.0\nFN:${newContactData.name}\nTEL:${newContactData.phone}\nEMAIL:${newContactData.email}\nORG:${newContactData.company}\nEND:VCARD`
                  }));
                }}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company/Organization (Optional)</label>
              <input
                type="text"
                value={contactData.company}
                onChange={(e) => {
                  const newContactData = { ...contactData, company: e.target.value };
                  setContactData(newContactData);
                  setContent(prev => ({ 
                    ...prev, 
                    value: `BEGIN:VCARD\nVERSION:3.0\nFN:${newContactData.name}\nTEL:${newContactData.phone}\nEMAIL:${newContactData.email}\nORG:${newContactData.company}\nEND:VCARD`
                  }));
                }}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                placeholder="Acme Inc."
              />
            </div>
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={emailData.address}
                  onChange={(e) => {
                    const newEmailData = { ...emailData, address: e.target.value };
                    setEmailData(newEmailData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `mailto:${newEmailData.address}?subject=${encodeURIComponent(newEmailData.subject)}&body=${encodeURIComponent(newEmailData.body)}`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject (Optional)</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => {
                    const newEmailData = { ...emailData, subject: e.target.value };
                    setEmailData(newEmailData);
                    setContent(prev => ({ 
                      ...prev, 
                      value: `mailto:${newEmailData.address}?subject=${encodeURIComponent(newEmailData.subject)}&body=${encodeURIComponent(newEmailData.body)}`
                    }));
                  }}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                  placeholder="Hello!"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message Body (Optional)</label>
              <textarea
                value={emailData.body}
                onChange={(e) => {
                  const newEmailData = { ...emailData, body: e.target.value };
                  setEmailData(newEmailData);
                  setContent(prev => ({ 
                    ...prev, 
                    value: `mailto:${newEmailData.address}?subject=${encodeURIComponent(newEmailData.subject)}&body=${encodeURIComponent(newEmailData.body)}`
                  }));
                }}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
                rows={2}
                placeholder="I would like to get in touch..."
              />
            </div>
          </div>
        );
      
      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => {
                setPhoneInput(e.target.value);
                setContent(prev => ({ ...prev, value: `tel:${e.target.value}` }));
              }}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const features = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Private',
      description: 'Your data is never stored on our servers. All processing happens in your browser.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Instant Generation',
      description: 'Create QR codes in seconds with our optimized generation engine.'
    },
    {
      icon: 'fas fa-palette',
      title: 'Fully Customizable',
      description: 'Customize colors, size, and error correction to match your brand.'
    }
  ];

  const useCases = [
    {
      icon: 'fas fa-globe',
      title: 'Website Links',
      description: 'Drive traffic to your website or landing pages'
    },
    {
      icon: 'fas fa-wifi',
      title: 'WiFi Access',
      description: 'Share network credentials without passwords'
    },
    {
      icon: 'fas fa-user',
      title: 'Contact Sharing',
      description: 'Share contact information with a scan'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Links',
      description: 'Create quick email composition links'
    }
  ];

  const humanContent = {
    title: 'Professional QR Code Creation Made Simple',
    paragraphs: [
      'Creating professional QR codes has never been easier. Whether you run a restaurant wanting to share your digital menu, a business professional exchanging contact information, or a home user sharing WiFi credentials with guests, our QR Code Generator handles it all. I\'ve personally used this tool for everything from wedding invitations to business card alternatives, and the convenience is incredible.',
      'What sets our generator apart is its versatility and customization options. Unlike basic QR generators that only handle website links, ours supports six different content types including WiFi networks, contact cards, email templates, phone numbers, plain text, and URLs. The real-time preview lets you see exactly how your code will look, while customizable colors and sizes ensure it matches your brand perfectly.',
      'Security and privacy remain our top priorities. Your sensitive information never leaves your device - all QR code generation happens locally in your browser. Whether you\'re encoding personal contact details or confidential business information, you can trust that your data stays private. The tool works instantly without any registration, making it perfect for quick professional use or last-minute marketing needs.'
    ]
  };

  const toolInterface = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Content Input Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">QR Code Content</h2>
        
        {/* Content Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">QR Code Type</label>
          <select
            value={content.type}
            onChange={(e) => handleContentTypeChange(e.target.value as QRContent['type'])}
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
          >
            <option value="url">Website URL</option>
            <option value="text">Plain Text</option>
            <option value="wifi">WiFi Network</option>
            <option value="contact">Contact Information</option>
            <option value="email">Email Address</option>
            <option value="phone">Phone Number</option>
          </select>
        </div>

        {/* Dynamic Content Form */}
        {renderContentForm()}
      </div>

      {/* Preview & Settings Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Customize & Preview</h2>
        
        {/* QR Code Preview */}
        <div className="bg-white/10 rounded-xl p-6 flex flex-col items-center mb-6">
          <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center mb-4">
            {isGenerating ? (
              <div className="animate-spin w-8 h-8 border-2 border-gray-400 border-t-gray-600 rounded-full"></div>
            ) : (
              <canvas 
                ref={canvasRef} 
                className="max-w-full max-h-full"
                style={{ display: qrCodeUrl ? 'block' : 'none' }}
              />
            )}
            {!qrCodeUrl && !isGenerating && (
              <p className="text-gray-600 text-center p-4">QR Code will appear here</p>
            )}
          </div>
          <p className="text-sm text-gray-400">Scan with your phone to test</p>
        </div>

        {/* Customization Options */}
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Foreground</label>
                <input
                  type="color"
                  value={qrSettings.color}
                  onChange={(e) => setQRSettings(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-white/20 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Background</label>
                <input
                  type="color"
                  value={qrSettings.backgroundColor}
                  onChange={(e) => setQRSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-white/20 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Size and Quality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">QR Code Size</label>
              <select
                value={qrSettings.size}
                onChange={(e) => setQRSettings(prev => ({ ...prev, size: parseInt(e.target.value) }))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              >
                <option value="200">Small (200px)</option>
                <option value="300">Medium (300px)</option>
                <option value="400">Large (400px)</option>
                <option value="500">Extra Large (500px)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Error Correction</label>
              <select
                value={qrSettings.errorCorrection}
                onChange={(e) => setQRSettings(prev => ({ ...prev, errorCorrection: e.target.value as 'L' | 'M' | 'Q' | 'H' }))}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={generateQRCode}
              disabled={!content.value.trim() || isGenerating}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="w-5 h-5 inline mr-2" />
                  Generate QR Code
                </>
              )}
            </button>
            
            {qrCodeUrl && (
              <button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageTemplate
      title="QR Code Generator"
      description="Create custom QR codes in seconds. Generate QR codes for websites, contact information, WiFi access, and more."
      icon="fas fa-qrcode"
      features={features}
      useCases={useCases}
      humanContent={humanContent}
      keywords="qr code generator, create qr code, free qr code, qr generator online, wifi qr code, contact qr code, qr code maker"
    >
      {toolInterface}
    </ToolPageTemplate>
  );
};
