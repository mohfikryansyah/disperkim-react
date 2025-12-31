'use client';

import MapLeaflet from '@/components/map-leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { allMarkerIcons, markerIcon, TypesCable } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { Lamp, NetworkCable, Panel, Street, Subdistrict, Village } from '@/types';
import { router, usePage } from '@inertiajs/react';
import L from 'leaflet';
import { ChevronDown, Filter, Maximize, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import { Polyline, Popup } from 'react-leaflet';
import PopupLamp from './popup-lamp';
import PopupPanel from './popup-panel';

interface MapPersebaranInfrastrukturProps {
    lamps: Lamp[];
    panels: Panel[];
    networkCables: NetworkCable[];
    subdistricts?: Subdistrict[];
    villages?: Village[];
    streets?: Street[];
    filters?: {
        subdistrict: string;
        village: string;
        street: string;
    };
    zoom?: number;
    center?: [number, number];
    children?: React.ReactNode;
    mapRef: React.RefObject<L.Map | null>;
    className?: string;
    showLegenda?: boolean;
    mapOnDialog?: boolean;
    disableEmptyOverlay?: boolean;
    showFilters?: boolean;
}

type FilterType = 'all' | 'lamps' | 'panels' | 'Tiang PJUTS';

export default function MapPersebaranInfrastruktur({
    lamps,
    panels,
    networkCables,
    subdistricts = [],
    villages = [],
    streets = [],
    filters = { subdistrict: 'all', village: 'all', street: 'all' },
    zoom = 12,
    center = [0.556174, 123.058548],
    children,
    mapRef,
    showLegenda = true,
    showFilters = true,
    mapOnDialog = false,
    disableEmptyOverlay,
    className,
}: MapPersebaranInfrastrukturProps) {
    const [filterLampOrPanel, setFilterLampOrPanel] = useState<FilterType>('all');
    const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>(filters.subdistrict);
    const [selectedVillage, setSelectedVillage] = useState<string>(filters.village);
    const [selectedStreet, setSelectedStreet] = useState<string>(filters.street);
    const [isApplying, setIsApplying] = useState(false);
    const showResetFilterButton = useBoolean(false);
    const isOpenPopoverSubdistrict = useBoolean();
    const isOpenPopoverVillage = useBoolean();
    const isOpenPopoverStreet = useBoolean();

    const isRestrictedRoute = route().current('network-cable.create');

    useEffect(() => {
        setSelectedSubdistrict(filters.subdistrict);
        setSelectedVillage(filters.village);
        setSelectedStreet(filters.street);
    }, [filters]);

    const handleApplyFilter = () => {
        setIsApplying(true);
        setTimeout(() => {
            showResetFilterButton.setTrue();
        }, 500);

        router.get(
            window.location.pathname,
            {
                subdistrict: selectedSubdistrict,
                village: selectedVillage,
                street: selectedStreet,
            },
            {
                only: ['lamps', 'panels', 'networkCables', 'subdistricts', 'villages', 'streets'],
                preserveScroll: true,
                preserveState: true,
                preserveUrl: true,
                onFinish: () => {
                    setTimeout(() => setIsApplying(true), 100);
                },
                onSuccess: () => {
                    toast.success('Filter berhasil diterapkan.');
                },
            },
        );
    };

    const handleResetFilter = () => {
        setSelectedSubdistrict('all');
        setSelectedVillage('all');
        setSelectedStreet('all');
        setFilterLampOrPanel('all');
        setTimeout(() => {
            showResetFilterButton.setFalse();
        }, 500);

        router.get(
            window.location.pathname,
            {},
            {
                only: ['lamps', 'panels', 'networkCables', 'subdistricts', 'villages', 'streets'],
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Filter berhasil direset.');
                },
            },
        );
    };

    const handleSubdistrictChange = (subdistrictName: string) => {
        setSelectedSubdistrict(subdistrictName);
        setSelectedVillage('all');
        setSelectedStreet('all');
        isOpenPopoverSubdistrict.setFalse();

        router.reload({
            data: {
                subdistrict: subdistrictName,
                village: 'all',
                street: 'all',
            },
            only: ['villages', 'streets'],
            preserveUrl: true,
        });
    };

    const handleVillageChange = (villageName: string) => {
        setSelectedVillage(villageName);
        setSelectedStreet('all');
        isOpenPopoverVillage.setFalse();

        router.reload({
            data: {
                subdistrict: selectedSubdistrict,
                village: villageName,
                street: 'all',
            },
            only: ['streets'],
            preserveUrl: true,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!mapRef.current) return;

            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker && (layer as any)._isInfrastructureMarker) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            const addMarkers = (data: any[], type: 'lamp' | 'panel', iconKey: string) => {
                data.forEach((marker) => {
                    const lat = marker.latitude;
                    const lng = marker.longitude;
                    const position = L.latLng(lat, lng);
                    const PopupComponent = type === 'lamp' ? PopupLamp : PopupPanel;
                    const popupContent = ReactDOMServer.renderToString(<PopupComponent marker={marker} lat={lat} lng={lng} />);

                    if (mapRef.current) {
                        const newMarker = L.marker(position, {
                            icon: markerIcon(marker[iconKey]),
                            interactive: !isRestrictedRoute,
                        })
                            .addTo(mapRef.current)
                            .bindTooltip(marker.name, {
                                permanent: true,
                                direction: 'top',
                                offset: [0, type === 'lamp' ? -37 : -36],
                            });

                        if (!isRestrictedRoute) {
                            newMarker.bindPopup(popupContent);
                        }

                        (newMarker as any)._isInfrastructureMarker = true;
                        (newMarker as any)._markerType = type;
                    }
                });
            };

            if ((filterLampOrPanel === 'all' || filterLampOrPanel === 'lamps') && lamps?.length > 0) {
                addMarkers(lamps, 'lamp', 'type');
            }

            if (filterLampOrPanel === 'all' || filterLampOrPanel === 'Tiang PJUTS') {
                const lampsPJUTS = lamps.filter((lamp) => lamp.type === 'Tiang PJUTS');
                addMarkers(lampsPJUTS, 'lamp', 'type');
            }

            if ((filterLampOrPanel === 'all' || filterLampOrPanel === 'panels') && panels?.length > 0) {
                addMarkers(panels, 'panel', 'type_panel');
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [lamps, panels, filterLampOrPanel, mapRef, isRestrictedRoute]);

    const handleFullscreen = () => {
        if (mapRef.current) {
            const mapContainer = mapRef.current.getContainer();
            if (!document.fullscreenElement) {
                mapContainer.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const filterOptions = [
        { value: 'all', label: 'Semua Marker' },
        { value: 'lamps', label: 'Lampu Saja' },
        { value: 'panels', label: 'Panel Saja' },
        { value: 'Tiang PJUTS', label: 'Lampu Tenaga Surya' },
    ];

    useEffect(() => {
        if (!mapRef.current || !isApplying || !lamps.length) return;

        let filteredLamps = lamps;

        if (selectedStreet !== 'all') {
            filteredLamps = lamps.filter((l) => l.street?.name === selectedStreet);
        } else if (selectedVillage !== 'all') {
            filteredLamps = lamps.filter((l) => l.street?.village?.name === selectedVillage);
        } else if (selectedSubdistrict !== 'all') {
            filteredLamps = lamps.filter((l) => l.street?.village?.subdistrict?.name === selectedSubdistrict);
        }

        if (filteredLamps.length === 0) return;

        const bounds = L.latLngBounds(filteredLamps.map((l) => [l.latitude, l.longitude] as [number, number]));

        if (filteredLamps.length === 1) {
            mapRef.current.flyTo(bounds.getCenter(), 17, { animate: true, duration: 1.5 });
        } else {
            mapRef.current.fitBounds(bounds, { padding: [80, 80] });
        }

        const currentZoom = mapRef.current.getZoom();
        if (currentZoom > 17) {
            mapRef.current.setZoom(17);
        }

        setTimeout(() => setIsApplying(false), 1000);
    }, [isApplying, lamps]);

    const { url } = usePage();

    const hasFilter = url.includes('?');

    return (
        <div className="relative flex h-full w-full flex-1 flex-col">
            <div className="flex h-full flex-col space-y-4">
                {showFilters ? (
                    <div className="grid grid-cols-12 gap-x-3 rounded-lg bg-gray-100 px-3 py-3">
                        <div
                            className={cn(
                                'grid h-fit w-full items-center gap-4',
                                !mapOnDialog ? 'col-span-full lg:grid-cols-4 xl:col-span-9' : 'lg:col-span-12 lg:grid-cols-2',
                            )}
                        >
                            <Popover modal={true} open={isOpenPopoverSubdistrict.state} onOpenChange={isOpenPopoverSubdistrict.setState}>
                                <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                    <Button type="button" variant="outline" className="h-10 w-full justify-between">
                                        {selectedSubdistrict === 'all' ? 'Semua Kecamatan' : selectedSubdistrict}
                                        <ChevronDown className="size-3" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari kecamatan..." />
                                        <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                        <CommandList className="max-h-60 overflow-y-auto">
                                            <CommandItem onSelect={() => handleSubdistrictChange('all')} className="cursor-pointer">
                                                Semua Kecamatan
                                            </CommandItem>
                                            {subdistricts.map((sub) => (
                                                <CommandItem
                                                    key={sub.id}
                                                    onSelect={() => handleSubdistrictChange(sub.name)}
                                                    className="cursor-pointer"
                                                >
                                                    {sub.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <Popover modal={true} open={isOpenPopoverVillage.state} onOpenChange={isOpenPopoverVillage.setState}>
                                <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-10 w-full justify-between"
                                        disabled={selectedSubdistrict === 'all'}
                                    >
                                        {selectedVillage === 'all' ? 'Semua Kelurahan' : selectedVillage}
                                        <ChevronDown className="size-3" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari kecamatan..." />
                                        <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                        <CommandList className="max-h-60 overflow-y-auto">
                                            <CommandItem onSelect={() => handleVillageChange('all')} className="cursor-pointer">
                                                Semua Kelurahan
                                            </CommandItem>
                                            {villages.map((village) => (
                                                <CommandItem
                                                    key={village.id}
                                                    onSelect={() => handleVillageChange(village.name)}
                                                    className="cursor-pointer"
                                                >
                                                    {village.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <Popover modal={true} open={isOpenPopoverStreet.state} onOpenChange={isOpenPopoverStreet.setState}>
                                <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-10 w-full justify-between"
                                        disabled={selectedVillage === 'all'}
                                    >
                                        {selectedStreet === 'all' ? 'Semua Jalan' : selectedStreet}
                                        <ChevronDown className="size-3" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari kecamatan..." />
                                        <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                        <CommandList className="max-h-60 overflow-y-auto">
                                            <CommandItem onSelect={() => setSelectedStreet('all')} className="cursor-pointer">
                                                Semua Jalan
                                            </CommandItem>
                                            {streets.map((street) => (
                                                <CommandItem
                                                    key={street.id}
                                                    onSelect={() => {
                                                        setSelectedStreet(street.name);
                                                        isOpenPopoverStreet.setFalse();
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {street.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-10 w-full justify-start">
                                        <Filter size={14} />
                                        {filterOptions.find((option) => option.value === filterLampOrPanel)?.label}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-52">
                                    {filterOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => setFilterLampOrPanel(option.value as FilterType)}
                                            className="cursor-pointer"
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div
                            className={cn(
                                'col-span-3 flex h-fit justify-between gap-2 not-lg:mt-4',
                                !mapOnDialog ? 'col-span-full lg:grid-cols-4 xl:col-span-3' : 'lg:col-span-12 lg:grid-cols-2',
                            )}
                        >
                            <Button
                                type="button"
                                className="bg-card-gradient h-10 w-full"
                                onClick={handleApplyFilter}
                                disabled={isApplying || selectedSubdistrict === 'all'}
                            >
                                {isApplying ? 'Menerapkan...' : 'Terapkan Filter'}
                            </Button>
                            {showResetFilterButton.state || hasFilter ? (
                                <Button type="button" variant="outline" className="h-10 w-full" onClick={handleResetFilter} disabled={isApplying}>
                                    <X />
                                    Reset Filter
                                </Button>
                            ) : null}
                        </div>
                    </div>
                ) : null}

                <div className="col-span-12 h-full">
                    <div className="flex h-full w-full flex-col gap-3 xl:flex-row">
                        <div className={cn('relative flex-1', !mapOnDialog ? 'col-span-9' : 'col-span-full')}>
                            <div className="absolute top-3 right-3 z-[11] flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Button size="sm" type="button" variant="outline" onClick={handleFullscreen}>
                                        <Maximize size={16} />
                                    </Button>
                                </div>
                            </div>

                            <div className={cn('relative h-[30rem] overflow-hidden rounded-lg xl:h-full', className)}>
                                {!disableEmptyOverlay && lamps.length === 0 && !isApplying && (
                                    <div className="absolute inset-0 z-[11] flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
                                        <p className="text-center text-sm text-gray-200 md:text-base">
                                            💡 Tidak ada data yang ditampilkan.
                                            <br />
                                            Silakan pilih <strong>kecamatan</strong> terlebih dahulu untuk memuat data.
                                        </p>
                                    </div>
                                )}

                                <MapLeaflet mapRef={mapRef} zoom={zoom} center={center}>
                                    {networkCables.map((networkCable) => {
                                        const cableType = TypesCable.find((cable) => cable.value === networkCable.type_cable);

                                        return (
                                            <Polyline
                                                key={networkCable.id}
                                                positions={networkCable.polyline.map((coord) => [coord.lat, coord.lng])}
                                                pathOptions={{ color: cableType?.color, weight: 2 }}
                                            >
                                                <Popup>
                                                    <div>
                                                        <strong>{networkCable.name ?? 'Kabel'}</strong>
                                                        <br />
                                                        Panjang: {networkCable.length} meter
                                                    </div>
                                                </Popup>
                                            </Polyline>
                                        );
                                    })}
                                    {children}
                                </MapLeaflet>
                            </div>
                        </div>

                        {showLegenda ? (
                            <Card className="col-span-12 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Legenda</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {Object.entries(allMarkerIcons)
                                            .filter(([name]) => name !== 'default')
                                            .map(([name, icon]) => (
                                                <li key={name} className="flex items-center gap-2">
                                                    <img src={(icon.options.iconUrl as string) ?? ''} alt={name} className="size-7" />
                                                    <span className="text-sm">{name}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
