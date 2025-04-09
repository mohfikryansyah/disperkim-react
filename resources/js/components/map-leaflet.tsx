import { MutableRefObject, PropsWithChildren, useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    GeoJSON,
    Marker,
    Tooltip,
    useMapEvents,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, PathOptions, StyleFunction } from "leaflet";

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

export const defaultMarkerIcon = new Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowAnchor: [10, 41],
    shadowSize: [41, 41],
});


export default function     MapLeaflet({
    zoom = 10,
    center = [0.5753543789632711, 123.27836689275536],
    children,
    mapRef,
    ...props
}: Props & PropsWithChildren) {
    const maxBounds: [[number, number], [number, number]] = [
        [0.4, 122.8], // Kiri Bawah (Latitude, Longitude)
        [0.9, 123.7], // Kanan Atas (Latitude, Longitude)
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
                zoomControl={false}
                className="z-10 rounded-xl"
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
                zoomSnap={0}
                zoomDelta={0.25}
                maxBounds={maxBounds}
                maxBoundsViscosity={1.0}
                minZoom={10.5}
                {...props}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapWithInvalidateSize />
                <MapInitializer />
                {children}
            </MapContainer>
    );
}
