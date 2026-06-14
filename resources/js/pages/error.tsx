import { useAppearance } from '@/hooks/use-appearance';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft, Home, Lock, RefreshCwIcon, ServerOff, type LucideIcon } from 'lucide-react';

const errorContent: Record<number, { title: string; description: string; icon: LucideIcon }> = {
    401: {
        title: 'Autentikasi Dibutuhkan',
        description: 'Sesi atau akses Anda tidak valid. Silakan masuk kembali untuk melanjutkan.',
        icon: Lock,
    },
    403: {
        title: 'Akses Ditolak',
        description: 'Anda tidak memiliki izin untuk membuka halaman ini.',
        icon: Lock,
    },
    404: {
        title: 'Halaman Tidak Ditemukan',
        description: 'Halaman yang Anda cari tidak tersedia, dipindahkan, atau URL yang dimasukkan tidak tepat.',
        icon: AlertTriangle,
    },
    419: {
        title: 'Sesi Kedaluwarsa',
        description: 'Sesi keamanan telah berakhir. Muat ulang halaman lalu coba kembali.',
        icon: RefreshCwIcon,
    },
    429: {
        title: 'Terlalu Banyak Permintaan',
        description: 'Permintaan Anda dibatasi sementara. Tunggu sebentar sebelum mencoba lagi.',
        icon: AlertTriangle,
    },
    500: {
        title: 'Terjadi Kesalahan Server',
        description: 'Ada gangguan pada sistem. Silakan coba lagi dalam beberapa saat.',
        icon: ServerOff,
    },
    503: {
        title: 'Layanan Sementara Tidak Tersedia',
        description: 'Aplikasi sedang dalam pemeliharaan atau belum siap melayani permintaan ini.',
        icon: ServerOff,
    },
};

interface ErrorProps {
    status: number;
    homeUrl: string;
    homeLabel: string;
}

export default function Error({ status, homeUrl, homeLabel }: ErrorProps) {
    const content = errorContent[status] ?? errorContent[500];
    const Icon = content.icon;
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title={`${status} - ${content.title}`} />

            <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.24),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.16),transparent_35%)]" />

                <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6">
                    <div className="flex items-center justify-between">
                        <Link href={homeUrl} className="flex items-center gap-3">
                            <div className="shadow-primary-500/25 from-primary/80 to-primary flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg">
                                <Home size={22} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Disperkim</p>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">Error {status}</p>
                            </div>
                        </Link>

                        <button
                            type="button"
                            onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}
                            className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur transition dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
                        >
                            <span className="bg-primary h-2.5 w-2.5 rounded-full" />
                            {appearance === 'light' ? 'Mode Terang' : 'Mode Gelap'}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center py-10">
                        <div className="w-full max-w-4xl rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur-xl md:p-12 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-black/20">
                            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                                <div>
                                    <div className="bg-primary text-accent dark:bg-primary/10 dark:text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                                        <Icon size={18} />
                                        Status {status}
                                    </div>

                                    <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
                                        {content.title}
                                    </h1>

                                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-400">
                                        {content.description}
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            href={homeUrl}
                                            className="from-primary to-primary/70 shadow-primary/30 hover:from-primary/70 hover:to-primary inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300"
                                        >
                                            <Home size={18} />
                                            {homeLabel}
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => window.history.back()}
                                            className="hover:border-primary hover:text-primary dark:hover:border-primary/10 dark:hover:text-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                        >
                                            <ArrowLeft size={18} />
                                            Kembali
                                        </button>
                                    </div>
                                </div>

                                <div className="to-primary/10 dark:to-primary/40 relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-linear-to-br from-slate-100 via-white p-8 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900">
                                    <div className="border-primary/60 text-primary dark:border-primary dark:text-primary absolute top-6 right-6 rounded-full border bg-white/80 px-3 py-1 text-xs font-bold tracking-[0.24em] uppercase dark:bg-slate-900/80">
                                        Error State
                                    </div>

                                    <div className="flex min-h-65 flex-col justify-between">
                                        <div className="from-primary to-sidebar-primary/80 shadow-sidebar-primary/10 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br text-white shadow-xl">
                                            <Icon size={42} strokeWidth={1.5} />
                                        </div>

                                        <div>
                                            <div className="text-7xl leading-none font-black text-slate-200 dark:text-slate-800">{status}</div>
                                            <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                                                Pastikan URL, hak akses, atau status layanan sudah sesuai sebelum mencoba lagi.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
