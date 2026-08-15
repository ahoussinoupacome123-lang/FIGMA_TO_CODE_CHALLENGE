'use client';

import { useRef, useState, useEffect, Children, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HorizontalSlider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const slides = Children.toArray(children);
  // Titles extracted from wrapper `data-title` attribute when present
  const metas = slides.map((s) => (s as any)?.props?.['data-title'] || 'Info');

  const scrollTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const kid = el.children[index] as HTMLElement | undefined;
    if (!kid) return;
    el.scrollTo({ left: kid.offsetLeft, behavior: 'smooth' });
  };

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
    // keyboard navigation
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollTo(Math.max(0, active - 1));
      if (e.key === 'ArrowRight') scrollTo(Math.min(slides.length - 1, active + 1));
    };
    el.addEventListener('keydown', onKey as any);
    return () => { el.removeEventListener('scroll', onScroll); el.removeEventListener('keydown', onKey as any); cancelAnimationFrame(raf); };
  }, [children]);

  // Touch / swipe smoothing: pointer-based swipe detection to snap to next/prev
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startTime = 0;
    let isPointerDown = false;

    const onPointerDown = (ev: PointerEvent) => {
      isPointerDown = true;
      startX = ev.clientX;
      startTime = Date.now();
      (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      const dx = ev.clientX - startX;
      const dt = Date.now() - startTime;
      const velocity = Math.abs(dx) / Math.max(1, dt);
      // strong swipe or long enough distance
      if (Math.abs(dx) > 60 || velocity > 0.5) {
        if (dx < 0) scrollTo(Math.min(slides.length - 1, active + 1));
        else scrollTo(Math.max(0, active - 1));
      } else {
        // small movement -> snap to nearest
        const kids = Array.from(el.children) as HTMLElement[];
        let nearest = 0;
        let minDiff = Infinity;
        kids.forEach((k, i) => {
          const diff = Math.abs(k.offsetLeft - el.scrollLeft);
          if (diff < minDiff) { minDiff = diff; nearest = i; }
        });
        scrollTo(nearest);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
    };
  }, [active, children]);

  

  return (
    <div className="relative py-6">
      {/* Mobile: accordion grouped list */}
      <div className="sm:hidden px-4 pb-4">
        {slides.map((s, i) => (
          <details
            key={i}
            className="mb-3 bg-white rounded-xl border border-stone-200 overflow-hidden transition-all duration-300 ease-out"
            onToggle={(e) => {
              const el = e.target as HTMLDetailsElement;
              if (el.open) {
                // Close other open details
                const parent = el.parentElement;
                if (!parent) return;
                const others = Array.from(parent.querySelectorAll('details')) as HTMLDetailsElement[];
                others.forEach((d) => { if (d !== el) d.open = false; });
                // update active index and scroll the matching slide into view when opening
                setActive(i);
                setTimeout(() => scrollTo(i), 150);
              } else {
                // if closed, clear active if it was the same
                if (active === i) setActive(0);
              }
            }}
          >
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium hover:bg-stone-50 transition-colors">
              <span>{metas[i]}</span>
              <span className="text-stone-700 transition-transform duration-300">{active === i ? '−' : '+'}</span>
            </summary>
            <div className="px-4 pb-4 pt-2 animate-in fade-in duration-200">
              {s}
            </div>
          </details>
        ))}
      </div>
      <div className="relative">
        <div
          ref={containerRef}
          className="no-scrollbar scroll-smooth snap-x snap-mandatory flex gap-4 overflow-x-auto px-0 sm:px-4 touch-pan-x"
          role="list"
          aria-label="Sections glissantes"
          tabIndex={0}
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        >
          {slides.map((s, i) => (
            <div key={i} className="flex-none snap-start w-full sm:min-w-[80vw] lg:min-w-[60vw] px-0 sm:px-2" role="listitem">
              {s}
            </div>
          ))}
        </div>

        {/* Left/Right controls */}
        <button
          onClick={() => scrollTo(Math.max(0, active - 1))}
          aria-label="Précédent"
          className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/75 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5 text-stone-700" />
        </button>
        <button
          onClick={() => scrollTo(Math.min(slides.length - 1, active + 1))}
          aria-label="Suivant"
          className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/75 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white"
        >
          <ChevronRight className="w-5 h-5 text-stone-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la slide ${i + 1}`}
            className={`transition-all rounded-full ${i === active ? 'bg-crimson w-3.5 h-3.5' : 'bg-stone-300 w-2.5 h-2.5'}`}
          />
        ))}
      </div>
    </div>
  );
}
