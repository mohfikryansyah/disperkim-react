import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Lamp } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Lamp>[] = [
    {
        accessorKey: 'subdistrict.district.district_name',
        id: 'kecamatan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kecamatan" className="pl-2" />,
        cell: ({ row }) => {
            const district = row.original.subdistrict.district.district_name;
            return (
                <Link href={route('data.apj.all', { query: row.original.subdistrict.district.id })} className="text-blue-500 hover:underline">
                    {district}
                </Link>
            );
        },

    },
    {
        accessorKey: 'subdistrict.subdistrict_name',
        id: 'kelurahan',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Kelurahan" className="pl-2" />,
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
        accessorKey: 'type',
        id: 'type',
        header: 'Tipe',
    },
];
