'use client';

import SummaryTotalItem from '@/components/custom/summary-total-item';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import DataMasterLayout from '@/layouts/data-master/layout';
import { Street, Subdistrict, Totals } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';

interface PagesProps {
    subdistrict: Subdistrict;
    subdistricts: Subdistrict[];
    totals: Totals;
}

export default function ShowKecamatan({ subdistrict, subdistricts, totals }: PagesProps) {
    const villages = subdistrict.villages || [];
    // let streets: Street[] = [];
    // console.log('Street awal:', streets);

    const { data, setData, errors } = useForm({
        street_id: '',
        village_id: '',
    });

    const streets = useMemo(() => {
        const selectedVillage = villages.find((village) => village.id === data.village_id);
        return selectedVillage?.streets || [];
    }, [data.village_id, villages]);

    const isOpenPopoverKelurahan = useBoolean(false);
    const isOpenPopoverJalan = useBoolean(false);

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    <div className="space-y-4">
                        <div className="bg-card rounded-xl p-4 shadow-sm">
                            <h1 className="text-primary text-center text-2xl font-semibold tracking-tight">Data di Kecamatan {subdistrict.name}</h1>
                        </div>
                        <div className="">
                            <form className="flex gap-4">
                                <div className="grid w-full max-w-xs gap-2">
                                    <Label>Kelurahan</Label>
                                    <Popover open={isOpenPopoverKelurahan.state} onOpenChange={isOpenPopoverKelurahan.setState}>
                                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                            <Button type="button" variant="outline" className="w-full justify-between">
                                                {data.village_id
                                                    ? villages.find((village) => village.id === data.village_id)?.name
                                                    : 'Pilih Kelurahan'}
                                                <ChevronDown className="size-3" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari kecamatan..." />
                                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                                <CommandList className="max-h-60 overflow-y-auto">
                                                    {villages?.map((village) => (
                                                        <CommandItem
                                                            key={village.id}
                                                            onSelect={() => {
                                                                setData('village_id', String(village.id));
                                                                setData('street_id', '');
                                                                isOpenPopoverKelurahan.setFalse();
                                                            }}
                                                        >
                                                            {village.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <InputError message={errors.street_id} />
                                </div>
                                {data.village_id && (
                                    <div className="grid w-full max-w-xs gap-2">
                                        <Label>Kelurahan</Label>
                                        <Popover open={isOpenPopoverJalan.state} onOpenChange={isOpenPopoverJalan.setState}>
                                            <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                                <Button type="button" variant="outline" className="w-full justify-between">
                                                    {data.street_id
                                                        ? villages
                                                              .find((village) => village.id === data.village_id)
                                                              ?.streets.find((street) => street.id === data.street_id)?.name
                                                        : 'Pilih Jalan'}
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
                                                                {street.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.street_id} />
                                    </div>
                                )}
                            </form>
                        </div>
                        <SummaryTotalItem totals={totals} className="mt-6" initialState={true} />
                    </div>
                    {/* <DataTable columns={columns} data={subdistricts}>
                        <CreateKecamatan />
                    </DataTable> */}
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
