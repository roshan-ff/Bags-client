"use client";

import { useRef } from "react";
import { fabric } from "fabric";
import { useCustomizer } from "./CustomizerContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";

export function UploadPanel() {
  const { canvas, forceRender, activeObject } = useCustomizer();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result as string;
      fabric.Image.fromURL(data, (img) => {
        // We no longer remove existing user images to allow multiple
        
        // Tag this as a user uploaded image and store the filename
        (img as any).isUserImage = true;
        (img as any).imageName = file.name;

        // Fit the image reasonably within the canvas area
        const maxWidth = 250;
        const maxHeight = 250;
        if (img.width && img.height) {
          const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
          img.scale(scale);
        }

        canvas.add(img);
        canvas.centerObject(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        forceRender();
      });
    };
    reader.readAsDataURL(file);
    
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveSpecificImage = (e: React.MouseEvent, obj: fabric.Object) => {
    e.stopPropagation();
    if (!canvas) return;
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.renderAll();
    forceRender();
  };

  const imageObjects = canvas ? canvas.getObjects().filter(o => (o as any).isUserImage) : [];

  return (
    <div className="space-y-3 mt-4 pt-4 border-t">
      <Label className="text-sm font-semibold">2. Add Custom Logo/Sticker</Label>
      <div className="flex gap-2">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleUpload}
        />
        <Button variant="outline" className="flex-1 gap-2" onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4" /> Upload Image
        </Button>
      </div>

      {imageObjects.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Uploaded Images</Label>
          <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto pr-1">
            {[...imageObjects].reverse().map((obj, i) => {
              const isActive = activeObject === obj;
              return (
                <div 
                  key={i}
                  onClick={() => {
                    canvas?.setActiveObject(obj);
                    canvas?.renderAll();
                    forceRender();
                  }}
                  className={`flex items-center justify-between p-2 rounded border cursor-pointer text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary/10 border-primary text-primary font-medium' 
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  <span className="truncate flex-1 pr-2">{(obj as any).imageName || "Image"}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                    onClick={(e) => handleRemoveSpecificImage(e, obj)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
