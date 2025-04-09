import MapLeaflet, { defaultMarkerIcon } from '@/components/map-leaflet';
import AppLayout from '@/layouts/app-layout';
import { Panel } from '@/types';
import L from 'leaflet';
import { ExternalLinkIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

export default function IndexLokasiPanel({ panel }: { panel: Panel[] }) {
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
                    <h1 className="text-lg font-bold">Kelurahan {marker.subdistrict.subdistrict_name}</h1>
                    <p>LatLng: {marker.latitude}, {marker.longitude}</p>
                    <a
                        href={`https://maps.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex mt-2 items-center text-blue-400 hover:underline"
                    >
                        Lihat di Google Maps{" "}
                    </a>
                </div>,
            );

            if (mapRef.current) {
                L.marker(LokasiPanel, { icon: defaultMarkerIcon }).addTo(mapRef.current).bindPopup(popupContent);
            }
        });
    }, [mapRef.current, panel]);

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className='font-bold text-2xl'>Lokasi Panel Kota Gorontalo</h1>
                <MapLeaflet mapRef={mapRef} zoom={12} center={[0.556174, 123.058548]}/>
            </div>
        </AppLayout>
    );
}
