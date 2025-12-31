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
                        <Card key={index} className="bg-card-gradient text-white">
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription className="text-gray-300">{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h1 className="text-2xl font-bold">{card.value}</h1>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card className="bg-gray-100">
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
