import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogInIcon, MenuIcon, Moon, Sun, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar({
    navbar,
    navbarClassName,
}: {
    navbar: { label: string; url: string }[];
    navbarClassName?: string;
    textColor?: string;
    logo?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 z-[121] w-full transition-all duration-500',
                    scrolled ? 'bg-background/90 shadow-[0_1px_0_rgba(34,211,181,0.12)] backdrop-blur-xl' : 'bg-transparent',
                    navbarClassName,
                )}
            >
                <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="bg-primary relative flex h-9 w-9 items-center justify-center rounded-lg shadow-[0_0_16px_rgba(34,211,181,0.4)] transition-shadow group-hover:shadow-[0_0_24px_rgba(34,211,181,0.6)]">
                            <Zap className="text-foreground h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                            <p className="text-foreground text-sm font-bold tracking-widest uppercase">DISPERKIM</p>
                            <p className="text-accent text-[10px] font-medium tracking-wider uppercase">Kota Gorontalo</p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden items-center gap-1 md:flex">
                        {navbar.map((nav, i) => (
                            <li key={i}>
                                <a
                                    href={nav.url}
                                    className="text-muted-foreground hover:text-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                                >
                                    {nav.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <div className="hidden items-center md:flex space-x-2">
                        <Button size={'icon'} variant={'outline'} onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
                            {appearance === 'light' ? <Sun /> : <Moon />}
                        </Button>
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-lg px-5 py-2 text-sm font-semibold shadow-[0_0_12px_rgba(15,123,108,0.5)] transition-all hover:shadow-[0_0_20px_rgba(34,211,181,0.5)] active:scale-95">
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <Link href={route('login')}>
                                <button className="border-accent/30 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg border px-5 py-2 text-sm font-semibold transition-all active:scale-95">
                                    <LogInIcon className="h-4 w-4" />
                                    Masuk
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile burger */}
                    <button
                        className="text-muted-foreground rounded-md p-2 transition hover:bg-white/5 md:hidden"
                        onClick={() => setMobileOpen(true)}
                        aria-label="Buka menu"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer overlay */}
            <div
                className={cn(
                    'fixed inset-0 z-[200] transition-opacity duration-300',
                    mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={() => setMobileOpen(false)}
                style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(4px)' }}
            />

            {/* Mobile drawer */}
            <div
                className={cn(
                    'bg-card fixed top-0 right-0 z-[210] h-full w-72 shadow-2xl transition-transform duration-300',
                    mobileOpen ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <span className="text-foreground text-sm font-bold tracking-widest uppercase">Menu</span>
                    <button className="text-muted-foreground hover:text-foreground rounded-md p-1" onClick={() => setMobileOpen(false)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <ul className="flex flex-col gap-1 p-4">
                    {navbar.map((nav, i) => (
                        <li key={i}>
                            <a
                                href={nav.url}
                                onClick={() => setMobileOpen(false)}
                                className="text-muted-foreground hover:text-foreground block rounded-lg px-4 py-3 text-base font-medium transition hover:bg-white/5"
                            >
                                {nav.label}
                            </a>
                        </li>
                    ))}
                    <li className="mt-4">
                        <Button size={'icon'} onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}>
                            {appearance === 'light' ? <Sun /> : <Moon />}
                        </Button>
                        {auth.user ? (
                            <Link href={route('dashboard')} onClick={() => setMobileOpen(false)}>
                                <button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground w-full rounded-lg px-4 py-3 text-center text-base font-semibold transition">
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <Link href={route('login')} onClick={() => setMobileOpen(false)}>
                                <button className="border-accent/30 bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-base font-semibold transition">
                                    <LogInIcon className="h-4 w-4" />
                                    Masuk
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}
