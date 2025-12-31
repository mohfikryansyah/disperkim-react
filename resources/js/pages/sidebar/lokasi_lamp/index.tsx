import AppLayout from '@/layouts/app-layout';
import { Lamp } from '@/types';
import MapLamp from '../lokasi/map-persebaran-infrastruktur';
import { useRef } from 'react';

interface PropsLamp {
    lamps: Lamp[];
}

export default function IndexLokasiLamp({ lamps }: PropsLamp) {
    const mapRef = useRef<L.Map | null>(null);
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Lokasi Lamp Kota Gorontalo</h1>
                <MapLamp lamps={lamps} mapRef={mapRef}/>
            </div>
        </AppLayout>
    );
}
