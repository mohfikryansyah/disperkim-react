import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getLampIconUrl, StatusLamp, TypesLamp } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { Panel, Subdistrict } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

export default function APJExportPDF({ subdistricts, panels, titleForButton }: { subdistricts: Subdistrict[]; panels: Panel[]; titleForButton?: string }) {
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

    const [searchStreet, setSearchStreet] = useState('');
    const [searchVillage, setSearchVillage] = useState('');
    const [searchPanel, setSearchPanel] = useState('');

    const updateData = useCallback((key: string, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    }, []);

    const matchSubdistricts = useMemo(
        () => subdistricts.find((sub) => sub.id === data.selectedSubdistrict),
        [subdistricts, data.selectedSubdistrict],
    );

    const matchVillages = useMemo(() => (matchSubdistricts ? matchSubdistricts.villages || [] : []), [matchSubdistricts]);

    const matchStreets = useMemo(
        () => (data.selectedVillage ? matchVillages.find((village) => village.id === data.selectedVillage)?.streets || [] : []),
        [matchVillages, data.selectedVillage],
    );

    const filteredVillages = useMemo(() => {
        if (!searchVillage) return matchVillages.slice(0, 100);

        const search = searchVillage.toLowerCase();
        return matchVillages.filter((v) => v.name.toLowerCase().includes(search)).slice(0, 100);
    }, [matchVillages, searchVillage]);

    const filteredStreets = useMemo(() => {
        if (!searchStreet) return matchStreets.slice(0, 50);

        const search = searchStreet.toLowerCase();
        return matchStreets.filter((s) => s.name.toLowerCase().includes(search)).slice(0, 100);
    }, [matchStreets, searchStreet]);

    const filteredPanels = useMemo(() => {
        if (!panels?.length) return [];

        let filtered = panels.filter((panel) => {
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

        if (searchPanel) {
            const search = searchPanel.toLowerCase();
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));
        }

        return filtered.slice(0, 100);
    }, [panels, data, searchPanel]);

    const selectedSubdistrictName = useMemo(
        () => (data.selectedSubdistrict ? subdistricts.find((sub) => sub.id === data.selectedSubdistrict)?.name : null),
        [data.selectedSubdistrict, subdistricts],
    );

    const selectedVillageName = useMemo(
        () => (data.selectedVillage ? matchVillages.find((village) => village.id === data.selectedVillage)?.name : null),
        [data.selectedVillage, matchVillages],
    );

    const selectedStreetName = useMemo(
        () => (data.selectedStreet ? matchStreets.find((street) => street.id === data.selectedStreet)?.name : null),
        [data.selectedStreet, matchStreets],
    );

    const selectedPanelName = useMemo(
        () => (data.selectedPanel ? panels.find((panel) => panel.id === data.selectedPanel)?.name : null),
        [data.selectedPanel, panels],
    );

    const handleExportPDF = () => {
        exportPDFisProccessing.setTrue()

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

        setTimeout(() => {
            exportPDFisProccessing.setFalse()
        }, 3000)
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
                    {exportPDFisProccessing.state ? 'Membuat PDF...' : titleForButton ? titleForButton : 'Export PDF'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Export Data LPJU</DialogTitle>
                    <DialogDescription>Anda dapat melakukan filter data sebelum export.</DialogDescription>
                </DialogHeader>

                <div className="grid w-full gap-2">
                    <Label>Kecamatan</Label>
                    <Popover modal={true} open={isOpenPopoverSubdistrict.state} onOpenChange={isOpenPopoverSubdistrict.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="h-10 w-full justify-between">
                                {data.selectedSubdistrict === '' ? 'Semua Kecamatan' : selectedSubdistrictName || 'Tidak diketahui'}
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
                    <Popover
                        modal={true}
                        open={isOpenPopoverVillage.state}
                        onOpenChange={(open) => {
                            isOpenPopoverVillage.setState(open);
                            if (!open) setSearchVillage('');
                        }}
                    >
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 w-full justify-between"
                                disabled={data.selectedSubdistrict === ''}
                            >
                                {data.selectedVillage === '' ? 'Semua Kelurahan' : selectedVillageName || 'Tidak diketahui'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari kelurahan..." value={searchVillage} onValueChange={setSearchVillage} />
                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandItem
                                        onSelect={() => {
                                            updateData('selectedVillage', '');
                                            updateData('selectedStreet', '');
                                            setSearchVillage('');
                                            isOpenPopoverVillage.setFalse();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Semua Kelurahan
                                    </CommandItem>
                                    {filteredVillages.map((village) => (
                                        <CommandItem
                                            key={village.id}
                                            onSelect={() => {
                                                updateData('selectedVillage', village.id);
                                                updateData('selectedStreet', '');
                                                setSearchVillage('');
                                                isOpenPopoverVillage.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {village.name}
                                        </CommandItem>
                                    ))}
                                    {!searchVillage && matchVillages.length > 100 && (
                                        <div className="text-muted-foreground px-2 py-1.5 text-center text-xs">
                                            Menampilkan 100 dari {matchVillages.length} kelurahan. Gunakan pencarian untuk hasil lebih spesifik.
                                        </div>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid w-full gap-2">
                    <Label>Jalan</Label>
                    <Popover
                        modal={true}
                        open={isOpenPopoverStreet.state}
                        onOpenChange={(open) => {
                            isOpenPopoverStreet.setState(open);
                            if (!open) setSearchStreet('');
                        }}
                    >
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="h-10 w-full justify-between" disabled={data.selectedVillage === ''}>
                                {data.selectedStreet === '' ? 'Semua Jalan' : selectedStreetName || 'Tidak diketahui'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command shouldFilter={false}>
                                <CommandInput placeholder="Ketik untuk mencari jalan..." value={searchStreet} onValueChange={setSearchStreet} />
                                <CommandEmpty>{searchStreet ? 'Tidak ada jalan yang ditemukan.' : 'Ketik untuk mencari jalan...'}</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {!searchStreet && (
                                        <CommandItem
                                            onSelect={() => {
                                                updateData('selectedStreet', '');
                                                setSearchStreet('');
                                                isOpenPopoverStreet.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            Semua Jalan
                                        </CommandItem>
                                    )}
                                    {filteredStreets.map((street) => (
                                        <CommandItem
                                            key={street.id}
                                            onSelect={() => {
                                                updateData('selectedStreet', street.id);
                                                setSearchStreet('');
                                                isOpenPopoverStreet.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {street.name}
                                        </CommandItem>
                                    ))}
                                    {matchStreets.length > 50 && (
                                        <div className="text-muted-foreground border-t px-2 py-1.5 text-center text-xs">
                                            {searchStreet
                                                ? `Menampilkan ${filteredStreets.length} hasil dari ${matchStreets.length} jalan`
                                                : `Menampilkan 50 dari ${matchStreets.length} jalan. Gunakan pencarian untuk menemukan jalan spesifik.`}
                                        </div>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Tipe Lampu */}
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
                                            className="flex cursor-pointer items-center gap-2"
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

                {/* Status Lampu */}
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
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <span>{statusLamp.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Panel */}
                <div className="grid w-full gap-2">
                    <Label>Berdasarkan Panel</Label>
                    <Popover
                        modal={true}
                        open={isOpenPopoverPanel.state}
                        onOpenChange={(open) => {
                            isOpenPopoverPanel.setState(open);
                            if (!open) setSearchPanel('');
                        }}
                    >
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                {data.selectedPanel ? selectedPanelName : 'Pilih Panel'}
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command shouldFilter={false}>
                                <CommandInput placeholder="Cari Panel..." value={searchPanel} onValueChange={setSearchPanel} />
                                <CommandEmpty>Tidak ada panel yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    {filteredPanels.map((panel) => (
                                        <CommandItem
                                            key={panel.id}
                                            onSelect={() => {
                                                updateData('selectedPanel', panel.id);
                                                setSearchPanel('');
                                                isOpenPopoverPanel.setFalse();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {panel.name}
                                        </CommandItem>
                                    ))}
                                    {filteredPanels.length >= 100 && (
                                        <div className="text-muted-foreground border-t px-2 py-1.5 text-center text-xs">
                                            Menampilkan 100 hasil pertama. Gunakan filter lokasi atau pencarian untuk hasil lebih spesifik.
                                        </div>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <DialogFooter>
                    <Button
                        variant={'outline'}
                        className="w-full bg-gradient-to-r from-white to-red-400 xl:w-fit"
                        onClick={handleExportPDF}
                        disabled={exportPDFisProccessing.state}
                    >
                        <img src={'/images/pdf-icon.svg'} className="size-5" alt="PDF Icon" />
                        {exportPDFisProccessing.state ? 'Membuat PDF...' : 'Buat PDF'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
