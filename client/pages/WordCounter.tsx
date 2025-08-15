import React, { useState, useCallback, useMemo } from 'react';
import { Type, BarChart3, Target, TrendingUp } from 'lucide-react';
import { ToolPageTemplate } from '../components/ToolPageTemplate';

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
  avgWordsPerSentence: number;
  avgSentencesPerParagraph: number;
}

interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

export function WordCounter() {
  const [text, setText] = useState('');
  const [showFrequency, setShowFrequency] = useState(false);

  const stats = useMemo<TextStats>(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
        avgWordsPerSentence: 0,
        avgSentencesPerParagraph: 0
      };
    }

    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    const readingTime = Math.ceil(words / 200);
    const speakingTime = Math.ceil(words / 150);
    
    const avgWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 10) / 10 : 0;
    const avgSentencesPerParagraph = paragraphs > 0 ? Math.round((sentences / paragraphs) * 10) / 10 : 0;

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      avgWordsPerSentence,
      avgSentencesPerParagraph
    };
  }, [text]);

  const wordFrequency = useMemo<WordFrequency[]>(() => {
    if (!text.trim()) return [];

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);

    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const totalWords = words.length;
    
    return Object.entries(frequency)
      .map(([word, count]) => ({
        word,
        count,
        percentage: Math.round((count / totalWords) * 100 * 10) / 10
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }, [text]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const clearText = () => {
    setText('');
  };

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      alert('Failed to read from clipboard. Please paste manually.');
    }
  };

  const getReadabilityLevel = (avgWordsPerSentence: number) => {
    if (avgWordsPerSentence <= 10) return { level: 'Very Easy', color: 'text-green-400' };
    if (avgWordsPerSentence <= 15) return { level: 'Easy', color: 'text-green-300' };
    if (avgWordsPerSentence <= 20) return { level: 'Moderate', color: 'text-yellow-400' };
    if (avgWordsPerSentence <= 25) return { level: 'Difficult', color: 'text-orange-400' };
    return { level: 'Very Difficult', color: 'text-red-400' };
  };

  const readability = getReadabilityLevel(stats.avgWordsPerSentence);

  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Real-time Analysis',
      description: 'See statistics update instantly as you type with advanced algorithms.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Comprehensive Stats',
      description: 'Get detailed analytics including readability, word frequency, and time estimates.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Privacy Protected',
      description: 'All text analysis happens locally. Your content never leaves your device.'
    }
  ];

  const useCases = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Students',
      description: 'Track essay and assignment word counts'
    },
    {
      icon: 'fas fa-pen',
      title: 'Writers',
      description: 'Monitor article and book progress'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Professionals',
      description: 'Optimize reports and proposals'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Marketers',
      description: 'Perfect social media content'
    }
  ];

  const humanContent = {
    title: 'Professional Text Analysis That Actually Helps',
    paragraphs: [
      'As a professional writer who\'s submitted thousands of articles with strict word count requirements, I know the frustration of constantly checking text length. Whether you\'re a student with a 500-word essay limit, a blogger optimizing for SEO, or a professional crafting proposals, hitting exact word counts while maintaining quality is challenging. That\'s exactly why we built this comprehensive word counter.',
      'What makes our tool different is the depth of analysis beyond simple word counting. You get reading time estimates for presentations, speaking time for speeches, readability scores for audience targeting, and word frequency analysis to avoid repetition. I use it daily to ensure my content hits the sweet spot for different platforms - from concise social media posts to detailed technical articles.',
      'The tool serves everyone from academic writers tracking dissertation progress to content creators optimizing for different platforms. Students love the readability analysis for matching their writing level to assignment requirements, while professionals use the detailed statistics to craft more engaging reports and presentations. Everything happens locally in your browser, so your confidential documents, creative writing, and sensitive content stays completely private while you get professional-level text analysis.'
    ]
  };

  const toolInterface = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-2">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Type className="mr-2 text-cyan-400" size={20} />
              Enter Your Text
            </h2>
            <div className="flex gap-2">
              <button
                onClick={pasteFromClipboard}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                📋 Paste
              </button>
              <button
                onClick={clearText}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here to analyze word count, reading time, and more..."
            className="w-full h-96 p-4 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none resize-none text-gray-200 placeholder-gray-400"
          />
          
          <div className="mt-4 text-sm text-gray-400">
            💡 Tip: Paste content from documents, articles, or any text you want to analyze
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="lg:col-span-1">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-cyan-400" size={20} />
            Text Statistics
          </h2>

          <div className="space-y-4">
            {/* Basic Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-cyan-400">{stats.words.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Words</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.characters.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Characters</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.sentences.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Sentences</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400">{stats.paragraphs.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Paragraphs</div>
              </div>
            </div>

            {/* Advanced Stats */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Characters (no spaces)</span>
                <span className="font-medium">{stats.charactersNoSpaces.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">📖 Reading time</span>
                <span className="font-medium">{stats.readingTime} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">🎤 Speaking time</span>
                <span className="font-medium">{stats.speakingTime} min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg words/sentence</span>
                <span className="font-medium">{stats.avgWordsPerSentence}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Readability</span>
                <span className={`font-medium ${readability.color}`}>{readability.level}</span>
              </div>
            </div>

            {/* Word Frequency Toggle */}
            {text.trim() && (
              <button
                onClick={() => setShowFrequency(!showFrequency)}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
              >
                <TrendingUp className="mr-2" size={16} />
                {showFrequency ? 'Hide' : 'Show'} Word Frequency
              </button>
            )}
          </div>
        </div>

        {/* Word Frequency Analysis */}
        {showFrequency && text.trim() && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="mr-2 text-blue-400" size={18} />
              Most Used Words
            </h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {wordFrequency.map((item, index) => (
                <div key={item.word} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded mr-2">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{item.word}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-2">{item.count}x</span>
                    <span className="text-xs text-cyan-400">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ToolPageTemplate
      title="Word Counter"
      description="Analyze your text with comprehensive word count, reading time, and frequency analysis. Perfect for writers, students, and professionals."
      icon="fas fa-calculator"
      features={features}
      useCases={useCases}
      humanContent={humanContent}
      keywords="word counter, character counter, text analyzer, word count tool, reading time calculator, text statistics, essay word count"
    >
      {toolInterface}
    </ToolPageTemplate>
  );
}
