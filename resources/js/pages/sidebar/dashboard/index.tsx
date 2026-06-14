import { DataTable } from '@/components/datatable/data-table';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Panel, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import APJExport from '../data_apj/APJ/APJExport';
import { apjColumns } from '../data_apj/APJ/columns';
import CreateAPJ from '../data_apj/APJ/create-apj';
import { PANELColumns } from '../data_panel/panel/columns';
import CreatePanel from '../data_panel/panel/create-panel';
import PANELExport from '../data_panel/panel/PANELExport';
import Echart from './charts/echart';
import RequiredItemChart from './charts/required-item-chart';
import { PropsDashboard } from './interface-dashboard';
import TabelRingkasanKecamatan from './table-ringkasan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function Index({
    totals,
    totalsPerKecamatans,
    subdistricts,
    lampsStatistic,
    cableLength,
    lampsStatisticForRequiredItem,
    lamps,
    streets,
    panels,
}: PropsDashboard) {
    const { user } = usePage<SharedData>().props.auth;
    const { totalPanel } = usePage<{ totalPanel: number }>().props;
    const { totalLamp } = usePage<{ totalLamp: number }>().props;
    const { totalSubdistrict } = usePage<{ totalSubdistrict: number }>().props;

    const totalsLampuPerKecamatan = Object.entries(totalsPerKecamatans).map(([name, totalsPerKecamatans]) => ({
        name,
        total:
            (totalsPerKecamatans.installed_lamps_mandiri ?? 0) +
            (totalsPerKecamatans.installed_lamps_via_app ?? 0) +
            (totalsPerKecamatans.installed_lamps_non_app ?? 0),
    }));

    const DashboardCard = [
        {
            title: 'Panel',
            description: 'Total keseluruhan panel',
            value: totalPanel,
        },
        {
            title: 'Lampu',
            description: 'Total keseluruhan Alat Penerangan Jalan',
            value: totalLamp,
        },
        {
            title: 'Kabel Jaringan',
            description: 'Total panjang Kabel Jaringan',
            value: cableLength,
        },
        {
            title: 'Kecamatan',
            description: 'Total Kecamatan yang tercover',
            value: totalSubdistrict,
        },
    ];

    const lampsOptionsType = Array.from(new Set(lamps.map((lamp) => lamp.type)));

    const formatedLampsOptionsType = lampsOptionsType.map((type) => {
        return {
            label: type,
            value: type,
        };
    });

    const panelsMatchWithStreets = streets ? streets.flatMap((street) => street.panels).filter((panel): panel is Panel => panel !== undefined) : [];

    const columnsAPJ = apjColumns(lamps, streets, panelsMatchWithStreets);

    const columnsPANEL = PANELColumns(lamps, streets, panels);

    const panelsOptionsType = Array.from(new Set(panels.map((panel) => panel.power)));

    const formatedPanelsOptionsType = panelsOptionsType.map((power) => {
        return {
            label: power,
            value: power,
        };
    });

    const exportPDFisProccessing = useBoolean(false);

    const handleExportPDF = () => {
        exportPDFisProccessing.setTrue();

        window.open(route('export.ringkasan-pdf'), '_blank');

        setTimeout(() => {
            exportPDFisProccessing.setFalse();
        }, 3000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard"></Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Selamat datang, {user.name}!</h1>
                <div className="h-full w-full space-y-5">
                    <div className="grid gap-5 lg:grid-cols-2">
                        <div className="col-span-2 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {DashboardCard.map((card, index) => (
                                <Card
                                    key={index}
                                    className="group border-border bg-card hover:border-accent/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Accent Line */}
                                    <div className="bg-accent absolute top-0 left-0 h-1 w-full" />

                                    {/* Glow */}
                                    <div className="bg-accent/10 group-hover:bg-accent/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-3xl transition-all duration-300" />

                                    <CardHeader className="relative z-10">
                                        <CardTitle className="text-foreground">{card.title}</CardTitle>

                                        <CardDescription>{card.description}</CardDescription>
                                    </CardHeader>

                                    <CardContent className="relative z-10">
                                        <div className="flex items-end justify-between">
                                            <h1 className="text-primary text-3xl font-bold">{card.value}</h1>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* <LampChart lampsStatistic={lampsStatistic} subdistricts={subdistricts} /> */}
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <RequiredItemChart
                            subdistricts={subdistricts}
                            lampsStatisticForRequiredItem={lampsStatisticForRequiredItem}
                            className="h-[450px]"
                        />
                        <Echart totalsLampuPerKecamatan={totalsLampuPerKecamatan} className="h-[450px]" />
                    </div>

                    <div className="grid grid-cols-1">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between gap-2">
                                <div className="">
                                    <CardTitle>Tabel Ringkasan Data</CardTitle>
                                    <CardDescription>Ringkasan data infrastruktur diseluruh kecamatan.</CardDescription>
                                </div>
                                <Button
                                    variant={'outline'}
                                    className="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                                    disabled={exportPDFisProccessing.state}
                                    onClick={handleExportPDF}
                                >
                                    <img src={'/images/pdf-icon.svg'} className="size-5" alt="PDF Icon" />
                                    {exportPDFisProccessing.state ? 'Membuat PDF...' : 'Export PDF'}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <TabelRingkasanKecamatan subdistricts={subdistricts} />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Akses Cepat - Data Lampu Penerangan Jalan Umum</CardTitle>
                                        <TextLink href={route('lamp.index')} className="text-sm text-gray-400 no-underline hover:underline">
                                            Lihat semua
                                        </TextLink>
                                    </div>
                                    <CardDescription>Menampilkan 5 data terakhir </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DataTable
                                        columns={columnsAPJ}
                                        data={lamps}
                                        columnFilter="type"
                                        titleFilter="Tipe"
                                        optionsFilter={formatedLampsOptionsType}
                                    >
                                        <CreateAPJ streets={streets} lamps={lamps} panels={panelsMatchWithStreets} titleForButton={' '} />
                                        <APJExport
                                            subdistricts={subdistricts}
                                            panels={panels}
                                            routeName="export.apj-pdf"
                                            titleForButton={' '}
                                            buttonIcon="/images/pdf-icon.svg"
                                            buttonClassName="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                                            processingText="Membuat PDF..."
                                        />
                                        <APJExport
                                            subdistricts={subdistricts}
                                            panels={panels}
                                            routeName="export.apj-excel"
                                            titleForButton={' '}
                                            buttonIcon="/images/excel-icon.svg"
                                            buttonClassName="w-full bg-gradient-to-r from-white to-green-400 xl:w-fit"
                                            processingText="Membuat Excel..."
                                        />
                                    </DataTable>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Akses Cepat - Data Panel</CardTitle>
                                        <TextLink href={route('panel.index')} className="text-sm text-gray-400 no-underline hover:underline">
                                            Lihat semua
                                        </TextLink>
                                    </div>
                                    <CardDescription>Menampilkan 5 data terakhir </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DataTable
                                        columns={columnsPANEL}
                                        data={panels}
                                        columnFilter="power"
                                        titleFilter="Power"
                                        optionsFilter={formatedPanelsOptionsType}
                                    >
                                        <CreatePanel streets={streets} panels={panels} lamps={lamps} titleForButton={' '} />
                                        <PANELExport
                                            subdistricts={subdistricts}
                                            titleForButton={' '}
                                            routeName="export.panel-pdf"
                                            buttonIcon="/images/pdf-icon.svg"
                                            buttonClassName="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                                            processingText="Membuat PDF..."
                                        />
                                        <PANELExport
                                            subdistricts={subdistricts}
                                            titleForButton={' '}
                                            routeName="export.panel-excel"
                                            buttonIcon="/images/excel-icon.svg"
                                            buttonClassName="w-full bg-gradient-to-r from-white to-green-400 xl:w-fit"
                                            processingText="Membuat Excel..."
                                        />
                                    </DataTable>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
