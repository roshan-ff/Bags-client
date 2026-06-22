"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * HeroBags — Matches the Figma design exactly.
 *
 * Layout analysis from Figma screenshot:
 *
 * TOP ARC (upper half, left to right):
 *   Card A: ~28% left, ~18% top, -18° tilt  (jute/cotton, medium)
 *   Card B: ~44% left, ~10% top,  -5° tilt  (purple bag center-left, tall)
 *   Card C: ~60% left, ~12% top, +15° tilt  (chevron/colorful, medium)
 *   Card D: ~74% left, ~20% top, +18° tilt  (craft bag, medium)
 *
 * LEFT COLUMN (large cards, lower — overlap text zone on left):
 *   Card E: ~18% left, ~38% top, -25° tilt  (blue quilted bag, large)
 *   Card F: ~14% left, ~62% top, -15° tilt  (jute/craft bottom-left, large)
 *
 * RIGHT COLUMN (tall card, lower right):
 *   Card G: ~88% left, ~42% top,  +5° tilt  (white tote, tall, partial crop)
 */

interface CardDef {
  id: number;
  src: string;
  alt: string;
  left: string;
  top: string;
  rotate: number;
  width: string;
  aspectRatio: string;
  zIndex: number;
  floatDelay: number;
  floatDuration: number;
  floatDistance: number;
}

const CARDS: CardDef[] = [
  // ── TOP ARC: Card A — left of center, slightly tilted left ──
  {
    id: 1,
    src: "/images/collection-jute-1.jpg",
    alt: "Jute Bag",
    left: "28%",
    top: "16%",
    rotate: -18,
    width: "175px",
    aspectRatio: "4/5",
    zIndex: 4,
    floatDelay: 0.4,
    floatDuration: 5.5,
    floatDistance: 10,
  },
  // ── TOP ARC: Card B — center, upright, tallest ──
  {
    id: 2,
    src: "/images/purple-bag1.png",
    alt: "Purple Bag Center",
    left: "46%",
    top: "8%",
    rotate: -4,
    width: "195px",
    aspectRatio: "4/5",
    zIndex: 5,
    floatDelay: 0.1,
    floatDuration: 4.8,
    floatDistance: 14,
  },
  // ── TOP ARC: Card C — right of center, colorful chevron ──
  {
    id: 3,
    src: "/images/collection-premium-2.jpg",
    alt: "Premium Bag",
    left: "62%",
    top: "10%",
    rotate: 14,
    width: "180px",
    aspectRatio: "4/5",
    zIndex: 4,
    floatDelay: 0.7,
    floatDuration: 5.2,
    floatDistance: 11,
  },
  // ── TOP ARC: Card D — upper right ──
  {
    id: 4,
    src: "/images/about-2.jpg",
    alt: "Craft Bag",
    left: "76%",
    top: "18%",
    rotate: 18,
    width: "168px",
    aspectRatio: "4/5",
    zIndex: 3,
    floatDelay: 1.0,
    floatDuration: 6.0,
    floatDistance: 9,
  },
  // ── LEFT COLUMN: Card E — large, mid-left, overlaps text ──
  {
    id: 5,
    src: "/images/collection-cotton-2.jpg",
    alt: "Cotton Bag Blue",
    left: "17%",
    top: "35%",
    rotate: -25,
    width: "205px",
    aspectRatio: "1/1",
    zIndex: 3,
    floatDelay: 0.6,
    floatDuration: 5.8,
    floatDistance: 8,
  },
  // ── LEFT COLUMN: Card F — lower-left, large square ──
  {
    id: 6,
    src: "/images/collection-jute-3.jpg",
    alt: "Jute Craft Bag",
    left: "12%",
    top: "60%",
    rotate: -14,
    width: "190px",
    aspectRatio: "1/1",
    zIndex: 2,
    floatDelay: 1.3,
    floatDuration: 6.4,
    floatDistance: 7,
  },
  // ── RIGHT: Card G — tall white tote, right edge, partial crop ──
  {
    id: 7,
    src: "/images/purple-bag2.png",
    alt: "White Tote Bag",
    left: "90%",
    top: "38%",
    rotate: 5,
    width: "180px",
    aspectRatio: "3/5",
    zIndex: 3,
    floatDelay: 0.9,
    floatDuration: 5.6,
    floatDistance: 12,
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.78, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.09 + 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

function HeroCard({ card, index }: { card: CardDef; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="absolute pointer-events-auto"
      style={{
        left: card.left,
        top: card.top,
        translateX: "-50%",
        rotate: card.rotate,
        zIndex: card.zIndex,
        width: card.width,
      }}
    >
      <motion.div
        animate={{ y: [0, -card.floatDistance, 0] }}
        transition={{
          duration: card.floatDuration,
          delay: card.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="relative overflow-hidden rounded-[1.3rem] shadow-2xl bg-white ring-[3px] ring-white cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.25)]"
          style={{ width: card.width, aspectRatio: card.aspectRatio }}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            className="object-cover"
            sizes="210px"
            priority={index < 4}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroBags() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {CARDS.map((card, i) => (
        <HeroCard key={card.id} card={card} index={i} />
      ))}
    </div>
  );
}