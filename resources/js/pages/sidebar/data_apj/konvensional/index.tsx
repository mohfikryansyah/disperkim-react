import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { useDistrict, useSubdistrict } from '@/hooks/use-fetch';
import AppLayout from '@/layouts/app-layout';
import { Lamp } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';

export default function IndexDataAPJKonvensional({ lamps }: { lamps: Lamp[] }) {
    const { districts, error: errorDistrict, loading: loadingDistrict } = useDistrict();
    const { subdistricts, error: errorSubdistrict, loading: loadingSubdistrict } = useSubdistrict(7571010);
    const { capitalize } = useCapitalizeEachWord();

    const districtOptions = [
        ...new Map(
            districts.map((district) => [
                district.id,
                {
                    label: capitalize(district.name),
                    value: capitalize(district.name),
                },
            ]),
        ).values(),
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Data APJ Konvensional</h1>
                <Card className='max-w-xs'>
                    <CardHeader>
                        <CardTitle>Total data APJ Konvensional</CardTitle>
                        <CardDescription>Total keseluruhan APJ Konvensional</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{lamps.length}</div>
                    </CardContent>
                </Card>
                {/* <div className="grid grid-cols-5 gap-4">
                    {loadingDistrict ? (
                        <div className='col-span-5'>
                            <Loader2Icon className="animate-spin text-blue-500 mx-auto" />
                        </div>
                    ) : (
                        <>
                            
                            {districts.map((district) => (
                                <Card key={district.id}>
                                    <CardHeader>
                                        <CardTitle>{capitalize(district.name)}</CardTitle>
                                        <CardDescription>Total APJ Konvensional di {capitalize(district.name)}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {lamps.filter((lamp) => lamp.subdistrict.district.district_name == capitalize(district.name)).length}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </>
                    )}
                </div> */}
                <DataTable
                    columns={columns}
                    data={lamps}
                    columnFilter="kecamatan"
                    titleFilter="Filter Kecamatan"
                    optionsFilter={districtOptions}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
