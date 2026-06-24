"use client";

import { useState, useEffect } from "react";
import { useCustomizer } from "./CustomizerContext";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// A comprehensive list of popular Google Fonts for customization
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

export function FontSelector() {
  const { canvas, activeObject, forceRender } = useCustomizer();
  const [open, setOpen] = useState(false);

  // Batch load all fonts on mount so previews work instantly
  useEffect(() => {
    const linkId = "google-fonts-batch";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      // Construct the batch query string: family=Font1&family=Font2
      const families = GOOGLE_FONTS.map(f => `family=${f.replace(/\s+/g, "+")}`).join("&");
      link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
      document.head.appendChild(link);
    }
  }, []);

  if (!activeObject || (!activeObject.isType('i-text') && !activeObject.isType('text'))) {
    return null;
  }

  const currentFont = (activeObject as fabric.IText).fontFamily || "Inter";

  const handleFontChange = async (fontName: string) => {
    // Wait for the browser to ensure the web font is ready
    try {
      await document.fonts.load(`16px "${fontName}"`);
    } catch (e) {
      console.warn("Font loading wait failed, falling back to instant render.", e);
    }

    if (activeObject && canvas) {
      (activeObject as fabric.IText).set("fontFamily", fontName);
      canvas.renderAll();
      forceRender();
    }
    setOpen(false);
  };

  return (
    <div className="space-y-3 mt-4 pt-4 border-t">
      <Label className="text-sm font-semibold">Font Style</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="flex items-center w-full justify-between font-normal h-10 px-3 py-2 border rounded-md"
          style={{ fontFamily: currentFont }}
        >
          {currentFont}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search fonts..." />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {GOOGLE_FONTS.map((font) => (
                  <CommandItem
                    key={font}
                    value={font}
                    onSelect={(currentValue) => {
                      // command item values are lowercase by default
                      const selected = GOOGLE_FONTS.find(f => f.toLowerCase() === currentValue) || font;
                      handleFontChange(selected);
                    }}
                    style={{ fontFamily: font, fontSize: "16px", padding: "8px" }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentFont === font ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {font}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
