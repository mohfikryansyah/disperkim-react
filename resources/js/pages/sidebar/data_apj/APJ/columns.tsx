import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Lamp } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Lamp>[] = [
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
                            <img key={user.avatar} src={'/storage/' + user.avatar} alt={user.name} className="size-8" />
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
        accessorKey: 'type',
        id: 'type',
        header: 'Tipe Lampu',
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
];
