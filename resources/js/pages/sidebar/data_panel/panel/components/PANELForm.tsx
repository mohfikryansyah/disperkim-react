import { MapClickHandlerOnCreate } from '@/components/custom/map-click-handler';
import InputError from '@/components/input-error';
import { defaultMarkerIcon } from '@/components/map-leaflet';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getLampIconUrl, TypesPanel } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import MapPersebaranInfrastruktur from '@/pages/sidebar/lokasi/map-persebaran-infrastruktur';
import { Coordinates, PanelType } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { CreatePanelProps, PanelForm as PanelFormType } from './interface-panel';

interface PanelFormProps {
    data: PanelFormType;
    setData: InertiaFormProps<PanelFormType>['setData'];
    errors: InertiaFormProps<PanelFormType>['errors'];
    streets: CreatePanelProps['streets'];
    lamps: CreatePanelProps['lamps'];
    panels: CreatePanelProps['panels'];
}

export default function PanelForm({ data, setData, errors, streets, lamps, panels }: PanelFormProps) {
    const subdistricts = streets.map((street) => street.village.subdistrict);
    const matchPanelsWithStreetID = panels.filter((panel) => panel.street_id === data.street_id);

    const isOpenPopoverJalan = useBoolean();
    const isOpenPopoverPanel = useBoolean();

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

    // Set initial marker position if lat/lng exist
    useEffect(() => {
        if (data.latitude && data.longitude && !isNaN(data.latitude) && !isNaN(data.longitude)) {
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
                            <CommandInput placeholder="Cari kecamatan..." />
                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                            <CommandList className="max-h-60 overflow-y-auto">
                                {streets?.map((street) => (
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
                <Label>Tipe Panel</Label>
                <Popover modal={true} open={isOpenPopoverPanel.state} onOpenChange={isOpenPopoverPanel.setState}>
                    <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                        <Button type="button" variant="outline" className="w-full justify-between">
                            {data.type_panel ? data.type_panel : 'Pilih Tipe Panel'}
                            <ChevronDown className="size-3" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="popover-content p-0">
                        <Command>
                            <CommandInput placeholder="Cari tipe panel..." />
                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                            <CommandList className="max-h-60 overflow-y-auto">
                                {TypesPanel?.map((typePanel) => (
                                    <CommandItem
                                        key={typePanel.value}
                                        onSelect={() => {
                                            setData('type_panel', typePanel.value as PanelType);
                                            isOpenPopoverPanel.setFalse();
                                        }}
                                    >
                                        <img src={getLampIconUrl(typePanel.value)} alt={typePanel.label} className="h-5 w-5" />
                                        {typePanel.label}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <InputError message={errors.type_panel} />
            </div>

            <div className="grid w-full gap-2">
                <Label>Nama Panel</Label>
                <Input onChange={(e) => setData('name', e.target.value)} value={data.name} />
                <InputError message={errors.name} />
            </div>

            <div className="grid w-full gap-2">
                <Label>Nama Pelanggan</Label>
                <Input onChange={(e) => setData('customer_name', e.target.value)} value={data.customer_name} />
                <InputError message={errors.customer_name} />
            </div>

            <div className="grid w-full gap-2">
                <Label>ID Pelanggan</Label>
                <Input type="telp" onChange={(e) => setData('customer_id', e.target.value)} value={data.customer_id} />
                <InputError message={errors.customer_id} />
            </div>

            <div className="grid w-full gap-2">
                <Label>
                    Daya <span className="text-gray-400">(VA)</span>
                </Label>
                <Input type="telp" onChange={(e) => setData('power', Number(e.target.value))} value={data.power} />
                <InputError message={errors.power} />
            </div>

            <div className="flex w-full flex-col gap-2 lg:h-[30rem]">
                <div className="flex items-center gap-x-1">
                    <Label>Lokasi Panel</Label>
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
                    panels={matchPanelsWithStreetID}
                    lamps={[]}
                    mapRef={mapRef}
                    networkCables={[]}
                    showFilters={false}
                    className="w-full not-lg:h-[20rem]"
                    mapOnDialog={true}
                    disableEmptyOverlay
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
                <Input
                    className="bg-white"
                    type="number"
                    name="latitude"
                    value={data.latitude}
                    onChange={(e) => setData('latitude', Number(e.target.value))}
                />
                <InputError message={errors.latitude} />
            </div>

            <div className="grid w-full gap-2">
                <Label>Longitude</Label>
                <Input
                    className="bg-white"
                    type="number"
                    name="longitude"
                    value={data.longitude}
                    onChange={(e) => setData('longitude', Number(e.target.value))}
                />
                <InputError message={errors.longitude} />
            </div>
        </div>
    );
}
