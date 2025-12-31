import { Subdistrict } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

import DeleteDialog from '@/components/custom/delete-dialog';
import TextLink from '@/components/text-link';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { useEffect, useState } from 'react';
import EditKecamatan from './edit-kecamatan';
import { countInstalledLamps, countInstalledNetworkCable, countInstalledPanels, countRequiredLamps, countRequiredNetworkCable, countRequiredPanels, countStreetLength } from '@/helpers';

export const columns: ColumnDef<Subdistrict>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ table, row }) => table.getSortedRowModel().rows.indexOf(row) + 1,
    },
    {
        accessorKey: 'name',
        id: 'nama',
        header: 'Nama Kecamatan',
        cell: ({ row }) => {
            return (
                <TextLink
                    className="text-blue-500 no-underline hover:underline"
                    href={route('subdistricts.show', { subdistrict: row.original.id })}
                    preserveScroll={true}
                >
                    {row.original.name}
                </TextLink>
            );
        },
    },
    {
        accessorFn: (row) => row.villages?.length ?? 0,
        id: 'jumlah_kelurahan',
        header: 'Jumlah Kelurahan',
    },
    {
        accessorFn: (row) => row.villages?.flatMap((v) => v.streets ?? []).length ?? 0,
        id: 'jumlah_jalan',
        header: 'Jalan',
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
