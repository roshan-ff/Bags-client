"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CARDS = [
  // 1. Bottom Left
  { id: 1, src: "/images/collection-jute-1.jpg", left: "15vw", top: "85vh", rotate: -25, scale: 0.9 },
  // 2. Far Left
  { id: 2, src: "/images/collection-cotton-1.jpg", left: "10vw", top: "50vh", rotate: -45, scale: 1.0 },
  // 3. Upper Left
  { id: 3, src: "/images/about-1.jpg", left: "22vw", top: "20vh", rotate: -25, scale: 1.0 },
  // 4. Top Center
  { id: 4, src: "/images/purple-bag1.png", left: "50vw", top: "12vh", rotate: 0, scale: 1.0 },
  // 5. Upper Right
  { id: 5, src: "/images/purple-bag2.png", left: "78vw", top: "20vh", rotate: 25, scale: 1.0 },
  // 6. Far Right
  { id: 6, src: "/images/hero-1.jpg", left: "90vw", top: "50vh", rotate: 45, scale: 1.0 },
  // 7. Bottom Right
  { id: 7, src: "/images/collection-premium-1.jpg", left: "85vw", top: "85vh", rotate: 25, scale: 0.9 },
];

export function HeroBags() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -150]);
  const springY = useSpring(yParallax, { stiffness: 100, damping: 30 });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      {CARDS.map((card, index) => {
        // Create an alternating float animation based on index
        const floatY = [0, -15, 0];
        const duration = 4 + (index % 3);
        const delay = index * 0.2;

        return (
          <motion.div
            key={card.id}
            className="absolute pointer-events-auto"
            style={{ 
              left: card.left,
              top: card.top,
              x: "-50%",
              y: "-50%",
              rotate: card.rotate,
              scale: card.scale,
            }}
          >
            {/* Parallax wrapper */}
            <motion.div style={{ y: springY }}>
              {/* Floating wrapper */}
              <motion.div
                animate={{ y: floatY, rotate: [0, 2, 0] }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
              >
                <div className="relative w-[100px] md:w-[140px] lg:w-[180px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-white cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:z-20">
                  <Image
                    src={card.src}
                    alt={`Purple Bag Highlight ${card.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100px, 180px"
                    priority={index === 3}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
