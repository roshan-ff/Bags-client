"use client";

import React, { useEffect, useState } from "react";
import { useCustomizer } from "./CustomizerContext";
import { fabric } from "fabric";
import { Trash2, Bold, Italic, AlignLeft, AlignCenter, AlignRight, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const GOOGLE_FONTS = [
  "Abril Fatface", "Alex Brush", "Alfa Slab One", "Allura", "Amatic SC",
  "Anton", "Bangers", "Barlow", "Bebas Neue", "Bodoni Moda",
  "Cabin", "Caveat", "Cinzel", "Cinzel Decorative", "Clicker Script",
  "Comfortaa", "Cookie", "Corinthia", "Cormorant Garamond", "Cormorant Infant",
  "Cormorant SC", "Courgette", "Creepster", "Crimson Pro", "Dancing Script",
  "EB Garamond", "Euphoria Script", "Fira Sans", "Fleur De Leah", "GFS Didot",
  "Gilda Display", "Great Vibes", "Inconsolata", "Indie Flower", "Inter",
  "Italiana", "Italianno", "Josefin Sans", "Jost", "Julius Sans One",
  "La Belle Aurore", "Lato", "Libre Baskerville", "Lobster", "Lora",
  "Lovers Quarrel", "Marcellus", "Marcellus SC", "Marck Script", "Merriweather",
  "Miss Fajardose", "Monsieur La Doulaise", "Montserrat", "Mrs Saint Delafield",
  "Mulish", "Niconne", "Noto Sans", "Nunito", "Open Sans",
  "Oranienbaum", "Oswald", "Pacifico", "Permanent Marker", "Petit Formal Script",
  "Philosopher", "Pinyon Script", "Playfair Display", "Poiret One", "Poppins",
  "Press Start 2P", "Princess Sofia", "Quicksand", "Raleway", "Righteous",
  "Roboto", "Rouge Script", "Rubik", "Ruthie", "Sacramento",
  "Satisfy", "Shadows Into Light", "Spectral", "Tangerine", "Tenor Sans",
  "Theano Didot", "Ubuntu", "UnifrakturMaguntia", "Varela Round", "WindSong",
  "Yeseva One", "Zeyada",
].sort();

export function FloatingTextToolbar() {
  const { canvas, activeObject, forceRender } = useCustomizer();
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [fontOpen, setFontOpen] = useState(false);
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!canvas || !activeObject) {
        setPosition(null);
        return;
      }
      
      if (!activeObject.isType('i-text') && !activeObject.isType('text')) {
        setPosition(null);
        return;
      }

      const bound = activeObject.getBoundingRect();
      const canvasWidth = canvas.getWidth();
      
      const toolbarWidth = toolbarRef.current ? toolbarRef.current.offsetWidth : 450;
      const toolbarHeight = toolbarRef.current ? toolbarRef.current.offsetHeight : 44;
      
      // Calculate ideal left position (centered over object)
      let left = bound.left + (bound.width / 2) - (toolbarWidth / 2);
      
      // Clamp horizontally to container edges
      if (left < 10) {
        left = 10;
      } else if (left + toolbarWidth > canvasWidth - 10) {
        left = canvasWidth - toolbarWidth - 10;
      }

      // Calculate ideal top position (above object)
      let top = bound.top - toolbarHeight - 15;
      
      // If it goes off the top edge, put it below the object instead
      if (top < 10) {
        top = bound.top + bound.height + 15;
      }

      setPosition({ top, left });
    };

    updatePosition();
    // We run it again slightly after to allow the ref to populate the true width
    setTimeout(updatePosition, 10);

    if (canvas) {
      canvas.on('object:moving', updatePosition);
      canvas.on('object:scaling', updatePosition);
      canvas.on('object:rotating', updatePosition);
      canvas.on('mouse:move', updatePosition); 
    }

    return () => {
      if (canvas) {
        canvas.off('object:moving', updatePosition);
        canvas.off('object:scaling', updatePosition);
        canvas.off('object:rotating', updatePosition);
        canvas.off('mouse:move', updatePosition);
      }
    };
  }, [canvas, activeObject, forceRender]);

  if (!position || !activeObject) return null;

  const textObj = activeObject as fabric.IText;
  const currentFont = textObj.fontFamily || "Inter";
  const isBold = textObj.fontWeight === "bold";
  const isItalic = textObj.fontStyle === "italic";
  const isUnderline = textObj.underline;
  const textAlign = textObj.textAlign || "left";

  const handleFontChange = async (fontName: string) => {
    try {
      await document.fonts.load(`16px "${fontName}"`);
    } catch (e) {
      console.warn("Font loading wait failed, falling back to instant render.", e);
    }
    textObj.set("fontFamily", fontName);
    canvas?.renderAll();
    forceRender();
    setFontOpen(false);
  };

  const toggleBold = () => {
    textObj.set("fontWeight", isBold ? "normal" : "bold");
    canvas?.renderAll();
    forceRender();
  };

  const toggleItalic = () => {
    textObj.set("fontStyle", isItalic ? "normal" : "italic");
    canvas?.renderAll();
    forceRender();
  };

  const toggleUnderline = () => {
    textObj.set("underline", !isUnderline);
    canvas?.renderAll();
    forceRender();
  };

  const setAlignment = (align: string) => {
    textObj.set("textAlign", align);
    canvas?.renderAll();
    forceRender();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textObj.set("fill", e.target.value);
    canvas?.renderAll();
    forceRender();
  };

  const handleDelete = () => {
    canvas?.remove(textObj);
    canvas?.discardActiveObject();
    canvas?.renderAll();
    forceRender();
  };

  return (
    <div 
      ref={toolbarRef}
      className="absolute z-50 bg-white dark:bg-zinc-900 border shadow-lg rounded-md p-1.5 flex items-center gap-1.5 origin-bottom"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Font Selector */}
      <Popover open={fontOpen} onOpenChange={setFontOpen}>
        <PopoverTrigger className="flex items-center justify-between font-normal h-8 px-2 w-[140px] hover:bg-muted rounded text-sm whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: currentFont }}>
          <span className="truncate">{currentFont}</span>
          <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50 shrink-0" />
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" side="top" align="start">
          <Command>
            <CommandInput placeholder="Search fonts..." className="h-8" />
            <CommandList className="max-h-[250px]">
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {GOOGLE_FONTS.map((font) => (
                  <CommandItem
                    key={font}
                    value={font}
                    onSelect={() => handleFontChange(font)}
                    style={{ fontFamily: font }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentFont === font ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="text-base">{font}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-border mx-0.5" />

      {/* Font Size (+/-) could be added here, currently handled by native scaling */}
      
      {/* Text Color */}
      <div className="relative w-8 h-8 rounded hover:bg-muted flex items-center justify-center cursor-pointer overflow-hidden border">
        <input 
          type="color" 
          value={(textObj.fill as string) || "#000000"} 
          onChange={handleColorChange}
          className="absolute inset-[-10px] w-20 h-20 cursor-pointer" // Make it larger to cover the div
        />
      </div>

      <div className="w-px h-5 bg-border mx-0.5" />

      {/* Formatting Options */}
      <Button variant="ghost" size="icon" className={cn("h-8 w-8", isBold && "bg-muted")} onClick={toggleBold}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={cn("h-8 w-8", isItalic && "bg-muted")} onClick={toggleItalic}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={cn("h-8 w-8", isUnderline && "bg-muted")} onClick={toggleUnderline}>
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-5 bg-border mx-0.5" />

      <Button variant="ghost" size="icon" className={cn("h-8 w-8", textAlign === "left" && "bg-muted")} onClick={() => setAlignment("left")}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={cn("h-8 w-8", textAlign === "center" && "bg-muted")} onClick={() => setAlignment("center")}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className={cn("h-8 w-8", textAlign === "right" && "bg-muted")} onClick={() => setAlignment("right")}>
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="w-px h-5 bg-border mx-0.5" />

      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
