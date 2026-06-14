import { ArrowDown, Radio, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const quickStats = [
    { value: '6', label: 'Kecamatan' },
    { value: '24/7', label: 'Monitoring' },
    { value: '128 km', label: 'Jaringan Kabel' },
];

export default function HeroSection() {
    const scrollToMap = () => {
        document.getElementById('titik-lokasi-pju')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-200">
            {/* Dot grid background */}
            <div
                className="absolute inset-0 transition-colors duration-200"
                style={{
                    backgroundImage: 'radial-gradient(rgba(34,211,181,0.18) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                }}
            />

            {/* Radial glow */}
            <div className="pointer-events-none absolute inset-0 transition-colors duration-200">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                    style={{
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, #0F7B6C 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* Pulse rings — signature element */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="border-accent/20 absolute rounded-full border"
                        style={{
                            width: `${i * 180}px`,
                            height: `${i * 180}px`,
                            top: `${-i * 90}px`,
                            left: `${-i * 90}px`,
                        }}
                        animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                    />
                ))}
                {/* Center dot */}
                <motion.div
                    className="bg-primary relative z-10 flex h-12 w-12 -translate-x-6 -translate-y-6 items-center justify-center rounded-full shadow-[0_0_32px_rgba(34,211,181,0.6)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Radio className="text-foreground h-5 w-5" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="border-accent/25 bg-accent/10 mb-8 flex items-center gap-2 rounded-full border px-4 py-2"
                >
                    <span className="bg-accent h-1.5 w-1.5 animate-pulse rounded-full" />
                    <span className="text-accent text-xs font-semibold tracking-widest uppercase">
                        Sistem Aktif · Dinas Perumahan & Kawasan Permukiman
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-foreground max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl"
                >
                    Monitor Infrastruktur{' '}
                    <span
                        className="inline-block bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(90deg, #22D3B5, #0F7B6C)' }}
                    >
                        PJU Kota Gorontalo
                    </span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed font-normal md:text-lg"
                >
                    Pantau kondisi panel dan lampu jalan secara real-time untuk mendukung tata kelola kota yang lebih cerdas, aman, dan efisien.
                </motion.p>

                {/* Quick stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-10 flex flex-wrap justify-center gap-8"
                >
                    {quickStats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <span className="text-foreground text-2xl font-bold md:text-3xl">{s.value}</span>
                            <span className="text-xs font-medium tracking-wide text-[#5D7FA3] uppercase">{s.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
                >
                    <button
                        onClick={scrollToMap}
                        className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold shadow-[0_0_24px_rgba(15,123,108,0.5)] transition-all hover:shadow-[0_0_32px_rgba(34,211,181,0.5)] active:scale-95"
                    >
                        <Zap className="h-4 w-4" />
                        Lihat Peta Infrastruktur
                    </button>
                    <a
                        href="#statistik"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 text-sm font-semibold transition-all hover:border-white/20 active:scale-95"
                    >
                        <Shield className="h-4 w-4" />
                        Lihat Statistik
                    </a>
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ArrowDown className="h-5 w-5 text-[#5D7FA3]" />
            </motion.div>
        </section>
    );
}
