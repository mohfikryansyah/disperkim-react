import { Street, Subdistrict, Village } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EditJalan from './edit-jalan';
// import useDelete from '@/hooks/use-delete';

export const columns: ColumnDef<Street>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
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
                        key={row.original.id}
                    />
                    <EditJalan street={row.original} villages={villages} />
                </div>
            );
        },
    },
];
