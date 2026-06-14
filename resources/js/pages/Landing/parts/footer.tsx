import { cn } from '@/lib/utils';
import { Mail, Phone, Zap } from 'lucide-react';

export default function Footer({ navbar, textColor }: { navbar: { label: string; url: string }[]; textColor?: string }) {
    return (
        <footer className="relative w-full overflow-hidden bg-background px-6 py-12">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Brand col */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-[0_0_16px_rgba(34,211,181,0.3)]">
                                <Zap className="h-5 w-5 text-foreground" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-bold tracking-widest text-foreground uppercase">DISPERKIM</p>
                                <p className="text-[10px] font-medium tracking-wider text-accent uppercase">Kota Gorontalo</p>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-[#5D7FA3]">
                            Dinas Perumahan dan Kawasan Permukiman Kota Gorontalo — mengelola infrastruktur penerangan jalan untuk kota yang lebih terang dan aman.
                        </p>
                    </div>

                    {/* Nav col */}
                    <div>
                        <p className="mb-4 text-xs font-semibold tracking-widest text-accent uppercase">Navigasi</p>
                        <ul className="flex flex-col gap-2">
                            {navbar.map((nav, i) => (
                                <li key={i}>
                                    <a
                                        href={nav.url}
                                        className={cn(
                                            'text-sm text-[#5D7FA3] transition-colors hover:text-foreground',
                                            textColor,
                                        )}
                                    >
                                        {nav.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={route('slide.show')}
                                    className={cn('text-sm text-[#5D7FA3] transition-colors hover:text-foreground', textColor)}
                                >
                                    Slideshow
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact col */}
                    <div>
                        <p className="mb-4 text-xs font-semibold tracking-widest text-accent uppercase">Kontak</p>
                        <div className="flex flex-col gap-3">
                            <a href="tel:+62228800112" className="flex items-center gap-3 text-sm text-[#5D7FA3] transition-colors hover:text-foreground">
                                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                                (+62) 2288001122
                            </a>
                            <a href="mailto:disperkim@gmail.com" className="flex items-center gap-3 text-sm text-[#5D7FA3] transition-colors hover:text-foreground">
                                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                                disperkim@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
                    <p className="text-xs text-[#3A526A]">
                        © 2025 Dinas Perumahan dan Kawasan Permukiman Kota Gorontalo. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                        <span className="text-xs font-medium text-[#3A526A]">Sistem Aktif</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}