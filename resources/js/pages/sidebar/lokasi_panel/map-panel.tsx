import MapLeaflet, { defaultMarkerIcon } from '@/components/map-leaflet';
import { markerIcon } from '@/helpers';
import { Coordinates, Panel } from '@/types';
import L from 'leaflet';
import { Maximize } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Marker, Popup } from 'react-leaflet';
import PopupPanel from '../lokasi/popup-panel';

interface MapPanelProps {
    panels: Panel[];
    zoom?: number;
    center?: [number, number];
    children?: React.ReactNode;
    mapRef: React.RefObject<L.Map | null>;
    currentLocation?: Coordinates | null;
    onCoordinatesChange: (coords: Coordinates) => void;
}

export default function MapPanel({
    panels,
    zoom = 12,
    center = [0.556174, 123.058548],
    mapRef,
    children,
    currentLocation,
    onCoordinatesChange,
}: MapPanelProps) {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!mapRef.current) return;

            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            if (panels && panels.length > 0) {
                panels.forEach((marker) => {
                    const lat = marker.latitude;
                    const lng = marker.longitude;
                    const LokasiPanel = L.latLng(lat, lng);
                    let popupContent = ReactDOMServer.renderToString(<PopupPanel marker={marker} lat={lat} lng={lng} />);

                    if (mapRef.current) {
                        L.marker(LokasiPanel, { icon: markerIcon(marker.type_panel) })
                            .addTo(mapRef.current)
                            .bindPopup(popupContent)
                            .bindTooltip(marker.name, {
                                permanent: true,
                                direction: 'top',
                                offset: [8, -40],
                            });
                    }
                });
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [panels]);

    const handleFullscreen = () => {
        if (mapRef.current) {
            const mapContainer = mapRef.current.getContainer();
            if (!document.fullscreenElement) {
                mapContainer.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="relative h-full w-full">
            <div className="absolute top-2 right-2 z-[11]">
                <button
                    onClick={handleFullscreen}
                    className="flex items-center justify-center rounded-md bg-white p-2 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <Maximize />
                </button>
            </div>
            <MapLeaflet mapRef={mapRef} zoom={zoom} center={center}>
                {children}
            </MapLeaflet>
        </div>
    );
}
