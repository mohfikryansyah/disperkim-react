import { Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { InstalledLampData, LampsStatisticForRequiredItem as LampsStatisticForRequiredItemTYPE } from '../sidebar/dashboard/interface-dashboard';
import Footer from './parts/footer';
import HeroSection from './parts/hero-section';
import Navbar from './parts/Navbar';
import Statistik from './parts/statistik';
import TitikLokasiPJU from './parts/titik-lokasi-pju';

const navbar = [
    { url: '/', label: 'Beranda' },
    { url: '/#statistik', label: 'Statistik' },
    { url: '/#slogan', label: 'Tentang' },
    { url: '/#titik-lokasi-pju', label: 'Peta PJU' },
];

interface Props {
    totalsPerKecamatans: InstalledLampData;
    lamps: Lamp[];
    subdistricts: Subdistrict[];
    panels: Panel[];
    networkCables: NetworkCable[];
    villages: Village[];
    streets: Street[];
    filters: {
        subdistrict: string;
        village: string;
        street: string;
    };
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItemTYPE[];
}

export default function IndexLandingPage({
    totalsPerKecamatans,
    lamps,
    subdistricts,
    panels,
    networkCables,
    filters,
    streets,
    villages,
    lampsStatisticForRequiredItem,
}: Props) {
    return (
        <main className="bg-background flex flex-1 flex-col font-sans antialiased">
            <Head title="Sistem Infrastruktur PJU Kota Gorontalo" />

            <Navbar navbar={navbar} />
            <HeroSection />
            <Statistik
                totalsPerKecamatans={totalsPerKecamatans}
                subdistricts={subdistricts}
                lampsStatisticForRequiredItem={lampsStatisticForRequiredItem}
            />

            {/* Slogan / CTA section */}
            <section id="slogan" className="bg-background relative overflow-hidden px-6 py-24">
                {/* Background accent */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div
                        className="h-[500px] w-[700px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #0F7B6C 0%, transparent 70%)' }}
                    />
                </div>

                {/* Horizontal rule */}
                <div className="via-accent/20 absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

                <div className="relative mx-auto max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        {/* Icon */}
                        <div className="border-accent/20 bg-accent/10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border">
                            <Lightbulb className="text-accent h-6 w-6" />
                        </div>

                        <p className="text-accent mb-3 text-xs font-semibold tracking-widest uppercase">Komitmen Kami</p>
                        <h2 className="text-foreground text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                            Bersama, Kita Terangi{' '}
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #22D3B5, #60A5FA)' }}>
                                Setiap Sudut Kota
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#5D7FA3]">
                            Ikut serta memantau dan menjaga infrastruktur penerangan untuk lingkungan yang lebih aman, nyaman, dan berkelanjutan bagi
                            seluruh warga Kota Gorontalo.
                        </p>

                        <motion.div
                            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <a href="#titik-lokasi-pju">
                                <button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-[0_0_24px_rgba(15,123,108,0.4)] transition-all active:scale-95">
                                    Mulai Pantau Sekarang
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <TitikLokasiPJU
                lamps={lamps}
                panels={panels}
                networkCables={networkCables}
                filters={filters}
                streets={streets}
                villages={villages}
                subdistricts={subdistricts}
            />

            <Footer navbar={navbar} />
        </main>
    );
}
