import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { useInitials } from '@/hooks/use-initials';
import { NetworkCable } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export const columns: ColumnDef<NetworkCable>[] = [
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
        header: 'Nama Kabel Jaringan',
    },
    {
        accessorKey: 'type_cable',
        id: 'type_cable',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe Kabel" className="pl-2" />,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'length',
        id: 'length',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Panjang Kabel (meter)" className="pl-2" />,
        cell: ({ row }) => {
            return <span>{row.original.length}</span>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'created_at',
        id: 'created_at',
        header: 'Ditambahkan pada',
        cell: ({ row }) => {
            return <span>{format(row.getValue('created_at'), 'EEEE, dd MMMM yyyy', { locale: id })}</span>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'street.village.subdistrict.name',
        id: 'kecamatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" className="pl-2" />,
        cell: ({ row }) => {
            const data = row.original;
            return <span>{`${data.street.name}, Kel. ${data.street.village.name}, Kec. ${data.street.village.subdistrict.name}`}</span>;
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (networkCable: NetworkCable) => {
                deleteItem('network-cable.destroy', networkCable);
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
                    {/* <EditKecamatan kecamatan={row.original} /> */}
                </div>
            );
        },
    },
];
