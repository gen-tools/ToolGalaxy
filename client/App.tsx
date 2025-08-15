import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpaceLayout } from "./components/SpaceLayout";
import { Home } from "./pages/Home";
import { AllTools } from "./pages/AllTools";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { ImageResizer } from "./pages/ImageResizer";
import { ImageEnhancer } from "./pages/ImageEnhancer";
import { ImageCompressor } from "./pages/ImageCompressor";
import { PDFCompressor } from "./pages/PDFCompressor";
import { PDFSplitter } from "./pages/PDFSplitter";
import { PDFToWord } from "./pages/PDFToWord";
import { PNGToJPG } from "./pages/PNGToJPG";
import { QRCodeGenerator } from "./pages/QRCodeGenerator";
import { TextCaseConverter } from "./pages/TextCaseConverter";
import { WordCounter } from "./pages/WordCounter";
import { AITextGenerator } from "./pages/AITextGenerator";
import { ImageToTextGenerator } from "./pages/ImageToTextGenerator";
import { BackgroundRemover } from "./pages/BackgroundRemover";
import { XMLToExcelConverter } from "./pages/XMLToExcelConverter";
import { ExcelToXMLConverter } from "./pages/ExcelToXMLConverter";
import { Sitemap } from "./pages/Sitemap";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { BlogPost } from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SpaceLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-tools" element={<AllTools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/image-enhancer" element={<ImageEnhancer />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/pdf-compressor" element={<PDFCompressor />} />
            <Route path="/pdf-splitter" element={<PDFSplitter />} />
            <Route path="/pdf-to-word" element={<PDFToWord />} />
            <Route path="/png-to-jpg" element={<PNGToJPG />} />
            <Route path="/qr-generator" element={<QRCodeGenerator />} />
            <Route path="/text-case-converter" element={<TextCaseConverter />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/ai-text-generator" element={<AITextGenerator />} />
            <Route path="/image-to-text-generator" element={<ImageToTextGenerator />} />
            <Route path="/background-remover" element={<BackgroundRemover />} />
            <Route path="/xml-to-excel-converter" element={<XMLToExcelConverter />} />
            <Route path="/excel-to-xml-converter" element={<ExcelToXMLConverter />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SpaceLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
