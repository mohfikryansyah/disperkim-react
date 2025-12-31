import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import RequiredItemChart from '@/pages/sidebar/dashboard/charts/required-item-chart';
import { InstalledLampData, LampsStatisticForRequiredItem as LampsStatisticForRequiredItemTYPE } from '@/pages/sidebar/dashboard/interface-dashboard';
import { BreadcrumbItem, Subdistrict } from '@/types';
import { usePage } from '@inertiajs/react';
import { BarChart3, Lightbulb, Map, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface StatistikProps {
    totalsPerKecamatans: InstalledLampData;
    subdistricts: Subdistrict[];
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItemTYPE[]
}

export default function Statistik({ totalsPerKecamatans, subdistricts, lampsStatisticForRequiredItem }: StatistikProps) {
    const totalsLampuPerKecamatan = Object.entries(totalsPerKecamatans).map(([name, totalsPerKecamatans]) => ({
        name,
        total:
            (totalsPerKecamatans.installed_lamps_mandiri ?? 0) +
            (totalsPerKecamatans.installed_lamps_via_app ?? 0) +
            (totalsPerKecamatans.installed_lamps_non_app ?? 0),
    }));

    const { totalPanel } = usePage<{ totalPanel: number }>().props;
    const { totalLamp } = usePage<{ totalLamp: number }>().props;

    const stats = [
        { icon: <Zap className="text-primary h-7 w-7" />, label: 'Panel Aktif', value: totalPanel },
        { icon: <Lightbulb className="text-primary h-7 w-7" />, label: 'Lampu Jalan', value: totalLamp },
        { icon: <Map className="text-primary h-7 w-7" />, label: 'Kecamatan Tercover', value: subdistricts.length },
        { icon: <BarChart3 className="text-primary h-7 w-7" />, label: 'Panjang Kabel', value: '128 km' },
    ];

    return (
        <section id="statistik" className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 px-6 py-16">
            <div className="mx-auto max-w-screen-xl">
                <motion.div
                    className="group mb-12 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h1 className="text-primary text-2xl font-bold sm:text-3xl md:text-5xl">Statistik Infrastruktur Penerangan</h1>
                    <p className="mx-auto mt-3 max-w-2xl font-medium text-gray-700">
                        Data ringkas mengenai panel listrik, lampu jalan, sebaran kecamatan, dan panjang jaringan kabel yang sudah terpasang di
                        seluruh wilayah.
                    </p>
                    <motion.div
                        className="bg-primary mx-auto mt-4 h-1 w-24 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                </motion.div>

                <div className="grid items-center gap-6">
                    <motion.div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.15,
                                },
                            },
                        }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
                                }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <CardContainer className="inter-var">
                                    <CardBody className="group hover:border-primary/30 flex h-fit w-[19rem] flex-col items-center rounded-xl border border-black/[0.1] bg-gray-50 p-6 transition-all hover:shadow-lg">
                                        <CardItem translateZ="100" className="mt-4">
                                            <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl transition">
                                                {stat.icon}
                                            </div>
                                        </CardItem>
                                        <CardItem translateZ="100" className="mt-4 text-3xl font-extrabold text-gray-900">
                                            {stat.value}
                                        </CardItem>
                                        <CardItem as="p" translateZ="100" className="text-muted-foreground mt-1 text-sm">
                                            {stat.label}
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* <Echart totalsLampuPerKecamatan={totalsLampuPerKecamatan} className="h-[500px]" /> */}
                        <RequiredItemChart
                            subdistricts={subdistricts}
                            lampsStatisticForRequiredItem={lampsStatisticForRequiredItem}
                            className="h-[450px]"
                        />
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="absolute inset-0 -z-10 opacity-20"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(24,127,128,0.2) 0%, transparent 70%)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                viewport={{ once: true }}
            />
        </section>
    );
}
