import L from 'leaflet';
import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import MapLeaflet, { defaultMarkerIcon } from '@/components/map-leaflet';
import { Panel } from '@/types';

interface MapPanelProps {
  panel: Panel[];
  zoom?: number;
  center?: [number, number];
}

export default function MapPanel({ panel, zoom = 12, center = [0.556174, 123.058548] }: MapPanelProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    panel.forEach((marker) => {
      const lat = marker.latitude;
      const lng = marker.longitude;
      const LokasiPanel = L.latLng(lat, lng);
      let popupContent = ReactDOMServer.renderToString(
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">Kelurahan {marker.name}</h1>
          <p>LatLng: {lat}, {lng}</p>
          <a
            href={`https://maps.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-2 items-center text-blue-400 hover:underline"
          >
            Lihat di Google Maps
          </a>
        </div>
      );

      if (mapRef.current) {
        L.marker(LokasiPanel, { icon: defaultMarkerIcon }).addTo(mapRef.current).bindPopup(popupContent);
      }
    });
  }, [panel]);

  return (
    <MapLeaflet mapRef={mapRef} zoom={zoom} center={center} />
  );
}
