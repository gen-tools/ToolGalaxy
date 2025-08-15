import { SEO, seoConfigs } from '../components/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO {...seoConfigs.home} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="galaxy-title">Privacy Policy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Your privacy is important to us. This policy explains how we handle your data.
            </p>
            <div className="text-sm text-gray-400">
              Last updated: January 2024
            </div>
          </section>

          {/* Privacy Policy Content */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="prose prose-lg prose-invert max-w-none">
              
              <h2 className="text-2xl font-bold mb-4 text-primary">Data Collection</h2>
              <p className="text-gray-300 mb-6">
                ToolGalaxy is designed with privacy first. We do not collect, store, or transmit your personal files or data. All file processing happens locally in your browser, ensuring your sensitive information never leaves your device.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-primary">Information We Collect</h2>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>No Personal Files:</strong> Your uploaded images, PDFs, and text files are processed entirely in your browser</li>
                <li>• <strong>No Account Data:</strong> We don't require user registration or store personal information</li>
                <li>• <strong>Basic Analytics:</strong> We may collect anonymous usage statistics to improve our services</li>
                <li>• <strong>Browser Data:</strong> Standard web server logs (IP address, browser type, pages visited)</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-primary">How We Use Information</h2>
              <p className="text-gray-300 mb-6">
                The limited data we collect is used solely to:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• Provide and maintain our free online tools</li>
                <li>• Analyze website usage to improve user experience</li>
                <li>• Ensure technical functionality and security</li>
                <li>• Comply with legal requirements when necessary</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-primary">Local Processing</h2>
              <p className="text-gray-300 mb-6">
                All file processing operations (image compression, PDF manipulation, text analysis, etc.) occur entirely within your web browser using client-side JavaScript. This means:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• Your files never leave your computer</li>
                <li>• We cannot access or view your file contents</li>
                <li>• No data is transmitted to our servers during processing</li>
                <li>• You maintain complete control over your files</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-primary">Cookies and Tracking</h2>
              <p className="text-gray-300 mb-6">
                We use minimal cookies and tracking technologies:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• <strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li>• <strong>Analytics:</strong> Anonymous usage data to improve our services</li>
                <li>• <strong>No Advertising:</strong> We don't use cookies for advertising or marketing</li>
                <li>• <strong>No Cross-Site Tracking:</strong> We don't track you across other websites</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-primary">Third-Party Services</h2>
              <p className="text-gray-300 mb-6">
                We may use third-party services for:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• Website hosting and content delivery</li>
                <li>• Anonymous analytics and performance monitoring</li>
                <li>• Font and icon libraries for improved user interface</li>
              </ul>
              <p className="text-gray-300 mb-6">
                These services do not have access to your file content or personal data processed through our tools.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-primary">Data Security</h2>
              <p className="text-gray-300 mb-6">
                We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of information. Since file processing occurs locally, your data enjoys the highest level of security.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-primary">Your Rights</h2>
              <p className="text-gray-300 mb-6">
                You have the right to:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>• Use our tools without providing personal information</li>
                <li>• Clear your browser data and cookies at any time</li>
                <li>• Request information about data we may have collected</li>
                <li>• Contact us with privacy concerns or questions</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-primary">Children's Privacy</h2>
              <p className="text-gray-300 mb-6">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-primary">Changes to This Policy</h2>
              <p className="text-gray-300 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-primary">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy, please contact us through our contact page or email us at privacy@toolgalaxy.com.
              </p>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-3 text-primary">Privacy Summary</h3>
                <p className="text-gray-300">
                  <strong>Bottom line:</strong> Your files stay on your device. We don't collect, store, or have access to your personal files. 
                  ToolGalaxy is built with privacy by design, ensuring your data remains completely under your control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
