import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { Icons } from './Icons';

/* 1️⃣  Assets ————————————————————————— */
const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' +
  'width="160" height="220"><rect width="100%" height="100%" ' +
  'fill="%231a1b26"/><text x="50%" y="50%" dominant-baseline="middle"' +
  ' text-anchor="middle" fill="%23cbd5e1" font-size="18">Repix Art</text></svg>';

const DEFAULT_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', cat: 'Social', name: 'Neon Vibes', rate: 4.8, used: '2.4k' },
  { src: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=400&q=80', cat: 'Product', name: 'Clean Bottle', rate: 4.9, used: '8.1k' },
  { src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', cat: 'Portrait', name: 'Soft Glow', rate: 4.7, used: '12k' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', cat: 'Lifestyle', name: 'Urban Style', rate: 4.9, used: '3.2k' },
  { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', cat: '3D Art', name: 'Abstract Flow', rate: 5.0, used: '1.5k' },
  { src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80', cat: 'Fashion', name: 'Vogue Filter', rate: 4.6, used: '5.6k' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', cat: 'Portrait', name: 'Male Portrait', rate: 4.8, used: '9.3k' },
  { src: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80', cat: 'Abstract', name: 'Speed Bike', rate: 4.7, used: '2.1k' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', cat: 'Design', name: 'Modern room', rate: 4.9, used: '4.7k' },
  { src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80', cat: 'Package', name: 'Eco Box', rate: 4.8, used: '6.2k' },
  { src: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80', cat: 'Tech', name: 'Cyber Face', rate: 4.5, used: '1.9k' },
  { src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80', cat: 'Food', name: 'Tasty Dish', rate: 4.9, used: '3.8k' },
];

/* 2️⃣  Config ————————————————————————— */
const CARD_W = 200; 
const CARD_H = 280;
const RADIUS = 600; 
const TILT_SENSITIVITY = 0; 
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;

/* 3️⃣  Card Component (Memoized for Performance) ——— */
interface CardItem {
  src: string;
  cat: string;
  name: string;
  rate: number;
  used: string;
}

interface CardProps {
  item: CardItem;
  transform: string;
  cardW: number;
  cardH: number;
}

const Card = React.memo(({ item, transform, cardW, cardH }: CardProps) => (
  <div
    className="absolute"
    style={{
      width: cardW,
      height: cardH,
      transform,
      transformStyle: 'preserve-3d',
      willChange: 'transform',
    }}
  >
    <div
      className="w-full h-full rounded-2xl overflow-hidden bg-[#1a1b26]
                 border border-white/10 shadow-lg shadow-black/50
                 transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-violet-500/20
                 hover:z-10 group relative"
      style={{ backfaceVisibility: 'hidden' }}
    >
      <img
        src={item.src}
        alt={item.cat}
        width={cardW}
        height={cardH}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
        draggable="false"
        onError={e => {
          e.currentTarget.src = FALLBACK;
        }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />
      
      {/* Top Category Badge */}
      <div className="absolute top-3 left-3 px-2 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-md">
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">{item.cat}</span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <h4 className="text-white font-bold text-sm mb-1 truncate">{item.name}</h4>
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
             <div className="flex items-center gap-1">
               <Icons.Star className="w-3 h-3 text-amber-400 fill-amber-400" />
               <span className="font-bold text-white">{item.rate}</span>
             </div>
             <span className="text-[10px] font-medium opacity-80">{item.used} used</span>
          </div>
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-violet-500 w-[80%]" />
          </div>
      </div>
    </div>
  </div>
));

Card.displayName = 'Card';

/* 4️⃣  Main component —————————————————— */
interface ThreeDCarouselProps {
  items?: CardItem[];
  radius?: number;
  cardW?: number;
  cardH?: number;
}

export const ThreeDCarousel = React.memo(
  ({
    items = DEFAULT_ITEMS,
    radius = RADIUS,
    cardW = CARD_W,
    cardH = CARD_H,
  }: ThreeDCarouselProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const rotationRef = useRef(0);
    const tiltRef = useRef(0);
    const targetTiltRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef(0);
    const initialRotationRef = useRef(0);
    const lastInteractionRef = useRef(Date.now());
    const animationFrameRef = useRef<number | null>(null);

    // Removed Mouse Move Tilt Logic

    useEffect(() => {
      const animate = () => {
        if (!isDraggingRef.current) {
          // Apply inertia
          if (Math.abs(velocityRef.current) > 0.01) {
            rotationRef.current += velocityRef.current;
            velocityRef.current *= INERTIA_FRICTION;
          } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
            rotationRef.current += AUTOSPIN_SPEED;
          }
        }

        tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);

    const handleDragStart = useCallback((clientX: number) => {
      lastInteractionRef.current = Date.now();
      isDraggingRef.current = true;
      velocityRef.current = 0;
      dragStartRef.current = clientX;
      initialRotationRef.current = rotationRef.current;
    }, []);

    const handleDragMove = useCallback((clientX: number) => {
      if (!isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();

      const deltaX = clientX - dragStartRef.current;
      const newRotation = initialRotationRef.current + deltaX * DRAG_SENSITIVITY;

      velocityRef.current = newRotation - rotationRef.current;
      rotationRef.current = newRotation;
    }, []);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
    }, []);

    // Event listeners for mouse and touch
    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);

    /* Pre-compute card transforms (only re-computes if items/radius change) */
    const cards = useMemo(
      () =>
        items.map((item, idx) => {
          const angle = (idx * 360) / items.length;
          return {
            key: idx,
            item,
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
          };
        }),
      [items, radius]
    );

    return (
      <div
        ref={parentRef}
        className="w-full h-full flex items-center justify-center overflow-hidden font-sans cursor-grab active:cursor-grabbing py-20"
        style={{ userSelect: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative"
          style={{
            perspective: 1500,
            perspectiveOrigin: 'center',
            width: Math.max(cardW * 1.5, radius * 2.2),
            height: Math.max(cardH * 1.8, radius * 1.5),
          }}
        >
          <div
            ref={wheelRef}
            className="relative"
            style={{
              width: cardW,
              height: cardH,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -cardW / 2,
              marginTop: -cardH / 2,
            }}
          >
            {cards.map(card => (
              <Card
                key={card.key}
                item={card.item}
                transform={card.transform}
                cardW={cardW}
                cardH={cardH}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ThreeDCarousel.displayName = 'ThreeDCarousel';
