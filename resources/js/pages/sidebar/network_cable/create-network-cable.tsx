'use client';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TypesCable } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Coordinates, TypeCable } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Marker, Polyline, useMapEvents } from 'react-leaflet';
import MapPersebaranInfrastruktur from '../lokasi/map-persebaran-infrastruktur';
import { PageCableNetworkProps } from './components/interface-network-cable';

function CableDrawer({ onAddPoint }: { onAddPoint: (latlng: [number, number]) => void }) {
    useMapEvents({
        click(e) {
            onAddPoint([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

type NetworkCableForm = {
    name: string;
    street_id: string;
    type_cable: TypeCable;
    polyline: Coordinates[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kabel Jaringan',
        href: route('network-cable.index'),
    },
    {
        title: 'Buat Kabel Jaringan',
        href: route('network-cable.create'),
    },
];

export default function CreateNetworkCablePage({ streetsForCreate, networkCables, panels, lamps }: PageCableNetworkProps) {
    const { data, setData, post, processing, errors, reset } = useForm<NetworkCableForm>({
        name: '',
        street_id: '',
        type_cable: '' as TypeCable,
        polyline: [] as Coordinates[],
    });

    const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>('');

    const mapRef = useRef<L.Map | null>(null);

    const handleAddPoint = (latlng: [number, number]) => {
        const [lat, lng] = latlng;
        setData('polyline', [...data.polyline, { lat, lng }]);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('network-cable.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Kabel berhasil ditambahkan');
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menambahkan Kabel!');
            },
        });
    };

    const handleReset = () => {
        setData('polyline', []);
    };

    const handleRemovePoint = (index: number) => {
        const newPolyline = data.polyline.filter((_, i) => i !== index);
        setData('polyline', newPolyline);
    };

    const isOpenPopoverJalan = useBoolean();

    const street = streetsForCreate.find((s) => s.id === data.street_id);
    const streetDisplay = street ? `${street.name} - Kelurahan ${street.village.name} - Kecamatan ${street.village.subdistrict.name}` : 'Pilih Jalan';

    useEffect(() => {
        if (data.street_id === null || !street) return;

        const subdistrictName = street.village.subdistrict.name;
        const villageName = street.village.name;
        const streetName = street.name;

        router.get(
            window.location.pathname,
            {
                subdistrict: subdistrictName,
                village: villageName,
                street: streetName,
            },
            {
                only: ['lamps', 'panels', 'networkCables', 'subdistricts', 'villages', 'streets'],
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Filter berhasil diterapkan.');
                },
            },
        );
    }, [data.street_id]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* <h1 className="text-primary text-lg font-semibold md:text-xl lg:text-2xl">Buat Kabel Jaringan</h1> */}

                <Card>
                    <CardHeader>
                        <CardTitle>Formulir Kabel Jaringan</CardTitle>
                        <CardDescription>Berikut adalah formulir data kabel jaringan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid w-full gap-2">
                                <Label>Jalan</Label>
                                <Popover modal={true} open={isOpenPopoverJalan.state} onOpenChange={isOpenPopoverJalan.setState}>
                                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                        <Button type="button" variant="outline" className="w-full justify-between">
                                            {streetDisplay}
                                            <ChevronDown className="size-3" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari kecamatan..." />
                                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                            <CommandList className="max-h-60 overflow-y-auto">
                                                {streetsForCreate?.map((street) => (
                                                    <CommandItem
                                                        key={street.id}
                                                        onSelect={() => {
                                                            setData('street_id', String(street.id));
                                                            isOpenPopoverJalan.setFalse();
                                                        }}
                                                    >
                                                        {street.name} - Kelurahan {street.village.name} - Kecamatan {street.village.subdistrict.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.street_id} />
                            </div>

                            <div className="grid w-full gap-2">
                                <Label>Nama Kabel</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Misal: Kabel Utama Panel A" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid w-full gap-2">
                                <Label>Tipe Kabel</Label>
                                <Select onValueChange={(value) => setData('type_cable', value as TypeCable)} value={data.type_cable}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tipe Kabel" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TypesCable.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type_cable} />
                            </div>

                            <div className="w-full overflow-hidden rounded-md">
                                <MapPersebaranInfrastruktur
                                    lamps={lamps}
                                    panels={panels}
                                    mapRef={mapRef}
                                    networkCables={networkCables}
                                    showFilters={false}
                                    disableEmptyOverlay
                                >
                                    <CableDrawer onAddPoint={handleAddPoint} />

                                    {data.polyline.length > 0 && (
                                        <Polyline
                                            positions={data.polyline}
                                            pathOptions={{
                                                color: TypesCable.find((c) => c.value === data.type_cable)?.color || '#3388ff',
                                                weight: 2,
                                            }}
                                        />
                                    )}

                                    {data.polyline.map((pos, idx) => (
                                        <Marker key={idx} position={pos} eventHandlers={{ click: () => handleRemovePoint(idx) }}>
                                            <span>{idx + 1}</span>
                                        </Marker>
                                    ))}
                                </MapPersebaranInfrastruktur>
                            </div>
                            <div className="gap-2 md:flex">
                                <Button type="submit" disabled={processing}>
                                    Simpan Kabel
                                </Button>

                                <Button type="button" onClick={handleReset} variant="destructive" disabled={processing}>
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
