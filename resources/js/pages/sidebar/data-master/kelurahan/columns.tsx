import { Subdistrict, Village } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EditKelurahan from './edit-kelurahan';

export const columns: ColumnDef<Village>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        id: 'nama kelurahan',
        header: 'Nama Kelurahan',
        cell: ({ row }) => {
            return <Link href={route('villages.show', { village: row.original.id })} preserveScroll={true}>{row.original.name}</Link>
        }
    },
    {
        accessorKey: 'subdistrict.name',
        id: 'nama kecamatan',
        header: 'Nama Kecamatan',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);

            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (village: Village) => {
                deleteItem('villages.destroy', village);
            };

            useEffect(() => {
                if (isDeleting) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }, [handleDeleteRow, isDeleting]);

            const { subdistricts } = usePage<{ subdistricts: Subdistrict[] }>().props;

            return (
                <div className="flex items-center">
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Kelurahan"
                        key={row.original.id}
                    />
                    <EditKelurahan village={row.original} subdistricts={subdistricts} />
                </div>
            );
        },
    },
];
