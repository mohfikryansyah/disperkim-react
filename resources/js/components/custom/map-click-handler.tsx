import { Coordinates } from "@/types";
import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";


export type MapClickHandlerOnCreateProps = {
    onCoordinatesChange: (coords: Coordinates) => void;
    currentLocation: Coordinates | null | undefined;
    className?: string;
};

export const MapClickHandlerOnCreate = ({ onCoordinatesChange, currentLocation }: MapClickHandlerOnCreateProps) => {
    const map = useMap();

    useEffect(() => {
        if (currentLocation) {
            map.setView([currentLocation.lat, currentLocation.lng]);
        }
    }, [currentLocation, map]);

    useMapEvent('click', (event) => {
        const { lat, lng } = event.latlng;
        onCoordinatesChange({ lat, lng });
    });

    return null;
};