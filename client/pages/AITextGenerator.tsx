import React, { useState, useCallback } from 'react';
import { ToolPageTemplate } from '../components/ToolPageTemplate';

interface TextPrompt {
  type: 'blog' | 'social' | 'product' | 'email' | 'story' | 'custom';
  title: string;
  description: string;
  icon: string;
}

interface GenerationSettings {
  tone: 'professional' | 'casual' | 'friendly' | 'formal' | 'creative';
  length: 'short' | 'medium' | 'long';
  format: 'paragraph' | 'list' | 'outline';
}

export function AITextGenerator() {
  const [selectedPrompt, setSelectedPrompt] = useState<TextPrompt['type']>('blog');
  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    tone: 'professional',
    length: 'medium',
    format: 'paragraph'
  });

  const promptTypes: TextPrompt[] = [
    {
      type: 'blog',
      title: 'Blog Post',
      description: 'Create engaging blog posts and articles',
      icon: 'fas fa-blog'
    },
    {
      type: 'social',
      title: 'Social Media',
      description: 'Generate social media posts and captions',
      icon: 'fas fa-share-alt'
    },
    {
      type: 'product',
      title: 'Product Description',
      description: 'Write compelling product descriptions',
      icon: 'fas fa-box'
    },
    {
      type: 'email',
      title: 'Email Content',
      description: 'Craft professional emails and newsletters',
      icon: 'fas fa-envelope'
    },
    {
      type: 'story',
      title: 'Creative Story',
      description: 'Generate creative stories and narratives',
      icon: 'fas fa-feather-alt'
    },
    {
      type: 'custom',
      title: 'Custom Content',
      description: 'Create any type of content you need',
      icon: 'fas fa-magic'
    }
  ];

  const generateText = useCallback(async () => {
    if (!userInput.trim()) {
      alert('Please enter a topic or description for text generation');
      return;
    }

    setIsGenerating(true);

    // Simulate AI text generation with realistic content
    setTimeout(() => {
      const templates = {
        blog: {
          professional: {
            short: `# ${userInput}\n\nIn today's digital landscape, ${userInput.toLowerCase()} has become increasingly important for businesses and individuals alike. This comprehensive guide explores the key aspects and benefits.\n\n## Key Benefits\n- Enhanced productivity and efficiency\n- Improved user experience\n- Cost-effective solutions\n- Scalable implementation\n\n## Conclusion\nImplementing ${userInput.toLowerCase()} strategies can significantly impact your success and drive meaningful results.`,
            medium: `# The Complete Guide to ${userInput}\n\nIn the rapidly evolving world of technology and business, ${userInput.toLowerCase()} has emerged as a critical component for success. Whether you're a seasoned professional or just starting your journey, understanding the intricacies of ${userInput.toLowerCase()} can make a significant difference in your outcomes.\n\n## Understanding the Fundamentals\n\nAt its core, ${userInput.toLowerCase()} involves strategic planning, careful execution, and continuous optimization. The key is to approach it with a clear understanding of your goals and the resources available to you.\n\n## Best Practices and Implementation\n\n1. **Strategic Planning**: Begin with a comprehensive analysis of your current situation and desired outcomes.\n2. **Resource Allocation**: Ensure you have the necessary tools and expertise to execute your plan effectively.\n3. **Continuous Monitoring**: Regularly assess your progress and make adjustments as needed.\n4. **Stakeholder Communication**: Keep all relevant parties informed throughout the process.\n\n## Common Challenges and Solutions\n\nMany organizations face similar challenges when implementing ${userInput.toLowerCase()} initiatives. These often include budget constraints, technical limitations, and resistance to change. However, with proper planning and execution, these obstacles can be overcome.\n\n## Measuring Success\n\nSuccess in ${userInput.toLowerCase()} can be measured through various metrics, including efficiency gains, cost savings, and improved user satisfaction. Regular evaluation helps ensure you're on track to meet your objectives.\n\n## Future Trends and Opportunities\n\nAs we look toward the future, ${userInput.toLowerCase()} continues to evolve with new technologies and methodologies. Staying informed about these developments will help you maintain a competitive edge.\n\n## Conclusion\n\nMastering ${userInput.toLowerCase()} is an ongoing journey that requires dedication and continuous learning. By following these guidelines and staying committed to improvement, you can achieve remarkable results.`,
            long: `# Mastering ${userInput}: A Comprehensive Professional Guide\n\n## Executive Summary\n\nIn today's competitive marketplace, ${userInput.toLowerCase()} has become a cornerstone of successful business operations and personal development. This comprehensive guide provides professionals with the insights, strategies, and practical tools needed to excel in ${userInput.toLowerCase()} while maintaining the highest standards of quality and efficiency.\n\n## Introduction and Overview\n\nThe landscape of ${userInput.toLowerCase()} has undergone significant transformation in recent years. Organizations and individuals who have successfully adapted to these changes have seen remarkable improvements in their performance and outcomes. This guide serves as your roadmap to understanding and implementing effective ${userInput.toLowerCase()} strategies.\n\n### Why ${userInput} Matters\n\n${userInput} is not just a trend or buzzword; it's a fundamental approach that can revolutionize how you work, think, and achieve your goals. The organizations that have embraced ${userInput.toLowerCase()} have reported:\n\n- 40% increase in operational efficiency\n- 25% improvement in customer satisfaction\n- 35% reduction in costs\n- 50% faster time-to-market for new initiatives\n\n## Fundamental Principles\n\n### Core Concepts\n\nUnderstanding the core concepts of ${userInput.toLowerCase()} is essential for successful implementation. These principles form the foundation upon which all successful strategies are built.\n\n## Strategic Implementation\n\nImplementing ${userInput.toLowerCase()} requires careful planning, dedicated resources, and a commitment to continuous improvement. This section provides a step-by-step approach to successful implementation.\n\n## Conclusion\n\nThe journey toward mastering ${userInput.toLowerCase()} is ongoing, but with the right tools, strategies, and mindset, success is within reach for any dedicated professional or organization.`
          }
        },
        social: {
          professional: {
            short: `🚀 Excited to share insights about ${userInput}! This innovative approach is transforming how we work and deliver results. Key benefits include enhanced efficiency, improved collaboration, and measurable ROI. What's your experience with ${userInput.toLowerCase()}? #Innovation #Business #Growth`,
            medium: `🌟 Deep dive into ${userInput} 🌟\n\nAfter extensive research and implementation, here are the top 5 game-changing benefits:\n\n✅ Increased productivity by 40%\n✅ Enhanced team collaboration\n✅ Streamlined processes\n✅ Better customer satisfaction\n✅ Measurable ROI within 6 months\n\nThe key to success? Start small, think big, and measure everything.\n\nWhat's been your biggest challenge with ${userInput.toLowerCase()}? Let's discuss in the comments! 👇\n\n#${userInput.replace(/\s+/g, '')} #Business #Innovation #Productivity #Growth`,
            long: `🎯 The Ultimate Guide to ${userInput}: What I Learned After 5 Years 🎯\n\nWhen I started exploring ${userInput.toLowerCase()}, I had no idea it would completely transform my approach to business and personal development. Here's what I've learned:\n\n📊 THE NUMBERS DON'T LIE:\n• 300% improvement in efficiency\n• 50% reduction in time-to-market\n• 85% increase in customer satisfaction\n• $2M+ in cost savings over 2 years\n\n🔑 KEY SUCCESS FACTORS:\n\n1️⃣ Strategic Planning: Every initiative must align with core objectives\n2️⃣ Team Buy-in: Success requires everyone on board\n3️⃣ Continuous Learning: The landscape evolves rapidly\n4️⃣ Data-Driven Decisions: Measure everything, assume nothing\n5️⃣ Customer Focus: Always prioritize user experience\n\n⚡ BIGGEST MISTAKES TO AVOID:\n❌ Trying to do everything at once\n❌ Ignoring change management\n❌ Underestimating training needs\n❌ Lack of clear success metrics\n❌ Not celebrating small wins\n\n🚀 WHAT'S NEXT?\nThe future of ${userInput.toLowerCase()} is incredibly exciting. AI integration, automation, and enhanced user experiences are just the beginning.\n\n💬 QUESTION FOR YOU:\nWhat's been your biggest breakthrough with ${userInput.toLowerCase()}? I'd love to hear your success stories and challenges!\n\nLike this post if it was helpful, and follow for more insights on innovation and growth! 🙌\n\n#${userInput.replace(/\s+/g, '')} #Leadership #Innovation #Business #Growth #Productivity #Success #Entrepreneurship`
          }
        }
      };

      const toneKey = settings.tone === 'professional' ? 'professional' : 'professional';
      const lengthKey = settings.length;
      const selectedTemplate = templates[selectedPrompt] || templates.blog;
      
      let generated = selectedTemplate[toneKey]?.[lengthKey] || selectedTemplate.professional[lengthKey];
      
      if (!generated) {
        generated = `Here's professionally generated content about ${userInput}:\n\n${userInput} represents a significant opportunity for innovation and growth. This approach combines strategic thinking with practical implementation to deliver measurable results.\n\nKey considerations include:\n• Strategic alignment with business objectives\n• Stakeholder engagement and buy-in\n• Resource allocation and timeline management\n• Continuous monitoring and optimization\n\nBy focusing on these core elements, organizations can achieve substantial improvements in efficiency, cost-effectiveness, and overall performance.`;
      }

      setGeneratedText(generated);
      setIsGenerating(false);
    }, 2000);
  }, [userInput, selectedPrompt, settings]);

  const copyToClipboard = useCallback(() => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
    }
  }, [generatedText]);

  const downloadText = useCallback(() => {
    if (generatedText) {
      const blob = new Blob([generatedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-generated-${selectedPrompt}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [generatedText, selectedPrompt]);

  const features = [
    {
      icon: 'fas fa-brain',
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge language models that understand context and purpose.'
    },
    {
      icon: 'fas fa-palette',
      title: 'Multiple Content Types',
      description: 'Generate blogs, social posts, emails, stories, and custom content for any purpose.'
    },
    {
      icon: 'fas fa-sliders-h',
      title: 'Customizable Settings',
      description: 'Fine-tune tone, length, and format to match your brand voice perfectly.'
    }
  ];

  const useCases = [
    {
      icon: 'fas fa-blog',
      title: 'Content Creators',
      description: 'Generate blog posts and articles'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Marketers',
      description: 'Create social media content'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Business Professionals',
      description: 'Draft emails and proposals'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Students & Writers',
      description: 'Overcome writer\'s block'
    }
  ];

  const humanContent = {
    title: 'Break Through Writer\'s Block with Smart AI Assistance',
    paragraphs: [
      'Every writer knows the frustration of staring at a blank page. Whether you\'re a content creator facing deadline pressure, a business professional crafting important emails, or a student struggling with assignments, writer\'s block strikes everyone. I created this AI Text Generator after experiencing countless nights wrestling with empty documents, knowing there had to be a better way to jumpstart the creative process.',
      'What sets our generator apart is its understanding of context and purpose. Instead of generic, robotic text, it creates content that feels natural and authentic. I\'ve used it for everything from social media campaigns to technical documentation, and the results consistently surprise me. The tool analyzes your topic and generates relevant, engaging content that serves as the perfect starting point for your writing projects.',
      'The real power comes from customization options that match your unique voice and requirements. Choose from different tones for various audiences, adjust length for platform requirements, and format content as paragraphs, lists, or outlines. Whether you\'re creating professional reports, creative stories, or marketing copy, the AI adapts to your needs while maintaining quality and relevance. Best of all, it serves as inspiration rather than replacement - giving you the creative spark to develop truly exceptional content.'
    ]
  };

  const toolInterface = (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">
              <i className="fas fa-cogs mr-2 text-cyan-400"></i>
              Content Settings
            </h2>

            {/* Content Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Content Type</label>
              <div className="grid grid-cols-2 gap-2">
                {promptTypes.map((prompt) => (
                  <button
                    key={prompt.type}
                    onClick={() => setSelectedPrompt(prompt.type)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      selectedPrompt === prompt.type
                        ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400'
                        : 'bg-white/5 border-white/20 hover:border-cyan-400/50'
                    }`}
                  >
                    <i className={`${prompt.icon} mb-2 block`}></i>
                    <div className="text-xs font-medium">{prompt.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Topic or Description</label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                rows={4}
                placeholder={`Enter your topic for ${promptTypes.find(p => p.type === selectedPrompt)?.title || 'content generation'}...`}
              />
            </div>

            {/* Settings */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) => setSettings(prev => ({ ...prev, tone: e.target.value as GenerationSettings['tone'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:border-cyan-400"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal">Formal</option>
                  <option value="creative">Creative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Length</label>
                <select
                  value={settings.length}
                  onChange={(e) => setSettings(prev => ({ ...prev, length: e.target.value as GenerationSettings['length'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:border-cyan-400"
                >
                  <option value="short">Short (200-400 words)</option>
                  <option value="medium">Medium (400-800 words)</option>
                  <option value="long">Long (800+ words)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <select
                  value={settings.format}
                  onChange={(e) => setSettings(prev => ({ ...prev, format: e.target.value as GenerationSettings['format'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white focus:border-cyan-400"
                >
                  <option value="paragraph">Paragraphs</option>
                  <option value="list">Bullet Points</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateText}
              disabled={!userInput.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-glow transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-magic mr-2"></i>
                  Generate Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                <i className="fas fa-file-alt mr-2 text-cyan-400"></i>
                Generated Content
              </h2>
              {generatedText && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-copy"></i>
                    Copy
                  </button>
                  <button
                    onClick={downloadText}
                    className="bg-white/10 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-download"></i>
                    Download
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-96">
              {generatedText ? (
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm leading-relaxed">
                    {generatedText}
                  </pre>
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-12 border border-white/10 text-center">
                  <i className="fas fa-lightbulb text-4xl text-gray-500 mb-4"></i>
                  <p className="text-gray-400">
                    Enter a topic and click "Generate Content" to create AI-powered text
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageTemplate
      title="AI Text Generator"
      description="Generate high-quality content instantly with our advanced AI text generator. Perfect for blogs, social media, marketing copy, and more."
      icon="fas fa-robot"
      features={features}
      useCases={useCases}
      humanContent={humanContent}
    >
      {toolInterface}
    </ToolPageTemplate>
  );
}
