import SummaryTotalItem from '@/components/custom/summary-total-item';
import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Subdistrict, Totals, Village } from '@/types';
import { createColumns } from './columns';
import CreateKelurahan from './create-kelurahan';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PagesProps {
    villages: Village[];
    subdistricts: Subdistrict[];
    totals: Totals;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jalan',
        href: route('streets.index'),
    },
];

export default function Kelurahan({ villages, subdistricts, totals }: PagesProps) {
    const columns = createColumns(subdistricts);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Kelurahan di Kota Gorontalo</h1>
                {/* <SummaryTotalItem totals={totals} /> */}
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card className="bg-gray-100">
                            <CardHeader>
                                <CardTitle>Daftar Kelurahan</CardTitle>
                                <CardDescription>Berikut adalah data jalan yang tersedia.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={villages}>
                                    <CreateKelurahan subdistricts={subdistricts} />
                                </DataTable>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
