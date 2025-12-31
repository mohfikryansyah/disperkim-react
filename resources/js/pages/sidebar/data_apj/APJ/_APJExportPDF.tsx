import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getLampIconUrl, StatusLamp, TypesLamp } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem, Panel, Subdistrict } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function APJExportPDF({ subdistricts, panels }: { subdistricts: Subdistrict[]; panels: Panel[] }) {
    const exportPDFisProccessing = useBoolean(false);
    const isOpenPopoverSubdistrict = useBoolean();
    const isOpenPopoverVillage = useBoolean();
    const isOpenPopoverStreet = useBoolean();
    const isOpenDialogExport = useBoolean();
    const isOpenPopoverLampu = useBoolean();
    const isOpenPopoverStatusLampu = useBoolean();
    const isOpenPopoverPanel = useBoolean();

    const [data, setData] = useState({
        selectedSubdistrict: '',
        selectedVillage: '',
        selectedStreet: '',
        selectedPanel: '',
        selectedType: '',
        selectedListrikPLN: '',
        selectedStatus: '',
    });

    const updateData = (key: string, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const matchSubdistricts = subdistricts.find((sub) => sub.id === data.selectedSubdistrict);
    const matchVillages = matchSubdistricts ? matchSubdistricts.villages || [] : [];
    const matchStreets = data.selectedVillage ? matchVillages.find((village) => village.id === data.selectedVillage)?.streets || [] : [];

    const filteredPanels = useMemo(() => {
        if (!panels?.length) return [];

        return panels.filter((panel) => {
            const subdistrictId = panel.street.village.subdistrict_id;
            const villageId = panel.street.village_id;
            const streetId = panel.street_id;

            if (data.selectedSubdistrict && data.selectedVillage && data.selectedStreet) {
                return subdistrictId === data.selectedSubdistrict && villageId === data.selectedVillage && streetId === data.selectedStreet;
            }

            if (data.selectedSubdistrict && data.selectedVillage) {
                return subdistrictId === data.selectedSubdistrict && villageId === data.selectedVillage;
            }

            if (data.selectedSubdistrict) {
                return subdistrictId === data.selectedSubdistrict;
            }

            if (data.selectedVillage) {
                return villageId === data.selectedVillage;
            }

            if (data.selectedStreet) {
                return streetId === data.selectedStreet;
            }

            return true;
        });
    }, [panels, data]);

    const handleExportPDF = () => {
        window.open(
            route('export.apj-pdf', {
                subdistrict: data.selectedSubdistrict,
                village: data.selectedVillage,
                street: data.selectedStreet,
                type: data.selectedType,
                listrik_pln: data.selectedListrikPLN,
                status: data.selectedStatus,
                panel: data.selectedPanel,
            }),
            '_blank',
        );
    };

    return (
        <Dialog open={isOpenDialogExport.state} onOpenChange={isOpenDialogExport.setState}>
            <DialogTrigger asChild>
                <Button
                    variant={'outline'}
                    className="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                    disabled={exportPDFisProccessing.state}
                >
                    <img src={'/images/pdf-icon.svg'} className="size-5" alt="PDF Icon" />
                    {exportPDFisProccessing.state ? 'Membuat PDF...' : 'Ekspor PDF'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter Data LPJU</DialogTitle>
                    <DialogDescription>Terapkan salah satu filter sebelum mengekspor ke PDF.</DialogDescription>
                </DialogHeader>
                <div className="grid w-full gap-2">
                    <Label>Kecamatan</Label>
                    <Popover modal={true} open={isOpenPopoverSubdistrict.state} onOpenChange={isOpenPopoverSubdistrict.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="h-10 w-full justify-between">
                                {data.selectedSubdistrict === ''
                                    ? 'Semua Kecamatan'
                                    : subdistricts.find((sub) => sub.id === data.selectedSubdistrict)?.name || 'Tidak diketahui'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari kecamatan..." />
                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandItem
                                        onSelect={() => {
                                            updateData('selectedSubdistrict', '');
                                            updateData('selectedVillage', '');
                                            updateData('selectedStreet', '');
                                            updateData('selectedPanel', '');
                                            isOpenPopoverSubdistrict.setFalse();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Semua Kecamatan
                                    </CommandItem>
                                    {subdistricts.map((sub) => (
                                        <CommandItem
                                            key={sub.id}
                                            onSelect={() => {
                                                updateData('selectedSubdistrict', sub.id);
                                                updateData('selectedVillage', '');
                                                updateData('selectedStreet', '');
                                                updateData('selectedPanel', '');
                                                isOpenPopoverSubdistrict.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {sub.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid w-full gap-2">
                    <Label>Kelurahan</Label>
                    <Popover modal={true} open={isOpenPopoverVillage.state} onOpenChange={isOpenPopoverVillage.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 w-full justify-between"
                                disabled={data.selectedSubdistrict === ''}
                            >
                                {data.selectedVillage === ''
                                    ? 'Semua Kelurahan'
                                    : matchVillages.find((village) => village.id === data.selectedVillage)?.name || 'Tidak diketahui'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari kelurahan..." />
                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandItem
                                        onSelect={() => {
                                            updateData('selectedVillage', '');
                                            updateData('selectedStreet', '');
                                            isOpenPopoverVillage.setFalse();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Semua Kelurahan
                                    </CommandItem>
                                    {matchVillages.map((village) => (
                                        <CommandItem
                                            key={village.id}
                                            onSelect={() => {
                                                updateData('selectedVillage', village.id);
                                                updateData('selectedStreet', '');
                                                isOpenPopoverVillage.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {village.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid w-full gap-2">
                    <Label>Jalan</Label>
                    <Popover modal={true} open={isOpenPopoverStreet.state} onOpenChange={isOpenPopoverStreet.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="h-10 w-full justify-between" disabled={data.selectedVillage === ''}>
                                {data.selectedStreet === ''
                                    ? 'Semua Jalan'
                                    : matchStreets.find((street) => street.id === data.selectedStreet)?.name || 'Tidak diketahui'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari Jalan..." />
                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandItem
                                        onSelect={() => {
                                            updateData('selectedStreet', '');
                                            isOpenPopoverStreet.setFalse();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Semua Jalan
                                    </CommandItem>
                                    {matchStreets.map((street) => (
                                        <CommandItem
                                            key={street.id}
                                            onSelect={() => {
                                                updateData('selectedStreet', street.id);
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
                </div>

                <div className="grid gap-2">
                    <Label>Tipe Lampu</Label>
                    <Popover modal={true} open={isOpenPopoverLampu.state} onOpenChange={isOpenPopoverLampu.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                <div className="flex items-center gap-2">
                                    {data.selectedType && <img src={getLampIconUrl(data.selectedType)} alt={data.selectedType} className="h-5 w-5" />}
                                    {data.selectedType ? data.selectedType : 'Pilih Tipe Lampu'}
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
                                                updateData('selectedType', typeLamp.value);
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
                </div>

                <div className="grid gap-2">
                    <Label>Status Lampu</Label>
                    <Popover modal={true} open={isOpenPopoverStatusLampu.state} onOpenChange={isOpenPopoverStatusLampu.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                {data.selectedStatus ? data.selectedStatus : 'Pilih Status Lampu'}
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
                                                updateData('selectedStatus', statusLamp.value);
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
                </div>

                <div className="grid w-full gap-2">
                    <Label>Berdasarkan Panel</Label>
                    <Popover modal={true} open={isOpenPopoverPanel.state} onOpenChange={isOpenPopoverPanel.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                {data.selectedPanel ? panels.find((panel) => panel.id === data.selectedPanel)?.name : 'Pilih Panel'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari Panel..." />
                                <CommandEmpty>Tidak ada panel yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {filteredPanels?.map((panel) => (
                                        <CommandItem
                                            key={panel.id}
                                            onSelect={() => {
                                                updateData('selectedPanel', panel.id);
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
                </div>

                <DialogFooter>
                    <Button type="button" onClick={handleExportPDF} disabled={exportPDFisProccessing.state}>
                        Export
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
