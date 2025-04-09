import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { useDistrict, useSubdistrict } from '@/hooks/use-fetch';
import AppLayout from '@/layouts/app-layout';
import { Lamp } from '@/types';
import { Head } from '@inertiajs/react';
import { Loader2Icon } from 'lucide-react';
import { columns } from './columns';

export default function IndexDataAPJKonvensional({ lamps }: { lamps: Lamp[] }) {
    const { districts, error: errorDistrict, loading: loadingDistrict } = useDistrict();
    const { subdistricts, error: errorSubdistrict, loading: loadingSubdistrict } = useSubdistrict(7571010);
    const { capitalize } = useCapitalizeEachWord();

    const subdistrictOptions = [
        ...new Map(
            subdistricts.map((subdistrict) => [
                subdistrict.id,
                {
                    label: capitalize(subdistrict.name),
                    value: capitalize(subdistrict.name),
                },
            ]),
        ).values(),
    ];

    console.log(lamps);


    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Data APJ Konvensional</h1>
                <div className="grid grid-cols-4 gap-4">
                    {loadingSubdistrict ? (
                        <div className='col-span-4'>
                            <Loader2Icon className="animate-spin text-blue-500 mx-auto" />
                        </div>
                    ) : (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Total data APJ Konvensional</CardTitle>
                                    <CardDescription>Total APJ Konvensional keseluruhan</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{lamps.length}</div>
                                </CardContent>
                            </Card>
                            {subdistricts.map((subdistrict) => (
                                <Card key={subdistrict.id}>
                                    <CardHeader>
                                        <CardTitle>{capitalize(subdistrict.name)}</CardTitle>
                                        <CardDescription>Total APJ Konvensional di {capitalize(subdistrict.name)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {lamps.filter((lamp) => lamp.subdistrict.subdistrict_name == capitalize(subdistrict.name)).length}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
                <DataTable
                    columns={columns}
                    data={lamps}
                    columnFilter="kelurahan"
                    titleFilter="Filter Kelurahan"
                    optionsFilter={subdistrictOptions}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
