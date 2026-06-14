import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { lampTypeCategories } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Panel } from '@/types';
import { Head } from '@inertiajs/react';
import APJExport from './APJExport';
import { apjColumns } from './columns';
import { PagesAPJProps } from './components/interface-apj';
import CreateAPJ from './create-apj';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data APJ',
        href: '/data-apj',
    },
];

export default function IndexDataAPJ({ lamps, streets, subdistricts, panels }: PagesAPJProps) {
    const exportPDFisProccessing = useBoolean(false);

    const lampsOptionsType = Array.from(new Set(lamps.map((lamp) => lamp.type)));

    const formatedLampsOptionsType = lampsOptionsType.map((type) => {
        return {
            label: type,
            value: type,
        };
    });

    const lampCounts = Object.entries(lampTypeCategories).reduce(
        (acc, [key, types]) => {
            acc[key] = lamps.filter((lamp) => types.includes(lamp.type)).length;
            return acc;
        },
        {} as Record<string, number>,
    );

    const CardLamp = [
        {
            title: 'Total Lampu',
            description: 'Total keseluruhan titik lampu',
            value: lamps.length,
        },
        {
            title: 'Total Lampu Konvensional',
            description: 'Total keseluruhan LPJU Konvensional',
            value: lampCounts.konvensional,
        },
        {
            title: 'Total Lampu LED',
            description: 'Total keseluruhan LPJU LED',
            value: lampCounts.led,
        },
        {
            title: 'Total Lampu Tenaga Surya',
            description: 'Total keseluruhan LPJU Tenaga Surya',
            value: lampCounts.ts,
        },
    ];

    const panelsMatchWithStreets = streets.flatMap((street) => street.panels).filter((panel): panel is Panel => panel !== undefined);

    const columns = apjColumns(lamps, streets, panelsMatchWithStreets);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data LPJU" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Lampu Penerangan Jalan Umum</h1>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {CardLamp.map((card, index) => (
                        <Card
                            key={index}
                            className="group border-border bg-card hover:border-accent/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="bg-accent absolute top-0 left-0 h-1 w-full" />

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
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Lampu Penerangan</CardTitle>
                                <CardDescription>Berikut adalah data lampu penerangan yang tersedia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columns}
                                    data={lamps}
                                    columnFilter="type"
                                    titleFilter="Filter Tipe"
                                    optionsFilter={formatedLampsOptionsType}
                                >
                                    <CreateAPJ streets={streets} lamps={lamps} panels={panelsMatchWithStreets} />
                                    <APJExport
                                        subdistricts={subdistricts}
                                        panels={panels}
                                        routeName="export.apj-pdf"
                                        titleForButton="Export PDF"
                                        buttonIcon="/images/pdf-icon.svg"
                                        buttonClassName="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                                        processingText="Membuat PDF..."
                                    />
                                    <APJExport
                                        subdistricts={subdistricts}
                                        panels={panels}
                                        routeName="export.apj-excel"
                                        titleForButton="Export Excel"
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
        </AppLayout>
    );
}
