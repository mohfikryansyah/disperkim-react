import { BreadcrumbItem, Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { Head } from '@inertiajs/react';
import Footer from './parts/footer';
import HeroSection from './parts/hero-section';
import Navbar from './parts/Navbar';
import Statistik from './parts/statistik';
import TitikLokasiPJU from './parts/titik-lokasi-pju';
import { InstalledLampData, LampsStatisticForRequiredItem as LampsStatisticForRequiredItemTYPE} from '../sidebar/dashboard/interface-dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const navbar = [
    {
        url: '/',
        label: 'Beranda',
    },
    {
        url: '/#statistik',
        label: 'Statistik',
    },
    {
        url: '/#slogan',
        label: 'Slogan',
    },
    {
        url: '/#titik-lokasi-pju',
        label: 'Titik Lokasi PJU',
    },
];

interface Props {
    totalsPerKecamatans: InstalledLampData;
    lamps: Lamp[];
    subdistricts: Subdistrict[];
    panels: Panel[];
    networkCables: NetworkCable[];
    villages: Village[];
    streets: Street[];
    filters: {
        subdistrict: string;
        village: string;
        street: string;
    };
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItemTYPE[];
}

export default function IndexLandingPage({ totalsPerKecamatans, lamps, subdistricts, panels, networkCables, filters, streets, villages, lampsStatisticForRequiredItem }: Props) {

    console.log(lampsStatisticForRequiredItem);
    return (
        <main className="font-inter flex flex-1 flex-col">
            <Head title="Landing Page"></Head>
            <Navbar navbar={navbar} />
            <HeroSection />
            <Statistik totalsPerKecamatans={totalsPerKecamatans} subdistricts={subdistricts} lampsStatisticForRequiredItem={lampsStatisticForRequiredItem}/>
            <section id="slogan" className="bg-primary px-8 py-20 text-center text-white">
                <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl">Bersama, Kita Terangi Setiap Sudut Kota</h2>
                <p className="mb-6 text-base text-gray-100 sm:text-lg">
                    Ikut serta memantau dan menjaga infrastruktur penerangan untuk lingkungan yang lebih aman dan nyaman.
                </p>
                <a href="#titik-lokasi-pju">
                    <button className="text-primary rounded-full bg-white px-6 py-3 font-semibold shadow-md transition hover:bg-gray-100">
                        Mulai Pantau Sekarang
                    </button>
                </a>
            </section>

            <TitikLokasiPJU
                lamps={lamps}
                panels={panels}
                networkCables={networkCables}
                filters={filters}
                streets={streets}
                villages={villages}
                subdistricts={subdistricts}
            />
            <Footer navbar={navbar} textColor="text-gray-800 text-sm" />
        </main>
    );
}
