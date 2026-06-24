"use client";

import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useCustomizer } from "./CustomizerContext";
import { FloatingTextToolbar } from "./FloatingTextToolbar";

export function DesignCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCanvas, setActiveObject, activeBagImg, canvas } = useCustomizer();

  // Initialize Canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const { clientWidth, clientHeight } = container;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: clientWidth,
      height: clientHeight,
      preserveObjectStacking: true,
      selection: true,
    });

    setCanvas(newCanvas);

    const handleSelection = () => {
      setActiveObject(newCanvas.getActiveObject() || null);
    };

    newCanvas.on("selection:created", handleSelection);
    newCanvas.on("selection:updated", handleSelection);
    newCanvas.on("selection:cleared", handleSelection);
    newCanvas.on("object:modified", handleSelection);

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      newCanvas.setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);

    // Currently no boundaries enforced - objects can be moved freely
    newCanvas.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;
      
      // If object is the bag background, allow it to move freely without constraints
      if ((obj as any).isBagBackground) {
        return;
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      newCanvas.off();
      newCanvas.dispose();
      setCanvas(null);
    };
  }, [setCanvas, setActiveObject]);

  // Handle Background Image Changes
  useEffect(() => {
    if (canvas && containerRef.current) {
      updateBackgroundImage(canvas, activeBagImg, containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
  }, [canvas, activeBagImg]);

  const updateBackgroundImage = (c: fabric.Canvas, imgUrl: string, width: number, height: number) => {
    fabric.Image.fromURL(imgUrl, (img) => {
      // Remove any existing bag background objects
      c.getObjects().forEach((obj: any) => {
        if (obj.isBagBackground) {
          c.remove(obj);
        }
      });

      // Tag this object so we know it's the bag
      (img as any).isBagBackground = true;

      // Scale image to fit canvas proportionally
      const scaleX = width / (img.width || 1);
      const scaleY = height / (img.height || 1);
      const baseScale = Math.min(scaleX, scaleY) * 0.9; // 90% size so it's not touching edges
      
      img.scale(baseScale);

      c.add(img);
      img.center();
      
      // Make it selectable so users can adjust its size and position
      img.set({ 
        selectable: true, 
        evented: true,
        hasControls: true,
        hasBorders: true,
      });
      c.sendToBack(img);
      
      c.renderAll();
    }, { crossOrigin: "anonymous" });
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] flex items-center justify-center bg-muted/20 relative rounded-xl overflow-hidden border">
      <canvas ref={canvasRef} className="w-full h-full" />
      <FloatingTextToolbar />
    </div>
  );
}
