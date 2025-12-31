import { Street, Village } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EditJalan from './edit-jalan';
// import useDelete from '@/hooks/use-delete';
import {
    countInstalledLamps,
    countInstalledNetworkCable,
    countInstalledPanels,
    countRequiredLamps,
    countRequiredNetworkCable,
    countRequiredPanels,
    countStreetLength,
} from '@/helpers';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';

export const columns: ColumnDef<Street>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ table, row }) => table.getSortedRowModel().rows.indexOf(row) + 1,
    },
    {
        accessorKey: 'name',
        id: 'jalan',
        header: 'Jalan',
    },
    {
        accessorKey: 'village.name',
        id: 'kelurahan',
        header: 'Kelurahan',
    },
    {
        accessorKey: 'village.subdistrict.name',
        id: 'kecamatan',
        header: 'Kecamatan',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorFn: (row) => countStreetLength(row),
        id: 'panjang_jalan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panjang Jalan (m)" className="pl-2" />,
    },
    {
        accessorFn: (row) => countRequiredLamps(row),
        id: 'lampu_dibutuhkan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lampu D." className="pl-2" />,
    },
    {
        accessorFn: (row) => countInstalledLamps(row),
        id: 'jumlah_lampu',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lampu T." className="pl-2" />,
    },
    {
        accessorFn: (row) => countRequiredPanels(row),
        id: 'panel_dibutuhkan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panel D." className="pl-2" />,
    },
    {
        accessorFn: (row) => countInstalledPanels(row),
        id: 'jumlah_panel',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panel T." className="pl-2" />,
    },
    {
        accessorFn: (row) => countRequiredNetworkCable(row),
        id: 'kabel_dibutuhkan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kabel D." className="pl-2" />,
    },
    {
        accessorFn: (row) => countInstalledNetworkCable(row),
        id: 'panjang_kabel',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panjang Kabel T." className="pl-2" />,
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);

            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (street: Street) => {
                deleteItem('streets.destroy', street);
            };

            useEffect(() => {
                if (isDeleting) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }, [handleDeleteRow, isDeleting]);

            const { villages } = usePage<{ villages: Village[] }>().props;

            return (
                <div className="flex items-center">
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Jalan"
                        key={`${row.original.id}-delete-${row.original.name}`}
                    />
                    <EditJalan key={`${row.original.id}-edit-${row.original.name}`} street={row.original} villages={villages} />
                </div>
            );
        },
    },
];
