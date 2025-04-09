import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { DistrictLightingStat } from '@/types';
import { Lightbulb } from 'lucide-react';
import { columns } from './columns';

type Lamp = {
    type: 'LED' | 'PJUTS' | 'Konvensional';
};

type Panel = {
    lamps: Lamp[];
};

type Subdistrict = {
    panels: Panel[];
};

type District = {
    subdistricts: Subdistrict[];
};

export default function query({ districts, district }: { districts: DistrictLightingStat; district: string }) {

    const countLampsByType = (districtStat: DistrictLightingStat, type: string): number => {
        return districtStat.subdistrict.flatMap((subdistrict) => subdistrict.lamps).filter((lamp) => lamp.type === type).length;
    };

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Data APJ di Kecamatan {districts.district_name}</h1>
                {/* <Card> */}
                <h1 className="leading-none font-semibold">
                    Total Titik Lampu di Kecamatan {district} : {districts.lamp_count}
                </h1>
                <div className="grid grid-cols-4 gap-5">
                    <Card className="relative shadow-none">
                        <CardHeader>
                            <CardTitle>Total Titik Lampu di Kecamatan {district}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl leading-none font-semibold">
                                {districts.subdistrict.reduce((acc, subdistrict) => acc + subdistrict.lamps.length, 0)}
                            </h1>
                            <div className="absolute top-[12%] right-0 text-gray-200">
                                <Lightbulb className="size-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative shadow-none">
                        <CardHeader>
                            <CardTitle>Titik Lampu Tipe LED</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl leading-none font-semibold">{countLampsByType(districts, 'LED')}</h1>
                            <div className="absolute top-[12%] right-0 text-gray-200">
                                <Lightbulb className="size-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative shadow-none">
                        <CardHeader>
                            <CardTitle>Titik Lampu Tipe Tenaga Surya</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl leading-none font-semibold">{countLampsByType(districts, 'PJUTS')}</h1>
                            <div className="absolute top-[12%] right-0 text-gray-200">
                                <Lightbulb className="size-20" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative shadow-none">
                        <CardHeader>
                            <CardTitle>Titik Lampu Tipe Konvensional</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-2xl leading-none font-semibold">{countLampsByType(districts, 'Konvensional')}</h1>
                            <div className="absolute top-[12%] right-0 text-gray-200">
                                <Lightbulb className="size-20" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* </Card> */}
                <DataTable columns={columns} data={districts.subdistrict} />
            </div>
        </AppLayout>
    );
}
