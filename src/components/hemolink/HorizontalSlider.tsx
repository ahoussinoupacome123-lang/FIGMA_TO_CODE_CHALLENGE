'use client';

import { useRef, useState, useEffect, Children, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HorizontalSlider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const slides = Children.toArray(children);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const left = el.scrollLeft;
        let nearest = 0;
        let minDiff = Infinity;
        const kids = Array.from(el.children) as HTMLElement[];
        kids.forEach((k, i) => {
          const diff = Math.abs(k.offsetLeft - left);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [children]);

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const kid = el.children[index] as HTMLElement | undefined;
    if (!kid) return;
    el.scrollTo({ left: kid.offsetLeft, behavior: 'smooth' });
  };

  return (
    <div className="relative py-10">
      <div className="relative">
        <div
          ref={containerRef}
          className="no-scrollbar scroll-smooth snap-x snap-mandatory flex gap-4 overflow-x-auto px-4"
          role="list"
          aria-label="Sections glissantes"
        >
          {slides.map((s, i) => (
            <div key={i} className="flex-none snap-start min-w-[100vw] sm:min-w-[80vw] lg:min-w-[60vw] px-2" role="listitem">
              {s}
            </div>
          ))}
        </div>

        {/* Left/Right controls */}
        <button
          onClick={() => scrollTo(Math.max(0, active - 1))}
          aria-label="Précédent"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/75 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5 text-stone-700" />
        </button>
        <button
          onClick={() => scrollTo(Math.min(slides.length - 1, active + 1))}
          aria-label="Suivant"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/75 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white"
        >
          <ChevronRight className="w-5 h-5 text-stone-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? 'bg-crimson' : 'bg-stone-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
