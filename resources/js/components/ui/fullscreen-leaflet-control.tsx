import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';

export default function FullscreenControl() {
  const map = useMap();

  useEffect(() => {
    // Tambahkan kontrol fullscreen
    // @ts-ignore karena TypeScript gak kenal kontrol custom ini
    map.addControl(new L.Control.Fullscreen());
  }, [map]);

  return null;
}
