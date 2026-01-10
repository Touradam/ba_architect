"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PDFViewer({ isOpen, onClose, pdfUrl }: PDFViewerProps) {
  const downloadPortfolio = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Aminata_Bah_Portfolio.pdf";
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-2xl">Portfolio</DialogTitle>
            <Button
              onClick={downloadPortfolio}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogHeader>
        <div className="w-full h-[calc(95vh-80px)] p-4">
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-md"
            title="Portfolio PDF"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}


