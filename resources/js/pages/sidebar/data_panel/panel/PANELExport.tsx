import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getLampIconUrl, TypesPanel } from '@/helpers';
import useBoolean from '@/hooks/use-boolean';
import { Panel, Subdistrict } from '@/types';
import { ChevronDown } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

interface PanelProps {
    subdistricts: Subdistrict[];
    panels?: Panel[];
    titleForButton?: string;
    routeName: string;
    buttonIcon?: string;
    buttonClassName?: string;
    processingText?: string;
}

export default function PANELExport({ subdistricts, panels, titleForButton, routeName, buttonIcon, buttonClassName, processingText }: PanelProps) {
    const exportIsProccessing = useBoolean(false);
    const isOpenPopoverSubdistrict = useBoolean();
    const isOpenPopoverVillage = useBoolean();
    const isOpenPopoverStreet = useBoolean();
    const isOpenDialogExport = useBoolean();
    const isOpenPopoverTipePanel = useBoolean();
    const isOpenPopoverStatusLampu = useBoolean();
    const isOpenPopoverPanel = useBoolean();

    const [data, setData] = useState({
        selectedSubdistrict: '',
        selectedVillage: '',
        selectedStreet: '',
        selectedTypePanel: '',
        selectedPower: '',
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

    const handleExport = () => {
        window.open(
            route(routeName, {
                subdistrict: data.selectedSubdistrict,
                village: data.selectedVillage,
                street: data.selectedStreet,
                type_panel: data.selectedTypePanel,
                power: data.selectedPower,
            }),
            '_blank',
        );
    };

    return (
        <Dialog open={isOpenDialogExport.state} onOpenChange={isOpenDialogExport.setState}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className={buttonClassName} disabled={exportIsProccessing.state}>
                    <img src={buttonIcon} className="size-5" alt="Button Icon" />
                    {exportIsProccessing.state ? processingText : titleForButton ? titleForButton : 'Export PDF'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Export Data Panel</DialogTitle>
                    <DialogDescription>Anda dapat melakukan filter data sebelum export.</DialogDescription>
                </DialogHeader>

                {/* Kecamatan */}
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

                {/* Kelurahan */}
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

                {/* Jalan - OPTIMIZED for 3000 items */}
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

                <div className="grid gap-2">
                    <Label>Tipe Panel</Label>
                    <Popover modal={true} open={isOpenPopoverTipePanel.state} onOpenChange={isOpenPopoverTipePanel.setState}>
                        <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                            <Button type="button" variant="outline" className="w-full justify-between">
                                <div className="flex items-center gap-2">
                                    {data.selectedTypePanel && (
                                        <img src={getLampIconUrl(data.selectedTypePanel)} alt={data.selectedTypePanel} className="h-5 w-5" />
                                    )}
                                    {data.selectedTypePanel === '' ? 'Semua Panel' : data.selectedTypePanel || 'Pilih Tipe Lampu'}
                                </div>
                                <ChevronDown className="size-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content p-0">
                            <Command>
                                <CommandInput placeholder="Cari tipe lampu..." />
                                <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                <CommandList className="max-h-60 overflow-y-auto">
                                    <CommandItem
                                        onSelect={() => {
                                            updateData('selectedTypePanel', '');
                                            isOpenPopoverTipePanel.setFalse();
                                        }}
                                        className="cursor-pointer"
                                    >
                                        Semua Panel
                                    </CommandItem>
                                    {TypesPanel.map((typePanel) => (
                                        <CommandItem
                                            key={typePanel.value}
                                            onSelect={() => {
                                                updateData('selectedTypePanel', typePanel.value);
                                                isOpenPopoverTipePanel.setFalse();
                                            }}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <img src={getLampIconUrl(typePanel.value)} alt={typePanel.label} className="h-5 w-5" />
                                            <span>{typePanel.label}</span>
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <DialogFooter>
                    <Button type="button" onClick={handleExport} disabled={exportIsProccessing.state}>
                        Export
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
