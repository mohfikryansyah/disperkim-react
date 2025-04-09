import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { SubdistrictLightingDetail } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SubdistrictLightingDetail>[] = [
    {
        id: 'kelurahan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kelurahan" className="pl-2" />,
        accessorFn: (row) => row.subdistrict_name,
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,
    },
    {
        id: 'lamp_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Jumlah Titik Lampu" className="pl-2" />,
        accessorFn: (row) => row.lamps?.length || 0,
        cell: ({ getValue }) => <span>{getValue<number>()}</span>,
    },
    {
        id: 'cable_length',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panjang Kabel" className="pl-2" />,
        accessorFn: (row) => row.cable_length,
        cell: ({ getValue }) => <span>{getValue<number>()}</span>,
    },
    {
        id: 'LED',
        header: ({ column }) => <DataTableColumnHeader column={column} title="LED" className="pl-2" />,
        accessorFn: (row) => row.lamps?.filter((lamp) => lamp.type === 'LED').length || 0,
        cell: ({ row }) => {
            const type = row.original.lamps?.filter((lamp) => lamp.type === 'LED').length || 0;
            return <span>{type}</span>;
        },
    },
    {
        id: 'PJUTS',
        header: ({ column }) => <DataTableColumnHeader column={column} title="PJUTS" className="pl-2" />,
        accessorFn: (row) => row.lamps?.filter((lamp) => lamp.type === 'PJUTS').length || 0,
        cell: ({ row }) => {
            const type = row.original.lamps?.filter((lamp) => lamp.type === 'PJUTS').length || 0;
            return <span>{type}</span>;
        },
    },
    {
        id: 'Konvensional',
        header: ({ column }) => <DataTableColumnHeader column={column} title="PJUTS" className="pl-2" />,
        accessorFn: (row) => row.lamps?.filter((lamp) => lamp.type === 'Konvensional').length || 0,
        cell: ({ row }) => {
            const type = row.original.lamps?.filter((lamp) => lamp.type === 'Konvensional').length || 0;
            return <span>{type}</span>;
        },
    },
];
