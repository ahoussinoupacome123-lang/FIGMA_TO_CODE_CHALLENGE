'use client';

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SectionTabsProps {
  tabs: Tab[];
  children: ReactNode[];
}

export default function SectionTabs({ tabs, children }: SectionTabsProps) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const items = Array.isArray(children) ? children : [children];

  const updateIndicator = useCallback(() => {
    const el = tabsRef.current;
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;
    const btn = el.children[active] as HTMLElement | undefined;
    if (!btn) return;
    indicator.style.left = `${btn.offsetLeft}px`;
    indicator.style.width = `${btn.offsetWidth}px`;
  }, [active]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // Re-measure on window resize
  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateIndicator]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      const idx = tabs.findIndex((t) => t.id === hash);
      if (idx !== -1) setActive(idx);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [tabs]);

  const selectTab = useCallback((i: number) => {
    setActive(i);
    const tab = tabs[i];
    if (tab && window.history) {
      window.history.pushState(null, '', `#${tab.id}`);
    }
    // Scroll to content area
    requestAnimationFrame(() => {
      const panel = document.getElementById(`panel-${tabs[i].id}`);
      if (panel) {
        const headerH = document.querySelector('header')?.clientHeight || 64;
        const tabsH = tabsRef.current?.clientHeight || 0;
        const y = window.scrollY + panel.getBoundingClientRect().top - headerH - tabsH - 8;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    });
  }, [tabs]);

  // Keyboard navigation (arrow keys, Home, End)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const count = tabs.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectTab((active + 1) % count);
      // Focus the new tab button
      const btn = tabsRef.current?.children[(active + 1) % count] as HTMLElement;
      btn?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectTab((active - 1 + count) % count);
      const btn = tabsRef.current?.children[(active - 1 + count) % count] as HTMLElement;
      btn?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectTab(0);
      const btn = tabsRef.current?.children[0] as HTMLElement;
      btn?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      selectTab(count - 1);
      const btn = tabsRef.current?.children[count - 1] as HTMLElement;
      btn?.focus();
    }
  }, [active, tabs.length, selectTab]);

  return (
    <div className="relative">
      {/* Sticky tabs bar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-200/60 shadow-sm shadow-stone-200/20">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={tabsRef}
            className="flex overflow-x-auto no-scrollbar gap-1 py-2 relative"
            role="tablist"
            aria-label="Sections"
            onKeyDown={handleKeyDown}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={active === i}
                aria-controls={`panel-${tab.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => selectTab(i)}
                className={`relative px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  active === i
                    ? 'text-crimson'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-crimson rounded-full transition-all duration-300 ease-out"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Content panels */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {items.map((child, i) => (
            <motion.div
              key={tabs[i].id}
              id={`panel-${tabs[i].id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tabs[i].id}`}
              tabIndex={0}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                height: active === i ? 'auto' : 0,
                pointerEvents: active === i ? 'auto' : 'none',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
              hidden={active !== i}
            >
              {child}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
