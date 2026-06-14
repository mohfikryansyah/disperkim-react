import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, NetworkCable as NetworkCableType } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kabel Jaringan',
        href: route('network-cable.index'),
    },
];

export default function NetworkCable({ networkCables }: { networkCables: NetworkCableType[] }) {
    const CardPanel = [
        {
            title: 'Kabel Jaringan TC-2x10mm',
            description: 'Panjang seluruh kabel',
            value: networkCables.filter((cable) => cable.type_cable === 'Kabel Jaringan TC-2x10mm').reduce((sum, cable) => sum + cable.length, 0),
        },
        {
            title: 'Kabel Jaringan TC-4x10mm',
            description: 'Panjang seluruh kabel',
            value: networkCables.filter((cable) => cable.type_cable === 'Kabel Jaringan TC-4x10mm').reduce((sum, cable) => sum + cable.length, 0),
        },
        {
            title: 'Kabel Jaringan TC-4x25mm',
            description: 'Panjang seluruh kabel',
            value: networkCables.filter((cable) => cable.type_cable === 'Kabel Jaringan TC-4x25mm').reduce((sum, cable) => sum + cable.length, 0),
        },
        {
            title: 'Kabel Jaringan NYY-3x4mm',
            description: 'Panjang seluruh kabel',
            value: networkCables.filter((cable) => cable.type_cable === 'Kabel Jaringan NYY-3x4mm').reduce((sum, cable) => sum + cable.length, 0),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kabel Jaringan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Kabel Jaringan</h1>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
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
                                <CardTitle>Daftar Kabel Jaringan</CardTitle>
                                <CardDescription>Berikut adalah data kabel jaringan yang tersedia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={networkCables}>
                                    <a href={route('network-cable.create')}>
                                        <Button
                                            type="button"
                                            className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 lg:w-fit"
                                        >
                                            <PlusCircle />
                                            Tambah Kabel Jaringan
                                        </Button>
                                    </a>
                                </DataTable>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
