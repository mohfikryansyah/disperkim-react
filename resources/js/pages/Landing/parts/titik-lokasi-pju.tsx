'use client';

import MapPersebaranInfrastruktur from '@/pages/sidebar/lokasi/map-persebaran-infrastruktur';
import { BreadcrumbItem, Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { motion } from 'motion/react';
import { useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface TitikLokasiPJUProps {
    lamps: Lamp[];
    panels: Panel[];
    networkCables: NetworkCable[];
    subdistricts?: Subdistrict[];
    villages: Village[];
    streets: Street[];
    filters: {
        subdistrict: string;
        village: string;
        street: string;
    };
}

export default function TitikLokasiPJU({ lamps, panels, networkCables, subdistricts, filters, streets, villages }: TitikLokasiPJUProps) {
    const mapRef = useRef<L.Map | null>(null);

    return (
        <section id="titik-lokasi-pju" className="relative min-h-screen w-full overflow-hidden px-4 py-10 md:px-0 md:py-16">
            <motion.div
                className="absolute inset-0 -z-10 opacity-25"
                style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(24,127,128,0.15) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
            />

            <div className="group mx-auto mb-12 flex h-full w-full flex-1 flex-col rounded-xl p-4 text-center lg:max-w-screen-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <h1 className="text-primary text-2xl font-bold sm:text-3xl md:text-4xl">Titik Lokasi LPJU Kota Gorontalo</h1>
                    <p className="mx-auto mt-3 max-w-2xl font-medium text-gray-700">
                        Menampilkan persebaran titik lokasi Lampu Penerangan Jalan Umum (LPJU) di wilayah Kota Gorontalo untuk memudahkan pemantauan
                        dan pengelolaan.
                    </p>

                    <motion.div
                        className="bg-primary mx-auto mt-4 mb-8 h-1 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        viewport={{ once: false }}
                    />
                </motion.div>

                <div className="w-full">
                    <MapPersebaranInfrastruktur
                        className="w-full not-lg:h-[30rem]"
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
            </div>
        </section>
    );
}
