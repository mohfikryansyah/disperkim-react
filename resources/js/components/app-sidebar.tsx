import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Cable, Folder, LayoutGrid, Lightbulb, MapPinned, Settings, User, Zap } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Data APJ',
        href: '#',
        icon: Lightbulb,
        isActive: true,
        items: [
            {
                title: 'APJ',
                href: route('lamp.index'),
            },
            // {
            //     title: 'Rekening APJ Kota Gorontalo',
            //     href: '/',
            // },
        ],
    },
    {
        title: 'Data Panel',
        href: '#',
        icon: Zap,
        items: [
            {
                title: 'Panel Kota Gorontalo',
                href: route('panel.index'),
            },
            // {
            //     title: 'Rekening APJ Kota Gorontalo',
            //     href: '#',
            // },
        ],
    },
    {
        title: 'Data Kabel Jaringan',
        href: route('network-cable.index'),
        icon: Cable,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Sebaran Penerangan',
        href: route('sebaran-lokasi-infrastruktur'),
        icon: MapPinned,
    },
];

const userNavItems: NavItem[] = [
    {
        title: 'Pengguna',
        href: route('users.index'),
        icon: User,
    },
    {
        title: 'Pengaturan Akun',
        href: route('profile.edit'),
        icon: Settings,
    },
];

const dataMasterItems: NavItem[] = [
    {
        title: 'Data Master',
        href: '#',
        icon: Folder,
        isActive: true,
        items: [
            {
                title: 'Kecamatan',
                href: route('subdistricts.index'),
                icon: LayoutGrid,
            },
            {
                title: 'Kelurahan',
                href: route('villages.index'),
                icon: LayoutGrid,
            },
            {
                title: 'Jalan',
                href: route('streets.index'),
                icon: LayoutGrid,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
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
                <NavMain items={mainNavItems} label="Menu Utama" />
                <NavMain items={secondaryNavItems} label="Lokasi" />
                <NavMain items={[...dataMasterItems]} label="Master" />
                <NavMain items={userNavItems} label="Manajemen Sistem" />
                {/* <NavSecondary items={footerNavItems} className="mt-auto" /> */}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
