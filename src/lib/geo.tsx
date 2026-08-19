'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type GeoStatus = 'idle' | 'requesting' | 'granted' | 'denied';

interface GeoContextValue {
  status: GeoStatus;
  userLocation: [number, number] | null;
  locate: () => void;
}

const GeoContext = createContext<GeoContextValue | null>(null);

export function useGeo() {
  const ctx = useContext(GeoContext);
  if (!ctx) throw new Error('useGeo must be used within GeoProvider');
  return ctx;
}

export function GeoProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GeoStatus>('idle');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const locate = useCallback(() => {
    setStatus('requesting');
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setStatus('granted');
      },
      () => {
        setStatus('denied');
      },
      { timeout: 8000, enableHighAccuracy: false },
    );
  }, []);

  return (
    <GeoContext.Provider value={{ status, userLocation, locate }}>
      {children}
    </GeoContext.Provider>
  );
}
