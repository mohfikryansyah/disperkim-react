'use client';

import SummaryTotalItem from '@/components/custom/summary-total-item';
import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { Subdistrict, Totals, Village } from '@/types';
import CreateKelurahan from './create-kelurahan';
import { createColumns } from './columns';

interface PagesProps {
    villages: Village[];
    subdistricts: Subdistrict[];
    villageName: string;
    totals: Totals;
}

export default function ShowKecamatan({ villages, subdistricts, villageName, totals }: PagesProps) {
    const columns = createColumns(subdistricts);
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-800">Data di Kelurahan {villageName}</h1>
                    <SummaryTotalItem totals={totals} className="mt-6" initialState={true} />
                </div>
                <DataTable columns={columns} data={villages}>
                    <CreateKelurahan subdistricts={subdistricts} />
                </DataTable>
            </div>
        </AppLayout>
    );
}
