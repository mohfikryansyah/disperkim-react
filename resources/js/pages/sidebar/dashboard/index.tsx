import AppLayout from '@/layouts/app-layout';
import { SharedData, Totals } from '@/types';
import { usePage } from '@inertiajs/react';
import Echart from './charts/echart';
import StackedChart from './charts/stacked-chart';

export type InstalledLampData = {
    [subdistrictName: string]: {
        installed_lamps_mandiri: number;
        installed_lamps_via_app: number;
        installed_lamps_non_app: number;
    };
};

interface PropsDashboard {
    totals: Totals;
    totalsPerKecamatans: InstalledLampData;
}

export default function Index({ totals, totalsPerKecamatans }: PropsDashboard) {
    const { user } = usePage<SharedData>().props.auth;

    const totalsLampuPerKecamatan = Object.entries(totalsPerKecamatans).map(([name, totalsPerKecamatans]) => ({
        name,
        total:
            (totalsPerKecamatans.installed_lamps_mandiri ?? 0) +
            (totalsPerKecamatans.installed_lamps_via_app ?? 0) +
            (totalsPerKecamatans.installed_lamps_non_app ?? 0),
    }));

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold text-emerald-600">Selamat datang, {user.name}!</h1>
                <div className="container">
                    <div className="grid gap-5 xl:grid-cols-2">
                        {/* <Barchart /> */}
                        {/* <Piechart /> */}
                        <Echart totalsLampuPerKecamatan={totalsLampuPerKecamatan} />
                        <StackedChart />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
