'use client';

import SummaryTotalItem from '@/components/custom/summary-total-item';
import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Subdistrict, Totals } from '@/types';
import { columns } from './columns';
import CreateKecamatan from './create-kecamatan';
import TabelRingkasanKecamatan from '../../dashboard/table-ringkasan';

interface PagesProps {
    subdistricts: Subdistrict[];
    totals: Totals;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jalan',
        href: route('streets.index'),
    },
];

export default function Kecamatan({ subdistricts, totals }: PagesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Data Kecamatan</h1>
                <div>
                    <SummaryTotalItem totals={totals} />
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card className="bg-gray-100">
                            <CardContent>
                                <DataTable columns={columns} data={subdistricts}>
                                    <CreateKecamatan />
                                </DataTable>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
