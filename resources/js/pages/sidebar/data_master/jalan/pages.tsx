import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Street, Subdistrict, Village } from '@/types';
// import { createColumns } from './columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './columns';
import CreateStreet from './create-jalan';

interface PagesProps {
    villages: Village[];
    streets: Street[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jalan',
        href: route('streets.index'),
    },
];

export default function Jalan({ streets, villages }: PagesProps) {
    const subdistrictOptionsType = Array.from(new Set(streets.map((street) => street.village?.subdistrict?.name)));

    const formatedSubdistrictOptionsType = subdistrictOptionsType.map((type) => {
        return {
            label: type,
            value: type,
        };
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Jalan di Kota Gorontalo</h1>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card className="bg-gray-100">
                            <CardHeader>
                                <CardTitle>Daftar Jalan</CardTitle>
                                <CardDescription>Berikut adalah data jalan yang tersedia. Keterangan: Terpasang (T), Dibutuhkan (D)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={streets} columnFilter='kecamatan' optionsFilter={formatedSubdistrictOptionsType} titleFilter='Kecamatan'>
                                    <CreateStreet villages={villages} />
                                </DataTable>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
