import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { useInitials } from '@/hooks/use-initials';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export const columns: ColumnDef<User>[] = [
    {
        id: 'No',
        header: 'No',
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" className="pl-2" />,
        cell: ({ row }) => {
            const getInitials = useInitials();
            const user = row.original;
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
        accessorKey: 'Email',
        header: 'Email',
        cell: ({ row }) => {
            const user = row.original;
            return <span>{user.email}</span>;
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
            id: 'actions',
            header: 'Aksi',
            cell: ({ row }) => {
                const [disableButton, setDisableButton] = useState<boolean>(false);
                const { deleteItem, isDeleting } = useDeleteWithToast();
    
                const handleDeleteRow = (user: User) => {
                    deleteItem('users.destroy', user);
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
                            title="Hapus User"
                            key={row.original.id}
                        />
                    {/* <EditKecamatan kecamatan={row.original} /> */}
                    </div>
                );
            },
        },
];
