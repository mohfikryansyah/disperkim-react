import { DataTable } from '@/components/datatable/data-table';
import AppLayout from '@/layouts/app-layout';
import { Street, Subdistrict } from '@/types';
// import { createColumns } from './columns';
import { columns } from './columns';
import CreateStreet from './create-jalan';
import DataMasterLayout from '@/layouts/data-master/layout';

interface PagesProps {
    // villages: Village[];
    subdistricts: Subdistrict[];
    streets: Street[];
}

// interface DataProps {
//     data: PagesProps;
// }

export default function Jalan({ streets }: PagesProps) {
    // const columns = createColumns({ subdistricts });

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    <DataTable columns={columns} data={streets}>
                        <CreateStreet streets={streets} />
                    </DataTable>
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
