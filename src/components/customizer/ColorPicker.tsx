"use client";

import { useCustomizer } from "./CustomizerContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ColorPicker() {
  const { canvas, activeObject, forceRender } = useCustomizer();

  if (!activeObject || (!activeObject.isType('i-text') && !activeObject.isType('text') && !activeObject.isType('path'))) {
    return null; // Only show color picker for text or vector paths
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeObject && canvas) {
      activeObject.set("fill", e.target.value);
      canvas.renderAll();
      forceRender();
    }
  };

  return (
    <div className="space-y-3 mt-4 pt-4 border-t">
      <Label className="text-sm font-semibold">Color</Label>
      <div className="flex items-center gap-3">
        <Input 
          type="color" 
          value={(activeObject.fill as string) || "#000000"} 
          onChange={handleChange}
          className="w-12 h-12 p-1 cursor-pointer"
        />
        <span className="text-sm text-muted-foreground uppercase">{activeObject.fill as string}</span>
      </div>
    </div>
  );
}
