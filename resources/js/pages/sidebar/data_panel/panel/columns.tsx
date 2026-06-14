'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { useInitials } from '@/hooks/use-initials';
import { Lamp, Panel, Street } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import EditPanel from './edit-panel';

export const PANELColumns = (lamps: Lamp[], streets: Street[], panels: Panel[]): ColumnDef<Panel>[] => [
    {
        accessorKey: 'user.name',
        id: 'ditambahkan Oleh',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ditambahkan Oleh" className="pl-2" />,
        cell: ({ row }) => {
            const getInitials = useInitials();
            const user = row.original.user;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        {user.avatar ? (
                            <AvatarImage key={user.avatar} src={'/storage/' + user.avatar} alt={user.name} />
                        ) : (
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-foreground">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <span>{user.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        id: 'name',
        header: 'Nama Panel',
    },
    {
        accessorKey: 'customer_id',
        id: 'Customer ID',
        header: 'ID Pelanggan',
    },
    {
        accessorKey: 'power',
        id: 'power',
        header: 'Power (VA)',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: 'created_at',
        accessorFn: (row) => format(new Date(row.created_at), 'EEEE, dd MMMM yyyy', { locale: id }),
        header: 'Ditambahkan pada',
        enableGlobalFilter: true,
        cell: ({ row }) => <span>{row.getValue('created_at')}</span>,
        filterFn: (row, id, value) => {
            const cellValue = row.getValue<string>(id).toLowerCase();
            return cellValue.includes(value.toLowerCase());
        },
    },
    {
        id: 'alamat',
        accessorFn: (row) =>
            `${row.street?.name ?? ''}, Kel. ${row.street?.village?.name ?? ''}, Kec. ${row.street?.village?.subdistrict?.name ?? ''}`,
        header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" className="pl-2" />,
        cell: ({ row }) => {
            const data = row.original;
            return (
                <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`}
                >
                    {`${data.street.name}, Kel. ${data.street.village.name}, Kec. ${data.street.village.subdistrict.name}`}
                </a>
            );
        },
    },
    {
        accessorKey: 'latitude',
        header: 'Latitude',
    },
    {
        accessorKey: 'longitude',
        header: 'Longitude',
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (panel: Panel) => {
                deleteItem('panel.destroy', panel);
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
                        title="Hapus Panel"
                        key={row.original.id}
                    />
                    <EditPanel streets={streets} panels={panels} lamps={lamps} panel={row.original} />
                </div>
            );
        },
    },
];
