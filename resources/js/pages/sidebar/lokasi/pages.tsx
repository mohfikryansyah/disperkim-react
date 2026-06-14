import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import MapPersebaranInfrastruktur from './map-persebaran-infrastruktur';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface SebaranLokasiInfrastrukturProps {
    lamps: Lamp[];
    panels: Panel[];
    networkCables: NetworkCable[];
    subdistricts: Subdistrict[];
    villages: Village[];
    streets: Street[];
    filters: {
        subdistrict: string;
        village: string;
        street: string;
    };
}

export default function SebaranLokasiInfrastruktur({ lamps, panels, networkCables, villages, subdistricts, filters, streets }: SebaranLokasiInfrastrukturProps) {
    const mapRef = useRef<L.Map | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sebaran Penerangan Kota Gorontalo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Lokasi Persebaran Infrastruktur di Kota Gorontalo</h1>
                <MapPersebaranInfrastruktur
                    lamps={lamps}
                    panels={panels}
                    networkCables={networkCables}
                    subdistricts={subdistricts}
                    villages={villages}
                    streets={streets}
                    filters={filters}
                    mapRef={mapRef}
                />
            </div>
        </AppLayout>
    );
}
