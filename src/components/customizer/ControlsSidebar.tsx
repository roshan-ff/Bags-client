"use client";

import { BagSelector } from "./BagSelector";
import { UploadPanel } from "./UploadPanel";
import { Toolbar } from "./Toolbar";
import { useCustomizer } from "./CustomizerContext";
import { Button } from "@/components/ui/button";

export function ControlsSidebar() {
  const { canvas } = useCustomizer();

  const handleDownload = () => {
    if (!canvas) return;
    // Hide selection handles before export
    canvas.discardActiveObject();
    canvas.renderAll();
    
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2 // High res
    });

    const link = document.createElement('a');
    link.download = 'my-custom-bag.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="w-full lg:w-[350px] bg-card border rounded-xl p-6 shadow-sm flex flex-col h-full min-h-0 overflow-y-auto"
      data-lenis-prevent="true"
    >
      <h2 className="text-xl font-bold mb-6 font-lora">Design Controls</h2>
      
      <div className="flex-1 space-y-2">
        <BagSelector />
        <UploadPanel />
        <Toolbar />
      </div>

      <div className="mt-8 pt-6 border-t">
        <Button className="w-full" size="lg" onClick={handleDownload}>
          Download Preview
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Download your design to attach it to your quote request!
        </p>
      </div>
    </div>
  );
}
