import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Bot, Cross, Folder, LayoutGrid, Lightbulb, MapPinned, SquareTerminal } from 'lucide-react';
import AppLogo from './app-logo';
import { NavSecondary } from './nav-secondary';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: "Data APJ",
        href: "#",
        icon: Lightbulb,
        isActive: true,
        items: [
            // {
            //     title: "Konvensional",
            //     href: route('data.apj.konvensional'),
            // },
            // {
            //     title: "LED",
            //     href: route('data.apj.led'),
            // },
            // {
            //     title: "PJUTS",
            //     href: route('data.apj.pjuts'),
            // },
            {
                title: "APJ",
                href: route('lamp.index'),
            },
            {
                title: "Jumlah APJ Kota Gorontalo",
                href: "#",
            },
            {
                title: "Rekening APJ Kota Gorontalo",
                href: "#",
            },
        ],
    },
    {
        title: "Data Panel",
        href: "#",
        icon: Bot,
        items: [
            {
                title: "Paska Bayar",
                href: "#",
            },
            {
                title: "Prabayar",
                href: "#",
            },
            {
                title: "Panel Kota Gorontalo",
                href: "#",
            },
        ],
    },
    {
        title: 'Data Makam Kota Gorontalo',
        href: '/makam',
        icon: Cross,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Lokasi Panel Kota Gorontalo',
        href: route('lokasi.panel'),
        icon: MapPinned,
    },
    {
        title: 'Lokasi Lampu Kota Gorontalo',
        href: route('lokasi.lamp'),
        icon: MapPinned,
    },
];

const daerahNavItems: NavItem[] = [
    {
        title: 'Monitoring PJU',
        href: route('monitoring-pju.index'),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Data Master',
        href: route('subdistricts.index'),
        icon: Folder,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavSecondary items={secondaryNavItems} sidebarLabel='Lokasi' />
                <NavSecondary items={[...footerNavItems]} sidebarLabel='Master' />
                {/* <NavSecondary items={footerNavItems} className="mt-auto" /> */}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
