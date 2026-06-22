"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CardDef {
  id: number;
  src: string;
  alt: string;
  xOffset: number;
  yOffset: number;
  rotate: number;
  width: string;
  aspectRatio: string;
  zIndex: number;
}

const CARDS: CardDef[] = [
  {
    id: 1,
    src: "/images/collection-fabric-1.jpg",
    alt: "Blue Quilted Bag",
    xOffset: -0.40,
    yOffset: 0.40,
    rotate: -90,
    width: "clamp(90px, 12vw, 180px)",
    aspectRatio: "1/1",
    zIndex: 1,
  },
  {
    id: 2,
    src: "/images/collection-jute-3.jpg",
    alt: "Jute Craft Bag",
    xOffset: -0.35,
    yOffset: 0.20,
    rotate: -60,
    width: "clamp(100px, 14vw, 200px)",
    aspectRatio: "1/1",
    zIndex: 2,
  },
  {
    id: 3,
    src: "/images/collection-cotton-1.jpg",
    alt: "Purple Bags Tote",
    xOffset: -0.20,
    yOffset: 0.05,
    rotate: -30,
    width: "clamp(110px, 15vw, 215px)",
    aspectRatio: "1/1",
    zIndex: 3,
  },
  {
    id: 4,
    src: "/images/collection-premium-2.jpg",
    alt: "Chevron Bag",
    xOffset: 0,
    yOffset: 0,
    rotate: 0,
    width: "clamp(120px, 16vw, 230px)",
    aspectRatio: "1/1",
    zIndex: 4,
  },
  {
    id: 5,
    src: "/images/about-2.jpg",
    alt: "Jute Bags",
    xOffset: 0.20,
    yOffset: 0.05,
    rotate: 30,
    width: "clamp(110px, 15vw, 215px)",
    aspectRatio: "1/1",
    zIndex: 3,
  },
  {
    id: 6,
    src: "/images/collection-cotton-2.jpg",
    alt: "Cotton Tote Bag",
    xOffset: 0.35,
    yOffset: 0.20,
    rotate: 60,
    width: "clamp(100px, 14vw, 200px)",
    aspectRatio: "1/1",
    zIndex: 2,
  },
  {
    id: 7,
    src: "/images/collection-premium-1.jpg",
    alt: "Premium Fabric Bag",
    xOffset: 0.40,
    yOffset: 0.40,
    rotate: 90,
    width: "clamp(90px, 12vw, 180px)",
    aspectRatio: "1/1",
    zIndex: 1,
  }
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.1,
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
        left: `calc(50% + ${card.xOffset} * var(--cw))`,
        top: `calc(15% + ${card.yOffset} * var(--cw))`,
        translateX: "-50%",
        translateY: "-50%",
        rotate: card.rotate,
        zIndex: card.zIndex,
        width: card.width,
      }}
    >
      <div
        className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl bg-white border-4 md:border-[6px] border-white cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(120,60,180,0.25)]"
        style={{ width: "100%", aspectRatio: card.aspectRatio }}
      >
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 120px, 220px"
          priority={true}
        />
      </div>
    </motion.div>
  );
}

export function HeroBags() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ "--cw": "min(100vw, 1400px)" } as React.CSSProperties}
    >
      {CARDS.map((card, i) => (
        <HeroCard key={card.id} card={card} index={i} />
      ))}
    </div>
  );
}