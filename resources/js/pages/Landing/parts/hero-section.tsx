import { GridPattern } from '@/components/custom/grid-pattern';
import { FlipWords } from '@/components/flip-words';
import { BreadcrumbItem } from '@/types';
import { MousePointerClick } from 'lucide-react';
import { motion } from 'motion/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function HeroSection() {
    const words = ['Terang', 'Aman', 'Efisien'];

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* <div className="not-md:hidden absolute -bottom-4 z-[100] h-[10rem] w-full bg-gradient-to-t from-white to-transparent"></div> */}
            <div className="absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                <GridPattern />
            </div>
            <div className="h-full w-full items-center justify-center md:px-4">
                <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center md:relative gap-8">
                    {/* <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-10 text-center text-sm font-semibold tracking-widest text-emerald-700 uppercase not-md:px-12 md:mb-3"
                    >
                        Dinas Perumahan dan Kawasan Permukiman Kota Gorontalo
                    </motion.p> */}
                    <div className="flex h-9 items-center justify-center gap-1 rounded-xl bg-emerald-500/50 px-6 md:h-10 md:w-fit">
                        <p className="text-[10px] font-semibold whitespace-nowrap md:text-base">
                            Dinas Perumahan dan Kawasan Permukiman Kota Gorontalo
                        </p>
                    </div>
                    <div className="text-center flex flex-col">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="to-primary inline-block bg-gradient-to-r from-blue-500 via-green-500 bg-clip-text text-center text-2xl font-bold text-balance text-transparent md:py-2 md:text-5xl"
                        >
                            Sistem Monitoring Infrastruktur Jalan
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block px-5 py-2 not-md:max-w-xs mx-auto text-center text-2xl leading-[1] font-bold text-balance text-gray-800 md:px-0 md:py-0 md:text-[3rem] lg:text-5xl"
                        >
                            Untuk Kota yang Lebih <FlipWords words={words} />
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        className="mx-auto max-w-[19rem] text-center text-sm font-medium text-gray-700 md:w-2/3 md:max-w-xl md:text-lg"
                    >
                        Pantau kondisi panel dan lampu jalan secara real-time untuk mendukung tata kelola kota yang cerdas.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                        className="relative flex flex-col items-center justify-center space-y-3 md:mt-3"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <button
                                className="bg-card-gradient rounded-full px-6 py-3 font-semibold text-white shadow-md transition hover:bg-gray-100"
                                onClick={() => {
                                    document.getElementById('titik-lokasi-pju')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start',
                                    });
                                }}
                            >
                                Lihat Peta Infrastruktur
                            </button>
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, 4, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.2,
                                ease: 'easeInOut',
                            }}
                            className="absolute -right-3 bottom-1"
                        >
                            <MousePointerClick className="size-8 text-yellow-400" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
