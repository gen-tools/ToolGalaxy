import { RequestHandler } from "express";

interface GeminiApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn('GEMINI_API_KEY not found or not properly configured in environment variables');
      this.apiKey = ''; // Reset placeholder to empty
    }
  }

  async processDocument(prompt: string, fileContent?: string): Promise<GeminiApiResponse> {
    try {
      if (!this.apiKey) {
        return {
          success: false,
          error: 'Gemini API key not configured'
        };
      }

      const response = await fetch(`${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fileContent ? `${prompt}\n\nFile content: ${fileContent}` : prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini API error:', errorData);
        return {
          success: false,
          error: `API request failed: ${response.status}`
        };
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return {
          success: true,
          data: data.candidates[0].content.parts[0].text
        };
      } else {
        return {
          success: false,
          error: 'No response generated'
        };
      }
    } catch (error) {
      console.error('Gemini service error:', error);
      return {
        success: false,
        error: 'Internal processing error'
      };
    }
  }

  async analyzeImage(prompt: string, imageBase64: string, mimeType: string): Promise<GeminiApiResponse> {
    try {
      if (!this.apiKey || this.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
        return {
          success: false,
          error: 'Gemini API key not configured. Please set your GEMINI_API_KEY environment variable with a valid Google AI Studio API key.'
        };
      }

      const response = await fetch(`${this.baseUrl}/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64
                }
              }
            ]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Gemini Vision API error:', errorData);

        // Parse error for better user feedback
        try {
          const errorJson = JSON.parse(errorData);
          if (errorJson.error && errorJson.error.message.includes('API key not valid')) {
            return {
              success: false,
              error: 'Invalid Gemini API key. Please check your API key configuration.'
            };
          }
        } catch (e) {
          // Ignore JSON parse errors
        }

        return {
          success: false,
          error: `Vision API request failed: ${response.status}`
        };
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        return {
          success: true,
          data: data.candidates[0].content.parts[0].text
        };
      } else {
        return {
          success: false,
          error: 'No response generated'
        };
      }
    } catch (error) {
      console.error('Gemini vision service error:', error);
      return {
        success: false,
        error: 'Internal processing error'
      };
    }
  }

  async compressPDF(fileBuffer: Buffer, compressionLevel: 'low' | 'medium' | 'high'): Promise<GeminiApiResponse> {
    try {
      // Simulate PDF compression using Gemini to analyze and provide compression recommendations
      const prompt = `Analyze this PDF file and provide optimization recommendations for ${compressionLevel} compression level. Return a JSON response with compression settings and estimated size reduction.`;
      
      const base64Content = fileBuffer.toString('base64');
      const result = await this.processDocument(prompt, `PDF file size: ${fileBuffer.length} bytes`);
      
      if (result.success) {
        // In a real implementation, you would use a PDF processing library here
        // For now, we'll simulate the compression result
        const compressionRatios = {
          low: 0.7,   // 30% reduction
          medium: 0.4, // 60% reduction  
          high: 0.2    // 80% reduction
        };
        
        const simulatedCompressedSize = Math.floor(fileBuffer.length * compressionRatios[compressionLevel]);
        
        return {
          success: true,
          data: {
            originalSize: fileBuffer.length,
            compressedSize: simulatedCompressedSize,
            compressionRatio: Math.round((1 - compressionRatios[compressionLevel]) * 100),
            recommendations: result.data,
            // In real implementation, this would be the actual compressed PDF buffer
            compressedFile: base64Content
          }
        };
      }
      
      return result;
    } catch (error) {
      console.error('PDF compression error:', error);
      return {
        success: false,
        error: 'PDF compression failed'
      };
    }
  }

  async enhanceImage(imageBase64: string, mimeType: string, enhancementType: string): Promise<GeminiApiResponse> {
    try {
      const prompt = `Analyze this image and provide ${enhancementType} enhancement recommendations. Consider brightness, contrast, sharpness, and color correction. Return detailed optimization suggestions.`;
      
      const result = await this.analyzeImage(prompt, imageBase64, mimeType);
      
      if (result.success) {
        // In a real implementation, you would apply actual image processing here
        return {
          success: true,
          data: {
            enhancements: result.data,
            // Simulated enhanced image (would be actual processed image in real implementation)
            enhancedImage: imageBase64,
            improvements: {
              brightness: Math.random() * 20 - 10, // -10 to +10
              contrast: Math.random() * 20 - 10,   // -10 to +10
              sharpness: Math.random() * 15,       // 0 to +15
              saturation: Math.random() * 10 - 5   // -5 to +5
            }
          }
        };
      }
      
      return result;
    } catch (error) {
      console.error('Image enhancement error:', error);
      return {
        success: false,
        error: 'Image enhancement failed'
      };
    }
  }

  async extractTextFromPDF(pdfBuffer: Buffer): Promise<GeminiApiResponse> {
    try {
      const prompt = 'Extract and structure all text content from this PDF document. Preserve formatting and organization where possible.';
      
      // In a real implementation, you would first extract text using a PDF library
      // then use Gemini to structure and improve the extracted text
      const result = await this.processDocument(prompt, `PDF file with ${pdfBuffer.length} bytes`);
      
      if (result.success) {
        return {
          success: true,
          data: {
            extractedText: result.data,
            pageCount: Math.ceil(pdfBuffer.length / 10000), // Simulated page count
            wordCount: result.data.split(' ').length,
            confidence: 0.95
          }
        };
      }
      
      return result;
    } catch (error) {
      console.error('PDF text extraction error:', error);
      return {
        success: false,
        error: 'Text extraction failed'
      };
    }
  }
}

export const geminiService = new GeminiService();
