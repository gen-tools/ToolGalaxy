import { RequestHandler } from "express";
import { geminiService } from "../services/gemini";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
  }
});

// Image enhancement endpoint
export const enhanceImage: RequestHandler = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No image file uploaded' });
      }

      const { enhancementType = 'general' } = req.body;
      const imageBase64 = req.file.buffer.toString('base64');
      
      const result = await geminiService.enhanceImage(
        imageBase64, 
        req.file.mimetype, 
        enhancementType
      );

      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    });
  } catch (error) {
    console.error('Image enhancement error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// PDF compression endpoint
export const compressPDF: RequestHandler = async (req, res) => {
  try {
    upload.single('pdf')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No PDF file uploaded' });
      }

      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ success: false, error: 'File must be a PDF' });
      }

      const { compressionLevel = 'medium' } = req.body;
      
      if (!['low', 'medium', 'high'].includes(compressionLevel)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid compression level. Must be low, medium, or high' 
        });
      }

      const result = await geminiService.compressPDF(
        req.file.buffer, 
        compressionLevel as 'low' | 'medium' | 'high'
      );

      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    });
  } catch (error) {
    console.error('PDF compression error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// PDF text extraction endpoint
export const extractPDFText: RequestHandler = async (req, res) => {
  try {
    upload.single('pdf')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No PDF file uploaded' });
      }

      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ success: false, error: 'File must be a PDF' });
      }

      const result = await geminiService.extractTextFromPDF(req.file.buffer);

      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    });
  } catch (error) {
    console.error('PDF text extraction error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Image analysis endpoint
export const analyzeImage: RequestHandler = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No image file uploaded' });
      }

      const { prompt = 'Analyze this image and describe what you see' } = req.body;
      const imageBase64 = req.file.buffer.toString('base64');
      
      const result = await geminiService.analyzeImage(
        prompt,
        imageBase64, 
        req.file.mimetype
      );

      if (result.success) {
        res.json(result);
      } else {
        res.status(500).json(result);
      }
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Text processing endpoint
export const processText: RequestHandler = async (req, res) => {
  try {
    const { text, prompt } = req.body;

    if (!text || !prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Both text and prompt are required' 
      });
    }

    const result = await geminiService.processDocument(prompt, text);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Text processing error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Document generation endpoint
export const generateDocument: RequestHandler = async (req, res) => {
  try {
    const { 
      type, // 'pdf', 'word', 'text'
      content, 
      template, 
      options = {} 
    } = req.body;

    if (!type || !content) {
      return res.status(400).json({ 
        success: false, 
        error: 'Document type and content are required' 
      });
    }

    const prompt = `Generate a ${type} document with the following content: ${content}. 
                   ${template ? `Use this template structure: ${template}` : ''}
                   Format the output appropriately for ${type} document type.
                   Options: ${JSON.stringify(options)}`;

    const result = await geminiService.processDocument(prompt);

    if (result.success) {
      res.json({
        success: true,
        data: {
          document: result.data,
          type: type,
          generatedAt: new Date().toISOString(),
          options: options
        }
      });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Document generation error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
