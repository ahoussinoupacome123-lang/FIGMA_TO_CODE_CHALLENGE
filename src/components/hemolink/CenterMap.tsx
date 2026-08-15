'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { BENIN_CENTER, type Center } from '@/data/centers';
import { Crosshair, Navigation, Loader2 } from 'lucide-react';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = markerIcon;

function FlyTo({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom ?? 13, { duration: 1.2 });
  }, [map, center, zoom]);
  return null;
}

function FitBounds({ items }: { items: Center[] }) {
  const map = useMap();
  useEffect(() => {
    if (items.length > 0) {
      const bounds = L.latLngBounds(items.map((c) => [c.lat, c.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [map, items]);
  return null;
}

export default function CenterMap({
  filteredCenters,
  onSelectCenter,
  selectedCenterId,
}: {
  filteredCenters: Center[];
  onSelectCenter: (id: number) => void;
  selectedCenterId: number | null;
}) {
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);
  const [locStatus, setLocStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [flyTo, setFlyTo] = useState<{ center: [number, number]; zoom?: number } | null>(null);

  const locate = useCallback(() => {
    setLocStatus('requesting');
    if (!navigator.geolocation) {
      setLocStatus('denied');
      setFlyTo({ center: [BENIN_CENTER.lat, BENIN_CENTER.lng], zoom: 7 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const l: [number, number] = [p.coords.latitude, p.coords.longitude];
        setUserLoc(l);
        setLocStatus('granted');
        setFlyTo({ center: l, zoom: 11 });
      },
      () => {
        setLocStatus('denied');
        setFlyTo({ center: [BENIN_CENTER.lat, BENIN_CENTER.lng], zoom: 7 });
      },
      { timeout: 8000, enableHighAccuracy: false },
    );
  }, []);

  // Expose locate to parent
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__hemolink_locate = locate;
    return () => { delete (window as unknown as Record<string, unknown>).__hemolink_locate; };
  }, [locate]);

  return (
    <div className="relative w-full h-full min-h-[350px] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-red-50">
      {/* Geolocation button */}
      <button
        onClick={locate}
        className="absolute top-3 right-3 z-[1000] flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 hover:border-crimson hover:text-crimson transition-all shadow-md cursor-pointer"
        aria-label="Utiliser ma position actuelle"
      >
        {locStatus === 'requesting' && <Loader2 className="w-4 h-4 animate-spin text-crimson" />}
        {locStatus !== 'requesting' && !userLoc && <Crosshair className="w-4 h-4" />}
        {userLoc && <Navigation className="w-4 h-4 text-crimson" />}
        <span className="hidden sm:inline">
          {userLoc ? 'Ma position' : locStatus === 'requesting' ? 'Localisation...' : 'Me localiser'}
        </span>
      </button>

      {/* Toast on denial */}
      {locStatus === 'denied' && (
        <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-stone-900 text-white text-xs rounded-xl px-4 py-3 shadow-lg">
          Localisation refusée. Centré sur le Bénin.
        </div>
      )}

      <MapContainer
        center={[BENIN_CENTER.lat, BENIN_CENTER.lng]}
        zoom={7}
        scrollWheelZoom
        className="w-full h-full min-h-[350px]"
        style={{ background: '#f5f5f4' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {flyTo && <FlyTo center={flyTo.center} zoom={flyTo.zoom} />}
        {!flyTo && filteredCenters.length > 0 && <FitBounds items={filteredCenters} />}

        {/* User location */}
        {userLoc && (
          <CircleMarker
            center={userLoc}
            radius={8}
            pathOptions={{ color: '#B91C1C', fillColor: '#B91C1C', fillOpacity: 0.25, weight: 2 }}
          >
            <Popup>
              <div className="text-sm font-medium">Vous êtes ici</div>
            </Popup>
          </CircleMarker>
        )}

        {/* Center markers */}
        {filteredCenters.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} eventHandlers={{ click: () => onSelectCenter(c.id) }}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-stone-900">{c.name}</div>
                <div className="text-stone-700 text-xs mt-0.5">{c.address}, {c.city}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`w-2 h-2 rounded-full ${c.isOpen ? 'bg-emerald-500' : 'bg-stone-600'}`} />
                  <span className={`text-xs font-medium ${c.isOpen ? 'text-emerald-600' : 'text-stone-700'}`}>
                    {c.isOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.donationTypes.map((t) => (
                    <span key={t} className="text-[10px] font-medium bg-red-50 text-crimson px-1.5 py-0.5 rounded">
                      {t === 'sang_total' ? 'Sang total' : t === 'plasma' ? 'Plasma' : 'Plaquettes'}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onSelectCenter(c.id)}
                  className="mt-2 text-xs text-crimson font-medium underline cursor-pointer bg-transparent border-none"
                >
                  Voir les détails
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
