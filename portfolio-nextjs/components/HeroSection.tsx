"use client";

import { motion } from "framer-motion";
import { Eye, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PDFViewer from "@/components/PDFViewer";

export default function HeroSection() {
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const downloadPortfolio = () => {
    const link = document.createElement("a");
    link.href = "/BA.A portfolio.pdf";
    link.download = "Aminata_Bah_Portfolio.pdf";
    link.click();
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/BA.A resume.pdf";
    link.download = "Aminata_Bah_Resume.pdf";
    link.click();
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6 text-gray-900 leading-tight">
              <span className="block">Aminata Bah</span>
              <span className="block mt-2">M.Arch Student</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light"
            >
              Seeking Summer 2026 Internship | Passionate about sustainable and innovative design
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => setShowPDFViewer(true)}
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Portfolio
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={downloadPortfolio}
                className="border-black text-black hover:bg-black hover:text-white px-8 py-6 text-base"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Portfolio
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={downloadResume}
                className="border-black text-black hover:bg-black hover:text-white px-8 py-6 text-base"
              >
                <FileText className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-gray-400 mb-2"></div>
          <span className="text-xs uppercase tracking-wider text-gray-500">Scroll</span>
        </motion.div>
      </section>

      <PDFViewer 
        isOpen={showPDFViewer} 
        onClose={() => setShowPDFViewer(false)} 
        pdfUrl="/BA.A portfolio.pdf"
      />
    </>
  );
}


