import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Mail, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Footer({ navbar, textColor }: { navbar: { label: string; url: string }[]; textColor?: string }) {
    return (
        <footer className="h-auto w-full md:py-4">
            <div className="mx-auto max-w-7xl space-y-2">
                <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-b-2 p-2 md:flex-row not-lg:px-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo-kota.png" className="h-auto w-10" alt="Logo Kota Gorontalo" />
                        <div className="-space-y-2">
                            <h1>DISPERKIM</h1>
                            <h1>GORONTALO</h1>
                        </div>
                    </div>
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
                                            'text- block rounded font-normal text-white transition-all duration-300 hover:text-blue-400 md:bg-transparent md:p-0',
                                            textColor,
                                        )}
                                        aria-current="page"
                                    >
                                        {nav.label}
                                    </a>
                                </li>
                            ))}
                                <li>
                                    <a
                                        href={route('slide.show')}
                                        className={cn(
                                            'text- block rounded font-normal text-white transition-all duration-300 hover:text-blue-400 md:bg-transparent md:p-0',
                                            textColor,
                                        )}
                                        aria-current="page"
                                    >
                                        Slideshow
                                    </a>
                                </li>
                        </ul>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col md:items-center justify-between not-md:px-3 mb-6">
                    <h1 className="text-sm text-muted-foreground not-md:font-bold">Dinas Perumahan dan Kawasan Permukiman</h1>
                    <div className="flex lg:flex-row flex-col md:items-center md:gap-x-6 not-md:gap-y-2 not-md:mt-2">
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" />
                            <h1 className="text-sm text-muted-foreground">(+62) 2288001122</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" />
                            <h1 className="text-sm text-muted-foreground">disperkim@gmail.com</h1>
                        </div>
                    </div>
                </div>
                <p className='text-center text-muted-foreground text-sm not-md:mb-4'>© 2025 Dinas Perumahan dan Kawasan Permukiman All Rights Reserved</p>
            </div>
        </footer>
    );
}
