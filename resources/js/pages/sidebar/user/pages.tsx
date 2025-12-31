import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { columns } from './columns';
import { PAGEUserProps } from './interface-user';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: '/users',
    },
];

export default function Users({ users }: PAGEUserProps) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pengguna" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Card className="bg-gray-100">
                            <CardHeader>
                                <CardTitle>Daftar Pengguna</CardTitle>
                                <CardDescription>Berikut adalah data pengguna yang telah terdaftar di sistem.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={users}>
                                    <a href={route('register')} className="w-full">
                                        <Button className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 lg:w-fit">
                                            <PlusCircle />
                                            Tambah User
                                        </Button>
                                    </a>
                                </DataTable>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
