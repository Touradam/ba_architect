"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PDFViewer from "@/components/PDFViewer";

export default function WorkSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/BA.A resume.pdf";
    link.download = "Aminata_Bah_Resume.pdf";
    link.click();
  };

  return (
    <>
      <section id="work" ref={ref} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-baseline gap-6 mb-16">
              <span className="text-sm text-gray-500 font-light tracking-wider">02</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
                Selected Work
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Portfolio Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Card 
                  className="cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 border-gray-200 group"
                  onClick={() => setShowPDFViewer(true)}
                >
                  <CardContent className="p-12 text-center">
                    <div className="mb-8 text-gray-800 group-hover:text-black transition-colors">
                      <FileText className="w-20 h-20 mx-auto" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl font-medium mb-4">
                      Masters Architecture Portfolio
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Explore my studio projects, design concepts, technical drawings, and creative
                      explorations showcasing my work in pursuing a Master of Architecture degree
                    </p>
                    <span className="text-sm font-medium text-black inline-flex items-center group-hover:gap-2 transition-all">
                      Click to view
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Resume Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Card 
                  className="cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 border-gray-200 group"
                  onClick={downloadResume}
                >
                  <CardContent className="p-12 text-center">
                    <div className="mb-8 text-gray-800 group-hover:text-black transition-colors">
                      <Download className="w-20 h-20 mx-auto" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-3xl font-medium mb-4">
                      Resume
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Download my resume to learn more about my education, skills, software
                      proficiency, and relevant coursework
                    </p>
                    <span className="text-sm font-medium text-black inline-flex items-center group-hover:gap-2 transition-all">
                      Click to download
                      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <PDFViewer 
        isOpen={showPDFViewer} 
        onClose={() => setShowPDFViewer(false)} 
        pdfUrl="/BA.A portfolio.pdf"
      />
    </>
  );
}

