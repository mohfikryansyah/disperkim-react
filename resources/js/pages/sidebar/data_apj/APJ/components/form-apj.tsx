import { MapClickHandlerOnCreate } from '@/components/custom/map-click-handler';
import InputError from '@/components/input-error';
import { defaultMarkerIcon } from '@/components/map-leaflet';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { getLampIconUrl, ListrikPLN, ListSumberDana, StatusLamp, TypesLamp } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import MapPersebaranInfrastruktur from '@/pages/sidebar/lokasi/map-persebaran-infrastruktur';
import { Coordinates, Lamp, Panel, StatusLampType, Street } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { APJForm as APJFormType, ENUMSumberDana } from '../components/interface-apj';

interface APJFormProps {
    data: APJFormType;
    setData: InertiaFormProps<APJFormType>['setData'];
    errors: InertiaFormProps<APJFormType>['errors'];
    streets: Street[];
    lamps: Lamp[];
    panels: Panel[];
}

export default function APJForm({ data, setData, errors, streets, lamps, panels }: APJFormProps) {
    const subdistricts = streets.map((street) => street.village.subdistrict);
    const matchPanelsWithStreetID = panels.filter((panel) => panel.street_id === data.street_id);
    const matchLampsWithStreetID = lamps.filter((lamp) => lamp.street_id === data.street_id);

    const isOpenPopoverPanel = useBoolean();
    const isOpenPopoverJalan = useBoolean();
    const isOpenPopoverLampu = useBoolean();
    const isOpenPopoverStatusLampu = useBoolean();
    const isOpenPopoverListrikPLN = useBoolean();
    const isOpenPopoverSumberDana = useBoolean();

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

    const [currentLocation, setCurrentLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);

    useEffect(() => {
        if (currentLocation) {
            setMarkerPosition(currentLocation);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (data.latitude && data.longitude) {
            setMarkerPosition({
                lat: Number(data.latitude),
                lng: Number(data.longitude),
            });
        }
    }, [data.latitude, data.longitude]);

    const handleCoordinatesChange = (coords: Coordinates) => {
        setMarkerPosition({
            lat: Number(coords.lat),
            lng: Number(coords.lng),
        });
    };

    const street = streets.find((s) => s.id === data.street_id);
    const streetDisplay = street ? `${street.name} - Kelurahan ${street.village.name} - Kecamatan ${street.village.subdistrict.name}` : 'Pilih Jalan';

    return (
        <div className="space-y-4">
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
                            <CommandInput placeholder="Cari nama jalan..." />
                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                            <CommandList className="max-h-60 overflow-y-auto">
                                <CommandItem
                                    onSelect={() => {
                                        setData('street_id', '');
                                        isOpenPopoverJalan.setFalse();
                                        setData('panel_id', null);
                                    }}
                                >
                                    Kosongkan Pilihan
                                </CommandItem>
                                {streets?.map((street) => (
                                    <CommandItem
                                        key={street.id}
                                        onSelect={() => {
                                            setData('street_id', String(street.id));
                                            isOpenPopoverJalan.setFalse();
                                            setData('panel_id', null);
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

            {data.listrik_pln !== 'Mandiri' && (
                <div className="grid w-full gap-2">
                    <Label>Panel</Label>
                    <Popover modal={true} open={isOpenPopoverPanel.state} onOpenChange={isOpenPopoverPanel.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between" disabled={!data.street_id}>
                                {data.panel_id ? matchPanelsWithStreetID.find((panel) => panel.id === data.panel_id)?.name : 'Pilih Panel'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari Panel..." />
                                <CommandEmpty>Tidak ada panel yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {matchPanelsWithStreetID?.map((panel) => (
                                        <CommandItem
                                            key={panel.id}
                                            onSelect={() => {
                                                setData('panel_id', String(panel.id));
                                                isOpenPopoverPanel.setFalse();
                                            }}
                                        >
                                            {panel.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.panel_id} />
                </div>
            )}

            <div className="grid w-full gap-2">
                <Label>Nama APJ</Label>
                <Input onChange={(e) => setData('name', e.target.value)} value={data.name} />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label>Tipe Lampu</Label>
                <Popover modal={true} open={isOpenPopoverLampu.state} onOpenChange={isOpenPopoverLampu.setState}>
                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                        <Button type="button" variant="outline" className="w-full justify-between">
                            <div className="flex items-center gap-2">
                                {data.type && <img src={getLampIconUrl(data.type)} alt={data.type} className="h-5 w-5" />}
                                {data.type ? data.type : 'Pilih Tipe Lampu'}
                            </div>
                            <ChevronDown className="size-3" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="popover-content p-0">
                        <Command>
                            <CommandInput placeholder="Cari tipe lampu..." />
                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                            <CommandList className="max-h-60 overflow-y-auto">
                                {TypesLamp.map((typeLamp) => (
                                    <CommandItem
                                        key={typeLamp.value}
                                        onSelect={() => {
                                            const val = typeLamp.value;

                                            setData('type', val);

                                            if (val === 'Tiang PLN Tanpa PJU') {
                                                setData('listrik_pln', '-');
                                                setData('status', '-');
                                            } else if (val === 'Tiang PJUTS') {
                                                setData('listrik_pln', 'Mandiri');
                                            } else {
                                                setData('listrik_pln', '');
                                                setData('status', '' as StatusLampType);
                                            }

                                            isOpenPopoverLampu.setFalse();
                                        }}
                                        className="flex items-center gap-2"
                                    >
                                        <img src={getLampIconUrl(typeLamp.value)} alt={typeLamp.label} className="h-5 w-5" />
                                        <span>{typeLamp.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <InputError message={errors.type} />
            </div>

            {data.type === 'Tiang PJUTS' && (
                <div className="grid w-full gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Sumber Dana</Label>
                        <Popover modal={true} open={isOpenPopoverSumberDana.state} onOpenChange={isOpenPopoverSumberDana.setState}>
                            <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                <Button type="button" variant="outline" className="w-full justify-between">
                                    {data.sumber_dana ? data.sumber_dana : 'Pilih Sumber Dana'}
                                    <ChevronDown className="size-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content p-0">
                                <Command>
                                    <CommandList className="max-h-60 overflow-y-auto">
                                        {ListSumberDana.map((sumber_dana) => (
                                            <CommandItem
                                                key={sumber_dana.value}
                                                onSelect={() => {
                                                    setData('sumber_dana', sumber_dana.value as ENUMSumberDana);
                                                    isOpenPopoverSumberDana.setFalse();
                                                }}
                                                className="flex items-center gap-2"
                                            >
                                                <span>{sumber_dana.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.sumber_dana} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Tahun Pengadaan</Label>
                        <Input onChange={(e) => setData('tahun_pengadaan', e.target.value)} value={data.tahun_pengadaan ?? ''} />
                        <InputError message={errors.tahun_pengadaan} />
                    </div>
                </div>
            )}

            <div className="grid w-full gap-5 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label>Status Lampu</Label>
                    <Popover modal={true} open={isOpenPopoverStatusLampu.state} onOpenChange={isOpenPopoverStatusLampu.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                {data.status ? data.status : 'Pilih Status Lampu'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {StatusLamp.map((statusLamp) => (
                                        <CommandItem
                                            key={statusLamp.value}
                                            onSelect={() => {
                                                setData('status', statusLamp.value as any);
                                                isOpenPopoverStatusLampu.setFalse();
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            <span>{statusLamp.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.status} />
                </div>

                <div className="grid gap-2">
                    <Label>Listrik PLN</Label>
                    <Popover modal={true} open={isOpenPopoverListrikPLN.state} onOpenChange={isOpenPopoverListrikPLN.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                {data.listrik_pln ? data.listrik_pln : 'Pilih Listrik PLN'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {ListrikPLN?.map((listrikPLN) => (
                                        <CommandItem
                                            key={listrikPLN.value}
                                            onSelect={() => {
                                                if (listrikPLN.value === 'Mandiri') {
                                                    setData('panel_id', null);
                                                }
                                                setData('listrik_pln', listrikPLN.value);
                                                isOpenPopoverListrikPLN.setFalse();
                                            }}
                                        >
                                            {listrikPLN.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.listrik_pln} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label>Deskripsi</Label>
                <Textarea placeholder="Ketik disini jika ada informasi tambahan." className="resize-none" />
            </div>

            <div className="flex w-full flex-col gap-2 lg:h-[30rem]">
                <div className="flex items-center gap-x-1">
                    <Label>Lokasi Lampu</Label>
                    <span className="text-sm font-medium">atau</span>
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-500 underline"
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        if (markerRef.current) {
                                            markerRef.current.remove();
                                        }
                                        const { latitude, longitude } = position.coords;
                                        setData('latitude', latitude);
                                        setData('longitude', longitude);
                                        setCurrentLocation({
                                            lat: latitude,
                                            lng: longitude,
                                        });
                                        toast.success('Lokasi berhasil diambil!');
                                    },
                                    (error) => {
                                        toast.error('Tidak dapat mengambil lokasi: ' + error.message);
                                    },
                                );
                            } else {
                                toast.error('Geolocation tidak didukung di browser ini.');
                            }
                        }}
                    >
                        Gunakan Lokasi saat ini
                    </button>
                </div>
                <MapPersebaranInfrastruktur
                    showLegenda={false}
                    panels={[]}
                    lamps={matchLampsWithStreetID}
                    mapRef={mapRef}
                    subdistricts={subdistricts}
                    networkCables={[]}
                    showFilters={false}
                    mapOnDialog={true}
                    disableEmptyOverlay
                    className="w-full not-lg:h-[20rem]"
                >
                    <MapClickHandler />
                    <MapClickHandlerOnCreate currentLocation={currentLocation} onCoordinatesChange={handleCoordinatesChange} />
                    {markerPosition && (
                        <Marker position={markerPosition} icon={defaultMarkerIcon()}>
                            <Popup>
                                Latitude: {markerPosition.lat}, Longitude: {markerPosition.lng}
                            </Popup>
                        </Marker>
                    )}
                </MapPersebaranInfrastruktur>
            </div>

            <div className="grid w-full gap-2">
                <Label>Latitude</Label>
                <Input type="number" name="latitude" value={data.latitude} onChange={(e) => setData('latitude', Number(e.target.value))} />
                <InputError message={errors.latitude} />
            </div>

            <div className="grid w-full gap-2">
                <Label>Longitude</Label>
                <Input type="number" name="longitude" value={data.longitude} onChange={(e) => setData('longitude', Number(e.target.value))} />
                <InputError message={errors.longitude} />
            </div>
        </div>
    );
}
