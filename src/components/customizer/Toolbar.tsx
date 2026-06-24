"use client";

import { fabric } from "fabric";
import { useCustomizer } from "./CustomizerContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Type, Trash2, ArrowUpToLine, ArrowDownToLine } from "lucide-react";

export function Toolbar() {
  const { canvas, activeObject, setActiveObject, forceRender } = useCustomizer();

  const handleAddText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Double click to edit", {
      left: 100,
      top: 100,
      fontFamily: "Inter",
      fill: "#000000",
      fontSize: 24,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    forceRender();
  };

  const handleDelete = () => {
    if (!canvas || !activeObject) return;
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();
    setActiveObject(null);
  };

  const bringForward = () => {
    if (!canvas || !activeObject) return;
    canvas.bringForward(activeObject);
    canvas.renderAll();
  };

  const sendBackward = () => {
    if (!canvas || !activeObject) return;
    canvas.sendBackwards(activeObject);
    canvas.renderAll();
  };

  const handleDeleteSpecificText = (e: React.MouseEvent, obj: fabric.Object) => {
    e.stopPropagation();
    if (!canvas) return;
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.renderAll();
    forceRender();
  };

  const textObjects = canvas ? canvas.getObjects().filter(o => o.type === 'text' || o.type === 'i-text') as fabric.IText[] : [];

  return (
    <div className="space-y-3 mt-4 pt-4 border-t">
      <Label className="text-sm font-semibold">3. Add Text & Tools</Label>
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleAddText} 
          variant="outline"
          className="w-full gap-2"
        >
          <Type className="w-4 h-4" /> Add Text
        </Button>
      </div>

      {textObjects.length > 0 && (
        <div className="mt-4 space-y-2">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Text Layers</Label>
          <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto pr-1">
            {[...textObjects].reverse().map((obj, i) => {
              const isActive = activeObject === obj;
              return (
                <div 
                  key={i}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", i.toString());
                  }}
                  onDragOver={(e) => {
                    e.preventDefault(); // allow drop
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIndexStr = e.dataTransfer.getData("text/plain");
                    if (!fromIndexStr || !canvas) return;
                    const fromIndex = parseInt(fromIndexStr, 10);
                    const toIndex = i;
                    
                    if (fromIndex === toIndex) return;

                    const displayList = [...textObjects].reverse();
                    const dragObj = displayList[fromIndex];
                    const dropObj = displayList[toIndex];

                    const allObjects = canvas.getObjects();
                    const dropActualZ = allObjects.indexOf(dropObj);

                    canvas.moveTo(dragObj, dropActualZ);
                    canvas.renderAll();
                    forceRender();
                  }}
                  onClick={() => {
                    canvas?.setActiveObject(obj);
                    canvas?.renderAll();
                    forceRender();
                  }}
                  className={`flex items-center justify-between p-2 rounded border cursor-pointer text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary/10 border-primary text-primary font-medium' 
                      : 'bg-background hover:bg-muted border-border active:scale-[0.98]'
                  }`}
                  title="Drag to reorder"
                >
                  <span className="truncate flex-1 pr-2">{obj.text || "Empty text"}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                    onClick={(e) => handleDeleteSpecificText(e, obj)}
                    title="Delete Text"
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
