"use client";

import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { fabric } from "fabric";

interface CustomizerContextType {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;
  activeObject: fabric.Object | null;
  setActiveObject: (obj: fabric.Object | null) => void;
  activeBagImg: string;
  setActiveBagImg: (img: string) => void;
  forceRender: () => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export function CustomizerProvider({ children }: { children: ReactNode }) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [activeBagImg, setActiveBagImg] = useState<string>("/images/enhanced_bags/fabric tote/1.png"); // Default bag
  const [, setRenderTrigger] = useState(0);

  const forceRender = () => setRenderTrigger((prev) => prev + 1);

  return (
    <CustomizerContext.Provider
      value={{
        canvas,
        setCanvas,
        activeObject,
        setActiveObject,
        activeBagImg,
        setActiveBagImg,
        forceRender
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
}

export function useCustomizer() {
  const context = useContext(CustomizerContext);
  if (context === undefined) {
    throw new Error("useCustomizer must be used within a CustomizerProvider");
  }
  return context;
}
