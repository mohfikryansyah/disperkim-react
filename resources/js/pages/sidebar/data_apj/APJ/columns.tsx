'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { useInitials } from '@/hooks/use-initials';
import { cn, strLimit } from '@/lib/utils';
import { Lamp, Panel, Street, Lamp as TypeLamp } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import EditAPJ from './edit-apj';

export const apjColumns = (lamps: Lamp[], streets: Street[], panels: Panel[]): ColumnDef<TypeLamp>[] => [
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
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
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
        id: 'Nama APJ',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama APJ" className="pl-2" />,
        cell: ({ row }) => <span className="pl-1.5">{row.original.name}</span>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'type',
        id: 'type',
        header: 'Tipe Lampu',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'listrik_pln',
        id: 'listrik PLN',
        header: 'Listrik PLN',
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const value = row.original.status;
            const getColorBadge = (value: string) => {
                switch (value) {
                    case 'Menyala':
                        return 'bg-green-400 text-green-100';
                    case 'Mati':
                        return 'bg-yellow-400 text-yellow-100';
                    case 'Rusak':
                        return 'bg-red-400 text-red-100';
                }
            };
            if (value === '-') {
                return <span className="text-muted-foreground">-</span>;
            }

            return <Badge className={cn(getColorBadge(value))}>{value}</Badge>;
        },
        // enableGlobalFilter: true,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: 'Nama Panel',
        accessorFn: (row) => row.panel?.name ?? 'Tidak Ada',
        header: 'Terhubung ke Panel',
        cell: ({ row }) => <span>{row.original.panel?.name ?? 'Tidak Ada'}</span>,
        filterFn: (row, id, value) => {
            const cellValue = row.getValue(id);
            return value.includes(cellValue);
        },
    },
    {
        id: 'created_at',
        accessorFn: (row) => format(new Date(row.created_at), 'EEEE, dd MMM yyyy', { locale: id }),
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

            if (!data.street) return '-';

            return (
                <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`}
                    title={`${data.street.name}, Kel. ${data.street.village.name}, Kec. ${data.street.village.subdistrict.name}`}
                >
                    {strLimit(`${data.street.name}, Kel. ${data.street.village.name}, Kec. ${data.street.village.subdistrict.name}`, 30)}
                </a>
            );
        },
    },
    {
        id: 'coordinates',
        accessorFn: (row) => `${row.latitude}, ${row.longitude}`,
        header: 'Koordinat (LatLng)',
        filterFn: (row, id, value) => {
            const coord = row.getValue<string>(id).toLowerCase();
            return coord.includes(value.toLowerCase());
        },
    },

    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (lamp: TypeLamp) => {
                deleteItem('lamp.destroy', lamp);
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
                        title="Hapus Data APJ"
                        key={row.original.id}
                    />
                    <EditAPJ
                        lamp={row.original}
                        lamps={lamps}
                        streets={streets}
                        panels={panels}
                        key={`${row.original.id}-${row.original.latitude}`}
                    />
                </div>
            );
        },
    },
];
