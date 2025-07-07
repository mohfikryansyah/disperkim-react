import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { Subdistrict, Totals, Village } from '@/types';
// import { createColumns } from './columns';
import DataMasterLayout from '@/layouts/data-master/layout';
import { columns } from './columns';
import CreateKelurahan from './create-kelurahan';
import SummaryTotalItem from '@/components/custom/summary-total-item';

interface PagesProps {
    villages: Village[];
    subdistricts: Subdistrict[];
    totals: Totals;
}

export default function Kelurahan({ villages, subdistricts, totals }: PagesProps) {
    // const columns = createColumns({ subdistricts });
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    <SummaryTotalItem totals={totals}/>
                    <DataTable columns={columns} data={villages}>
                        <CreateKelurahan subdistricts={subdistricts} />
                    </DataTable>
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
