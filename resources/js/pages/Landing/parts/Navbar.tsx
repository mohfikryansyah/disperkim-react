import NavbarLogo from '@/components/custom/navbar-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LogInIcon, MenuIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import NavbarLogo from "@/components/ui/navbar-logo";

export default function Navbar({
    navbar,
    navbarClassName,
    textColor,
    logo,
}: { navbar: { label: string; url: string }[] } & {
    navbarClassName?: string;
    textColor?: string;
    logo?: string;
}) {
    const { auth } = usePage<SharedData>().props;
    const [scrollY, setScrollY] = useState<number>(0);
    const navbarRef = useRef<HTMLElement | null>(null);
    const navbarItemRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = (): void => {
            const scrollY = window.scrollY;
            setScrollY(scrollY);
            const navbar = navbarRef.current;
            const navbarItem = navbarItemRef.current;
            if (navbar) {
                if (scrollY > 0) {
                    navbarItem?.classList.remove('max-w-screen-xl');
                    navbarItem?.classList.remove('py-6');
                    navbarItem?.classList.add('py-3');
                    navbarItem?.classList.add('max-w-screen-2xl');
                    navbar.classList.add('py-1', 'shadow-md');
                    // navbar.classList.remove("mt-3");
                } else if (scrollY < 1) {
                    navbarItem?.classList.remove('max-w-screen-2xl');
                    navbarItem?.classList.add('max-w-screen-xl');
                    navbarItem?.classList.add('py-6');
                    navbarItem?.classList.remove('py-3');
                    // navbar.classList.add("mt-3");
                    navbar.classList.remove('py-1', 'shadow-md');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            ref={navbarRef}
            className={cn('fixed top-0 z-[121] w-full bg-transparent px-6 backdrop-blur-lg transition-all duration-300 lg:px-12', navbarClassName)}
        >
            <div
                ref={navbarItemRef}
                className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between py-6 transition-all duration-700"
            >
                <NavbarLogo logoRef={logoRef} textColor={textColor} logo={logo} />

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-transparent md:hidden">
                            <MenuIcon className="h-6 w-6 text-gray-800" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side={'left'}>
                        <SheetHeader>
                            <SheetTitle>
                                <Link href="/" className="flex items-center space-x-3 text-left rtl:space-x-reverse">
                                    <img src="/kehutanan-logo.png" className="h-auto w-9" alt="Flowbite Logo" />
                                    <div ref={logoRef} className={cn('-space-y-1 text-neutral-700')}>
                                        <p className="self-center text-xl font-bold whitespace-nowrap">DISPERKIM</p>
                                        <p className="text-md self-center font-bold whitespace-nowrap">GORONTALO</p>
                                    </div>
                                </Link>
                            </SheetTitle>
                            <SheetDescription>
                                <ul className="mt-4 flex flex-col items-center space-y-8 rounded-lg border-gray-100 p-4 text-lg font-medium rtl:space-x-reverse">
                                    {navbar.map((nav, index) => (
                                        <li key={index}>
                                            <a
                                                href={nav.url}
                                                className={cn('block font-semibold text-neutral-500 transition-all duration-300 hover:text-blue-400')}
                                                aria-current="page"
                                            >
                                                {nav.label}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="font-semibold text-neutral-500">
                                        {auth.user ? (
                                            <Link href={route('dashboard')}>
                                                <Button
                                                    variant={'default'}
                                                    className="bg-sirisa-primary hover:bg-sirisa-primary/80 text-lg transition-all duration-300 active:scale-90"
                                                >
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link href={route('login')}>
                                                <Button
                                                    variant={'default'}
                                                    className="bg-sirisa-primary hover:bg-sirisa-primary/80 text-lg ring-1 ring-white transition-all duration-300 active:scale-90"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul
                        className={cn(
                            'mt-4 -ml-[7rem] flex flex-col items-center rounded-lg border border-gray-100 bg-gray-800 p-4 text-lg font-medium text-gray-50 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:py-1 rtl:space-x-reverse',
                        )}
                    >
                        {navbar.map((nav, index) => (
                            <li key={index}>
                                <a
                                    href={nav.url}
                                    className={cn(
                                        'block rounded text-base font-normal text-gray-800 transition-all duration-300 hover:text-blue-400 md:bg-transparent md:p-0',
                                        textColor,
                                    )}
                                    aria-current="page"
                                >
                                    {nav.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul
                        className={cn(
                            'mt-4 -ml-[7rem] flex flex-col items-center rounded-lg border border-gray-100 bg-gray-800 p-4 text-lg font-medium text-gray-50 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:py-1 rtl:space-x-reverse',
                        )}
                    >
                        <li className="font-semibold text-white">
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button
                                        variant={'default'}
                                        className="bg-primary hover:bg-primary/80 cursor-pointer text-base font-normal ring-1 ring-white transition-all duration-300 active:scale-90"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <Button
                                        variant={'default'}
                                        className="bg-primary hover:bg-primary/80 cursor-pointer text-base font-normal ring-1 ring-white transition-all duration-300 active:scale-90"
                                    >
                                        <LogInIcon />
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
