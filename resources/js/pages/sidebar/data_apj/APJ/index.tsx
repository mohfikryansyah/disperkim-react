import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Lamp } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';

export default function IndexDataAPJ({ lamps }: { lamps: Lamp[] }) {
    const lampsOptionsType = Array.from(new Set(lamps.map((lamp) => lamp.type)));

    const formatedLampsOptionsType = lampsOptionsType.map((type) => {
        return {
            label: type,
            value: type,
        };
    });

    console.log(lamps)

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Data APJ Konvensional</h1>
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className='relative overflow-hidden'>
                        <CardHeader>
                            <CardTitle>Total Titik Lampu</CardTitle>
                            <CardDescription>Total keseluruhan titik lampu</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl font-bold">{lamps.length}</h1>
                            {/* <div className="absolute -right-10 top-0">
                                <img src="/images/lampu.png" alt="" className='w-[7rem] lg:w-[10rem] h-auto opacity-10'/>
                            </div> */}
                        </CardContent>
                    </Card>
                    <Card className='relative overflow-hidden'>
                        <CardHeader>
                            <CardTitle>Total Titik Lampu Konvensional</CardTitle>
                            <CardDescription>Total keseluruhan APJ Konvensional</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl font-bold">{lamps.filter((lamp) => lamp.type === 'Konvensional').length}</h1>
                            {/* <div className="absolute -right-10 top-0">
                                <img src="/images/lampu.png" alt="" className='w-[7rem] lg:w-[10rem] h-auto opacity-10'/>
                            </div> */}
                        </CardContent>
                    </Card>
                    <Card className='relative overflow-hidden'>
                        <CardHeader>
                            <CardTitle>Total Titik Lampu LED</CardTitle>
                            <CardDescription>Total keseluruhan APJ LED</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl font-bold">{lamps.filter((lamp) => lamp.type === 'LED').length}</h1>
                            {/* <div className="absolute -right-10 top-0">
                                <img src="/images/lampu.png" alt="" className='w-[7rem] lg:w-[10rem] h-auto opacity-10'/>
                            </div> */}
                        </CardContent>
                    </Card>
                    <Card className='relative overflow-hidden'>
                        <CardHeader>
                            <CardTitle>Total Titik Lampu Tenaga Surya</CardTitle>
                            <CardDescription>Total keseluruhan APJ Tenaga Surya</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl font-bold">{lamps.filter((lamp) => lamp.type === 'PJUTS').length}</h1>
                            {/* <div className="absolute -right-10 top-0">
                                <img src="/images/lampu.png" alt="" className='w-[7rem] lg:w-[10rem] h-auto opacity-10'/>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>
                <DataTable
                    columns={columns}
                    data={lamps}
                    columnFilter="type"
                    titleFilter="Filter Tipe"
                    optionsFilter={formatedLampsOptionsType}
                ></DataTable>
            </div>
        </AppLayout>
    );
}
