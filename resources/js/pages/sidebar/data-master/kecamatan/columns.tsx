import { Subdistrict } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EditKecamatan from './edit-kecamatan';
import { useDeleteWithToast } from '@/hooks/use-delete';

export const columns: ColumnDef<Subdistrict>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        id: 'nama',
        header: 'Nama Kecamatan',
        cell: ({ row }) => {
            return <Link href={route('subdistricts.show', { subdistrict: row.original.id })} preserveScroll={true}>{row.original.name}</Link>
        }
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (subdistrict: Subdistrict) => {
                deleteItem('subdistricts.destroy', subdistrict);
            };

            useEffect(() => {
                if (isDeleting) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }, [handleDeleteRow, isDeleting]);

            return (
                <div className="flex items-center">
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Kelurahan"
                        key={row.original.id}
                    />
                    <EditKecamatan kecamatan={row.original} />
                </div>
            );
        },
    },
];
