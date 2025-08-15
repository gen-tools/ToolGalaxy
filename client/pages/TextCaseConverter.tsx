import React, { useState, useCallback, useEffect } from 'react';
import { Type, Copy, Trash2 } from 'lucide-react';
import { ToolPageTemplate } from '../components/ToolPageTemplate';

interface TextStats {
  characters: number;
  charactersWithSpaces: number;
  words: number;
  lines: number;
}

export const TextCaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [currentCase, setCurrentCase] = useState<string>('sentence');
  const [textStats, setTextStats] = useState<TextStats>({
    characters: 0,
    charactersWithSpaces: 0,
    words: 0,
    lines: 0
  });

  // Case conversion functions
  const caseConverters = {
    sentence: (text: string) => {
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => {
        return match.toUpperCase();
      });
    },
    lower: (text: string) => text.toLowerCase(),
    upper: (text: string) => text.toUpperCase(),
    title: (text: string) => {
      return text.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
    },
    capitalized: (text: string) => {
      return text.replace(/(?:^|\s)\S/g, (match) => {
        return match.toUpperCase();
      });
    },
    alternating: (text: string) => {
      return text.split('').map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
      }).join('');
    },
    inverse: (text: string) => {
      return text.split('').map(char => {
        if (char === char.toLowerCase()) {
          return char.toUpperCase();
        } else {
          return char.toLowerCase();
        }
      }).join('');
    },
    snake: (text: string) => {
      return text.toLowerCase().replace(/\s+/g, '_');
    }
  };

  // Update text statistics
  const updateTextStats = useCallback((text: string) => {
    const charactersWithoutSpaces = text.replace(/\s+/g, '').length;
    const charactersWithSpaces = text.length;
    
    const words = text.trim() ? text.split(/\s+/).filter(word => word.length > 0) : [];
    const wordCount = words.length;
    
    const lines = text.trim() ? text.split(/\r\n|\r|\n/).filter(line => line.length > 0) : [];
    const lineCount = lines.length;
    
    setTextStats({
      characters: charactersWithoutSpaces,
      charactersWithSpaces: charactersWithSpaces,
      words: wordCount,
      lines: lineCount
    });
  }, []);

  // Convert text based on selected case
  const convertText = useCallback((text: string, caseType: string) => {
    if (!text.trim()) {
      setOutputText('');
      return;
    }
    
    const converter = caseConverters[caseType as keyof typeof caseConverters];
    if (converter) {
      const converted = converter(text);
      setOutputText(converted);
    }
  }, []);

  // Handle input text change
  const handleInputChange = (text: string) => {
    setInputText(text);
    updateTextStats(text);
    convertText(text, currentCase);
  };

  // Handle case type change
  const handleCaseChange = (caseType: string) => {
    setCurrentCase(caseType);
    convertText(inputText, caseType);
  };

  // Clear text
  const clearText = () => {
    setInputText('');
    setOutputText('');
    updateTextStats('');
  };

  // Copy text to clipboard
  const copyToClipboard = async () => {
    if (!outputText.trim()) return;
    
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Initialize with empty stats
  useEffect(() => {
    updateTextStats('');
  }, [updateTextStats]);

  const caseOptions = [
    {
      id: 'sentence',
      name: 'Sentence case',
      description: 'Capitalizes first word of each sentence',
      icon: <Type className="w-5 h-5" />,
      example: 'This is sentence case.'
    },
    {
      id: 'lower',
      name: 'lower case',
      description: 'Converts all characters to lowercase',
      icon: <Type className="w-5 h-5" />,
      example: 'this is lower case.'
    },
    {
      id: 'upper',
      name: 'UPPER CASE',
      description: 'CONVERTS ALL CHARACTERS TO UPPERCASE',
      icon: <Type className="w-5 h-5" />,
      example: 'THIS IS UPPER CASE.'
    },
    {
      id: 'title',
      name: 'Title Case',
      description: 'Capitalizes First Letter Of Each Word',
      icon: <Type className="w-5 h-5" />,
      example: 'This Is Title Case.'
    },
    {
      id: 'capitalized',
      name: 'Capitalized Case',
      description: 'Capitalizes The First Letter Of Each Word',
      icon: <Type className="w-5 h-5" />,
      example: 'This Is Capitalized Case.'
    },
    {
      id: 'alternating',
      name: 'aLtErNaTiNg cAsE',
      description: 'Alternates Between Lower and Upper Case',
      icon: <Type className="w-5 h-5" />,
      example: 'tHiS iS aLtErNaTiNg CaSe.'
    },
    {
      id: 'inverse',
      name: 'iNVERSE cASE',
      description: 'Inverts Current Case of Each Character',
      icon: <Type className="w-5 h-5" />,
      example: 'tHIS iS iNVERSE cASE.'
    },
    {
      id: 'snake',
      name: 'snake_case',
      description: 'Converts text to snake_case format',
      icon: <Type className="w-5 h-5" />,
      example: 'this_is_snake_case'
    }
  ];

  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Instant Conversion',
      description: 'Transform text in real-time as you type with optimized processing.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Private',
      description: 'All text processing happens locally. Your content never leaves your device.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Works Everywhere',
      description: 'Fully responsive tool that works on desktop, tablet, and mobile devices.'
    }
  ];

  const useCases = [
    {
      icon: 'fas fa-pen',
      title: 'Writers',
      description: 'Format articles and creative writing'
    },
    {
      icon: 'fas fa-code',
      title: 'Developers',
      description: 'Convert variable names and code'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Students',
      description: 'Format academic papers'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Content Creators',
      description: 'Prepare social media posts'
    }
  ];

  const humanContent = {
    title: 'Transform Text Like a Professional Editor',
    paragraphs: [
      'Every writer, developer, and content creator faces the same frustrating problem: spending precious time manually reformatting text to match style guidelines. Whether you\'re a student formatting an academic paper, a developer converting variable names, or a social media manager preparing posts, our Text Case Converter eliminates the tedious work and gets you back to creating.',
      'I built this tool after countless hours manually fixing text formatting for clients. The converter handles eight different case types, from professional sentence case for business documents to snake_case for programming variables. What sets it apart is the real-time conversion - you see results instantly as you type, plus detailed statistics to help meet word count requirements for essays, articles, or social media posts.',
      'Privacy matters when handling sensitive content like business documents or personal writing. That\'s why everything processes locally in your browser - your text never travels to any server. Whether you\'re formatting a confidential report, preparing marketing copy, or just converting text for consistency, you can trust that your content stays completely private while getting professional-quality results every time.'
    ]
  };

  const toolInterface = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Enter Your Text</h2>
        
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-48 p-4 bg-white/10 border border-white/20 rounded-xl resize-none focus:border-cyan-400 focus:outline-none"
            placeholder="Type or paste your text here..."
          />
          <div className="absolute top-3 right-3">
            <button
              onClick={clearText}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg text-sm transition-colors"
            >
              <Trash2 className="w-4 h-4 inline mr-1" />
              Clear
            </button>
          </div>
        </div>

        {/* Text Statistics */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Text Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400">Characters</p>
              <p className="text-2xl font-bold text-cyan-400">{textStats.characters}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400">Words</p>
              <p className="text-2xl font-bold text-cyan-400">{textStats.words}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-gray-400">Lines</p>
              <p className="text-2xl font-bold text-cyan-400">{textStats.lines}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Converted Text</h2>
          <button
            onClick={copyToClipboard}
            disabled={!outputText.trim()}
            className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4 inline mr-2" />
            Copy
          </button>
        </div>

        <div className="relative">
          <div className="w-full h-48 p-4 bg-white/10 border border-white/20 rounded-xl overflow-auto">
            {outputText || (
              <p className="text-gray-500">Converted text will appear here...</p>
            )}
          </div>
        </div>

        {/* Case Options */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Case Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleCaseChange(option.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  currentCase === option.id
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-white/20 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    {option.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm mb-1">{option.name}</div>
                    <div className="text-xs text-gray-400">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageTemplate
      title="Text Case Converter"
      description="Transform your text to uppercase, lowercase, title case, sentence case and more. Perfect for writers, developers, and content creators."
      icon="fas fa-font"
      features={features}
      useCases={useCases}
      humanContent={humanContent}
    >
      {toolInterface}
    </ToolPageTemplate>
  );
};
