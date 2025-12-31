import { Subdistrict, Village } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ActionCell } from './action-cell';

export const createColumns = (subdistricts: Subdistrict[]): ColumnDef<Village>[] => [
    {
        id: 'No',
        header: 'No',
        cell: ({ table, row }) => table.getSortedRowModel().rows.indexOf(row) + 1,
    },
    {
        accessorKey: 'name',
        id: 'nama kelurahan',
        header: 'Nama Kelurahan',
        cell: ({ row }) => (
            <Link href={route('villages.show', { village: row.original.id })} preserveScroll>
                {row.original.name}
            </Link>
        ),
    },
    {
        accessorKey: 'subdistrict.name',
        id: 'nama kecamatan',
        header: 'Nama Kecamatan',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => <ActionCell village={row.original} subdistricts={subdistricts} />,
    },
];
