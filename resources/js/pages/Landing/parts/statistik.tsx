import RequiredItemChart from '@/pages/sidebar/dashboard/charts/required-item-chart';
import { InstalledLampData, LampsStatisticForRequiredItem as LampsStatisticForRequiredItemTYPE } from '@/pages/sidebar/dashboard/interface-dashboard';
import { Subdistrict } from '@/types';
import { usePage } from '@inertiajs/react';
import { BarChart3, Cable, Lightbulb, MapPin, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface StatistikProps {
    totalsPerKecamatans: InstalledLampData;
    subdistricts: Subdistrict[];
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItemTYPE[];
}

export default function Statistik({ totalsPerKecamatans, subdistricts, lampsStatisticForRequiredItem }: StatistikProps) {
    const { totalPanel } = usePage<{ totalPanel: number }>().props;
    const { totalLamp } = usePage<{ totalLamp: number }>().props;

    const stats = [
        {
            icon: <Zap className="h-5 w-5" />,
            label: 'Panel Aktif',
            value: totalPanel,
            description: 'Panel terpasang & beroperasi',
            color: '#22D3B5',
        },
        {
            icon: <Lightbulb className="h-5 w-5" />,
            label: 'Lampu Jalan',
            value: totalLamp,
            description: 'Total titik lampu terdaftar',
            color: '#60A5FA',
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            label: 'Kecamatan',
            value: subdistricts.length,
            description: 'Wilayah termonitor aktif',
            color: '#F472B6',
        },
        {
            icon: <Cable className="h-5 w-5" />,
            label: 'Panjang Kabel',
            value: '128 km',
            description: 'Total jaringan terpasang',
            color: '#FBBF24',
        },
    ];

    return (
        <section id="statistik" className="relative w-full overflow-hidden px-6 py-20 lg:py-28 bg-background transition-colors duration-200">
            {/* Subtle top border accent */}
            <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="mx-auto max-w-screen-xl">
                {/* Section header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="mb-3 text-xs font-semibold tracking-widest text-accent uppercase">
                        Data Terkini
                    </p>
                    <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Statistik Infrastruktur
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-base text-[#5D7FA3]">
                        Ringkasan data panel listrik, lampu jalan, sebaran kecamatan, dan panjang jaringan kabel yang terpasang di seluruh wilayah.
                    </p>
                    <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                </motion.div>

                {/* Stat cards */}
                <motion.div
                    className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                            }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-6 transition-all hover:border-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] duration-200"
                        >
                            {/* Top accent line */}
                            <div
                                className="absolute top-0 left-0 h-0.5 w-full opacity-0 transition-opacity group-hover:opacity-100"
                                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                            />

                            <div
                                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{ background: `${stat.color}18`, color: stat.color }}
                            >
                                {stat.icon}
                            </div>

                            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                            <div className="text-sm font-semibold text-foreground/80">{stat.label}</div>
                            <div className="mt-1 text-xs text-[#5D7FA3]">{stat.description}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="overflow-hidden rounded-2xl border border-white/[0.06] bg-card p-6"
                >
                    <div className="mb-4">
                        <p className="text-xs font-semibold tracking-widest text-accent uppercase">Distribusi Per Wilayah</p>
                        <h3 className="mt-1 text-lg font-bold text-foreground">Kebutuhan Item per Kecamatan</h3>
                    </div>
                    <RequiredItemChart
                        subdistricts={subdistricts}
                        lampsStatisticForRequiredItem={lampsStatisticForRequiredItem}
                        className="h-[400px]"
                    />
                </motion.div>
            </div>
        </section>
    );
}