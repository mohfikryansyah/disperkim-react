import InputError from '@/components/input-error';
import { defaultMarkerIcon } from '@/components/map-leaflet';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TypesLamp } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useMapEvents } from 'react-leaflet';
import MapLamp from '../../lokasi_lamp/map-lamp';
import { PropsAPJ } from './pages';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'APJ',
        href: route('subdistricts.index'),
    },
];

export type APJForm = {
    street_id: number | string | null;
    icon_id: string;
    user_id: string;
    latitude: number;
    longitude: number;
    type: string;
};

export default function CreateAPJ({ streets, lamps, iconPin }: PropsAPJ) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<APJForm>>({
        street_id: null,
        icon_id: '',
        user_id: '',
        latitude: NaN,
        longitude: NaN,
        type: '',
    });

    const [open, setOpen] = useState(false);
    const isOpenPopoverJalan = useBoolean();
    const isOpenPopoverLampu = useBoolean();
    const isOpenPopoverIcon = useBoolean();
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Layer | null>(null);
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setData('latitude', e.latlng.lat);
                setData('longitude', e.latlng.lng);
                if (markerRef.current) {
                    markerRef.current.remove();
                }

                if (mapRef.current) {
                    const newMarker = L.marker(e.latlng, { icon: defaultMarkerIcon() }).addTo(mapRef.current);
                    markerRef.current = newMarker;
                }
            },
        });
        return null;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('lamp.store'), {
            preserveState: true,
            onSuccess: () => {
                toast.success('APJ berhasil ditambahkan');
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menambahkan APJ!');
            },
        });
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="h-8 bg-emerald-600 transition-colors duration-300 hover:bg-emerald-700">Tambah APJ</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Form APJ</DialogTitle>
                        <DialogDescription>Tambahkan kecamatan dengan mengisi form dibawah ini</DialogDescription>
                    </DialogHeader>
                    <div className="max-h-[75dvh] overflow-y-auto pr-4 pb-2">
                        <form id='create-apj' onSubmit={submit} className="space-y-4">
                            <div className="grid w-full gap-2">
                                <Label>Jalan</Label>
                                <Popover open={isOpenPopoverJalan.state} onOpenChange={isOpenPopoverJalan.setState}>
                                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                        <Button type="button" variant="outline" className="w-full justify-between">
                                            {data.street_id ? streets.find((street) => street.id === data.street_id)?.name : 'Pilih Jalan'}
                                            <ChevronDown className="size-3" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari kecamatan..." />
                                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                            <CommandList className="max-h-60 overflow-y-auto">
                                                {streets?.map((street) => (
                                                    <CommandItem
                                                        key={street.id}
                                                        onSelect={() => {
                                                            setData('street_id', street.id);
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
                                <Label>Tipe Lampu</Label>
                                <Popover open={isOpenPopoverLampu.state} onOpenChange={isOpenPopoverLampu.setState}>
                                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                        <Button type="button" variant="outline" className="w-full justify-between">
                                            {data.type ? data.type : 'Pilih Jalan'}
                                            <ChevronDown className="size-3" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari kecamatan..." />
                                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                            <CommandList className="max-h-60 overflow-y-auto">
                                                {TypesLamp?.map((typeLamp) => (
                                                    <CommandItem
                                                        key={typeLamp.value}
                                                        onSelect={() => {
                                                            setData('type', typeLamp.value);
                                                            isOpenPopoverLampu.setFalse();
                                                        }}
                                                    >
                                                        {typeLamp.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.type} />
                            </div>
                            <div className="grid w-full gap-2">
                                <Label>Icon</Label>
                                <Popover open={isOpenPopoverIcon.state} onOpenChange={isOpenPopoverIcon.setState} modal={true}>
                                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                        <Button type="button" variant="outline" className="w-full items-center justify-between gap-2">
                                            {data.icon_id && (
                                                <img
                                                    src={`/storage/${iconPin.find((icon) => icon.id === Number(data.icon_id))?.path_icon}`}
                                                    alt="Icon"
                                                    className="h-auto w-[1rem]"
                                                />
                                            )}
                                            <span className="flex-1 text-left">
                                                {data.icon_id ? iconPin.find((icon) => icon.id === Number(data.icon_id))?.name : 'Pilih Jalan'}
                                            </span>
                                            <ChevronDown className="size-3" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari kecamatan..." />
                                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                            <CommandList className="max-h-60 overflow-y-auto">
                                                {iconPin?.map((icon) => (
                                                    <CommandItem
                                                        key={icon.id}
                                                        onSelect={() => {
                                                            setData('icon_id', String(icon.id));
                                                            isOpenPopoverIcon.setFalse();
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <img src={`/storage/${icon.path_icon}`} alt="Icon" className="h-auto w-[1.5rem]" />
                                                            <span>{icon.name}</span>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.icon_id} />
                            </div>
                            <div className="flex h-[400px] w-full flex-col gap-2">
                                <Label>Tipe Lampu</Label>
                                <MapLamp lamps={lamps} mapRef={mapRef}>
                                    <MapClickHandler />
                                </MapLamp>
                            </div>
                            <div className="grid w-full gap-2">
                                <Label>Lampu yang dibutuhkan</Label>
                                <Input
                                    className="bg-white"
                                    type="number"
                                    name="latitude"
                                    value={data.latitude}
                                    onChange={(e) => setData('latitude', Number(e.target.value))}
                                />
                                <InputError message={errors.latitude}></InputError>
                            </div>
                            <div className="grid w-full gap-2">
                                <Label>Lampu yang dibutuhkan</Label>
                                <Input
                                    className="bg-white"
                                    type="number"
                                    name="longitude"
                                    value={data.longitude}
                                    onChange={(e) => setData('longitude', Number(e.target.value))}
                                />
                                <InputError message={errors.longitude}></InputError>
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <Button form='create-apj' disabled={processing || !isDirty}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
