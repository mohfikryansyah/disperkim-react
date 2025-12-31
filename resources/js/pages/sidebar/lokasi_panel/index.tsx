import MapLeaflet, { defaultMarkerIcon } from '@/components/map-leaflet';
import AppLayout from '@/layouts/app-layout';
import { Panel } from '@/types';
import L from 'leaflet';
import { ExternalLinkIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import MapPanel from './map-panel';

interface PropsPanel {
    panels: Panel[]
}

export default function IndexLokasiPanel({ panels }: PropsPanel) {

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className='font-bold text-2xl'>Lokasi Panel Kota Gorontalo</h1>
                <MapPanel panels={panels}></MapPanel>
            </div>
        </AppLayout>
    );
}
