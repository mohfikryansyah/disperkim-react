import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PANELColumns } from './columns';
import { PagePanelProps } from './components/interface-panel';
import CreatePanel from './create-panel';
import PANELExport from './PANELExport';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: '/panel',
    },
];

export default function ({ panels, streets, lamps, subdistricts }: PagePanelProps) {
    const CardPanel = [
        {
            title: 'Panel',
            description: 'Total keseluruhan panel',
            value: panels.length,
        },
        {
            title: 'Panel Prabayar',
            description: 'Total keseluruhan Panel Prabayar',
            value: panels.filter((panel) => panel.type_panel === 'Prabayar').length,
        },
        {
            title: 'Panel Pasca Bayar',
            description: 'Total keseluruhan Panel Pasca Bayar',
            value: panels.filter((panel) => panel.type_panel === 'Pasca Bayar').length,
        },
        {
            title: 'Panel Non APP',
            description: 'Total keseluruhan Panel Non APP',
            value: panels.filter((panel) => panel.type_panel === 'Non APP').length,
        },
    ];

    const columns = PANELColumns(lamps, streets, panels);

    const panelsOptionsType = Array.from(new Set(panels.map((panel) => panel.power)));

    const formatedPanelsOptionsType = panelsOptionsType.map((power) => {
        return {
            label: power,
            value: power,
        };
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Panel" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Panel</h1>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                    {CardPanel.map((card, index) => (
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
                                <CardTitle>Daftar Panel</CardTitle>
                                <CardDescription>Berikut adalah data panel jaringan yang tersedia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columns}
                                    data={panels}
                                    columnFilter="power"
                                    titleFilter="Power"
                                    optionsFilter={formatedPanelsOptionsType}
                                >
                                    <CreatePanel streets={streets} panels={panels} lamps={lamps} />
                                    <PANELExport
                                        subdistricts={subdistricts}
                                        routeName="export.panel-pdf"
                                        titleForButton="Export PDF"
                                        buttonIcon="/images/pdf-icon.svg"
                                        buttonClassName="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                                        processingText="Membuat PDF..."
                                    />
                                    <PANELExport
                                        subdistricts={subdistricts}
                                        panels={panels}
                                        routeName="export.panel-excel"
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
