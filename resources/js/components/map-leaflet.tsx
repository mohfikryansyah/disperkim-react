import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MutableRefObject, PropsWithChildren, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';

type Props = {
    className?: string;
    height?: string;
    zoom?: number;
    center?: [number, number];
    mapRef?: MutableRefObject<L.Map | null>;
};

export const MapWithInvalidateSize = () => {
    const map = useMap();

    useEffect(() => {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    }, [map]);

    return null;
};

export const defaultMarkerIcon = (iconUrl?: string) =>
    new Icon({
        iconUrl: iconUrl
            ? `${window.location.origin}/storage/${iconUrl}`
            : `${window.location.origin}/storage/pin/default.png`,
        iconSize: [30, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowAnchor: [10, 41],
        shadowSize: [41, 41],
    });

export default function MapLeaflet({
    zoom = 10,
    center = [0.5753543789632711, 123.27836689275536],
    children,
    mapRef,
    ...props
}: Props & PropsWithChildren) {
    const maxBounds: [[number, number], [number, number]] = [
        [0.3, 122.8], // Kiri Bawah (Latitude, Longitude)
        [0.8, 123.4], // Kanan Atas (Latitude, Longitude)
    ];

    function MapInitializer() {
        const map = useMapEvents({
            load: () => {
                if (mapRef) {
                    mapRef.current = map;
                }
            },
        });

        if (mapRef && !mapRef.current) {
            mapRef.current = map;
        }

        return null;
    }

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            zoomControl={true}
            className="z-10 rounded-xl"
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            zoomSnap={0}
            zoomDelta={0.25}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            minZoom={10.5}
            maxZoom={19.5}
            {...props}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> & contributors'
                maxZoom={19.5}
            />
            <MapWithInvalidateSize />
            <MapInitializer />
            {children}
        </MapContainer>
    );
}
