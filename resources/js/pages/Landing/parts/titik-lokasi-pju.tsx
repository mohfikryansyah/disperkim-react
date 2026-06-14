'use client';

import MapPersebaranInfrastruktur from '@/pages/sidebar/lokasi/map-persebaran-infrastruktur';
import { Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { motion } from 'motion/react';
import { useRef } from 'react';

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
        <section id="titik-lokasi-pju" className="relative w-full overflow-hidden bg-background px-4 py-20 md:px-6 lg:py-28">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="mx-auto max-w-screen-2xl">
                {/* Header */}
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">Peta Interaktif</p>
                    <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Titik Lokasi LPJU
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-[#5D7FA3]">
                        Persebaran titik Lampu Penerangan Jalan Umum (LPJU) di seluruh wilayah Kota Gorontalo — klik titik untuk detail panel dan lampu.
                    </p>
                    <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                </motion.div>

                {/* Map container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="overflow-hidden rounded-2xl border border-white/[0.06] shadow-[0_0_60px_rgba(0,0,0,0.5)]"
                >
                    <MapPersebaranInfrastruktur
                        className="w-full not-lg:h-[32rem]"
                        lamps={lamps}
                        panels={panels}
                        networkCables={networkCables}
                        subdistricts={subdistricts}
                        villages={villages}
                        streets={streets}
                        filters={filters}
                        mapRef={mapRef}
                    />
                </motion.div>
            </div>
        </section>
    );
}