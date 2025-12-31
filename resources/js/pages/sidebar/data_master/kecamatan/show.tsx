'use client';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import { cn, strLimit } from '@/lib/utils';
import { BreadcrumbItem, Subdistrict, Totals, Village } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown, Filter, Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface PagesProps {
    subdistrict: Subdistrict;
    subdistricts: Subdistrict[];
    villages: Village[];
    filters: {
        village_id: string;
        street_id: string;
    };
    totals: Totals;
    allVillages: Village[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kecamatan',
        href: route('subdistricts.index'),
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function ShowKecamatan({ subdistrict, subdistricts, totals, villages, filters, allVillages }: PagesProps) {
    const { data, setData, errors } = useForm({
        street_id: filters.street_id || '',
        village_id: filters.village_id || '',
    });

    const streets = useMemo(() => {
        const selectedVillage = allVillages.find((village) => village.id === data.village_id);
        return selectedVillage?.streets || [];
    }, [data.village_id, allVillages]);

    const isOpenPopoverKelurahan = useBoolean(false);
    const isOpenPopoverJalan = useBoolean(false);

    const tableRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreen = () => {
        const elem = tableRef.current;
        if (!document.fullscreenElement && elem) {
            elem.requestFullscreen().then(() => setIsFullscreen(true));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };

    useEffect(() => {
        const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Detail'/>
            <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">
                {/* <div className="space-y-4">
                    <div className="bg-card rounded-xl border border-gray-300 p-4 shadow-md">
                        <h1 className="text-primary text-center text-2xl font-semibold tracking-tight">Data di Kecamatan {subdistrict.name}</h1>
                    </div>
                    <SummaryTotalItem totals={totals} className="mt-6" initialState={true} />
                </div> */}
                <Card className="hover:border-primary/30 border border-black/[0.1]">
                    <CardContent>
                        <h1 className="text-primary text-center text-2xl font-semibold tracking-tight">Data di Kecamatan {subdistrict.name}</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <form method="GET" className="flex flex-wrap items-end gap-4">
                            <input type="hidden" name="village_id" value={data.village_id} />
                            <input type="hidden" name="street_id" value={data.street_id} />

                            <div className="grid w-full max-w-xs gap-2">
                                <Label className="text-sm font-medium text-gray-700">Kelurahan</Label>
                                <Popover open={isOpenPopoverKelurahan.state} onOpenChange={isOpenPopoverKelurahan.setState}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full justify-between rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        >
                                            {data.village_id ? allVillages.find((v) => v.id === data.village_id)?.name : 'Pilih Kelurahan'}
                                            <ChevronDown className="size-4 text-gray-500" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content w-[250px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari kelurahan..." />
                                            <CommandEmpty>Tidak ada data ditemukan.</CommandEmpty>
                                            <CommandList className="max-h-60 overflow-y-auto">
                                                {allVillages.map((village) => (
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
                                <InputError message={errors.village_id} />
                            </div>

                            {data.village_id && (
                                <div className="grid w-full max-w-xs gap-2">
                                    <Label className="text-sm font-medium text-gray-700">Jalan</Label>
                                    <Popover open={isOpenPopoverJalan.state} onOpenChange={isOpenPopoverJalan.setState}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full justify-between rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                            >
                                                {data.street_id ? streets.find((s) => s.id === data.street_id)?.name : 'Pilih Jalan'}
                                                <ChevronDown className="size-4 text-gray-500" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="popover-content w-[250px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari jalan..." />
                                                <CommandEmpty>Tidak ada data ditemukan.</CommandEmpty>
                                                <CommandList className="max-h-60 overflow-y-auto">
                                                    {streets.map((street) => (
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

                            <div className="mt-auto flex items-center gap-2">
                                <Button
                                    type="submit"
                                    className="bg-primary rounded-lg text-white shadow-sm transition-all duration-200 hover:bg-[#146c6d]"
                                >
                                    <Filter className="mr-2 size-4" />
                                    Terapkan
                                </Button>

                                {(data.village_id || data.street_id) && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-lg border-gray-300 text-gray-700 transition-all duration-200 hover:bg-gray-50"
                                        onClick={() => {
                                            setData('village_id', '');
                                            setData('street_id', '');
                                            router.get(route('subdistricts.show', subdistrict.id), {
                                                preserveState: true,
                                                replace: true,
                                                preserveScroll: true,
                                            });
                                        }}
                                    >
                                        <RotateCcw className="mr-2 size-4" />
                                        Reset
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-12">
                    <Card ref={tableRef} className="relative col-span-12">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg font-semibold">Tabel Data LPJU</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="rounded-full border-gray-300 hover:bg-gray-100"
                                onClick={handleFullscreen}
                                title={isFullscreen ? 'Keluar Fullscreen' : 'Tampilkan Fullscreen'}
                            >
                                {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full">
                                <TableHeader className="bg-primary text-white">
                                    <TableRow>
                                        <TableHead
                                            rowSpan={4}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            NO
                                        </TableHead>
                                        <TableHead
                                            rowSpan={4}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            LOKASI
                                        </TableHead>
                                        <TableHead
                                            rowSpan={4}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>PANJANG JALAN</span>
                                                <span className="text-xs font-normal text-gray-400">(METER)</span>
                                            </div>
                                        </TableHead>

                                        <TableHead
                                            colSpan={5}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            LAMPU PENERANGAN (UNIT)
                                        </TableHead>
                                        <TableHead
                                            colSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            KABEL JARINGAN LPJU (METER)
                                        </TableHead>
                                        <TableHead
                                            colSpan={5}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            ALAT PEMBATAS DAN PENGUKUR (APP) / KWH METER PLN (UNIT)
                                        </TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>YANG</span>
                                                <span>DIBUTUHKAN</span>
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            colSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            TERPASANG
                                        </TableHead>
                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>BELUM</span>
                                                <span>TERPASANG</span>
                                            </div>
                                        </TableHead>

                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>YANG</span>
                                                <span>DIBUTUHKAN</span>
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            TERPASANG
                                        </TableHead>
                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>BELUM</span>
                                                <span>TERPASANG</span>
                                            </div>
                                        </TableHead>

                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>YANG</span>
                                                <span>DIBUTUHKAN</span>
                                            </div>
                                        </TableHead>
                                        <TableHead
                                            colSpan={2}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            TERPASANG
                                        </TableHead>
                                        <TableHead
                                            rowSpan={3}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>BELUM</span>
                                                <span>TERPASANG</span>
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead
                                            colSpan={2}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            LISTRIK PLN
                                        </TableHead>
                                        <TableHead
                                            rowSpan={2}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            <div className="flex flex-col leading-tight">
                                                <span>TENAGA SURYA</span>
                                                <span className="text-xs font-normal text-gray-400">(MANDIRI)</span>
                                            </div>
                                        </TableHead>

                                        <TableHead
                                            rowSpan={2}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            PRA BAYAR
                                        </TableHead>
                                        <TableHead
                                            rowSpan={2}
                                            className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white"
                                        >
                                            PASCA BAYAR
                                        </TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white">
                                            NON APP
                                        </TableHead>
                                        <TableHead className="odd:bg-primary even:bg-primary hover:bg-primary border border-gray-300 px-2 py-1 text-center text-white">
                                            VIA APP
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className="text-gray-800">
                                    {villages.map((village, idx) => {
                                        const subtotal = village.streets.reduce(
                                            (acc, street) => {
                                                const item = street.required_item;
                                                const totalLampuBelum =
                                                    item.required_lamps -
                                                    (item.installed_lamps_non_app + item.installed_lamps_via_app + item.installed_lamps_mandiri);
                                                const totalKabelBelum = item.required_cable_length - item.installed_cable_length;
                                                const totalPanelBelum =
                                                    item.required_panels - (item.installed_panels_prabayar + item.installed_panels_pascabayar);

                                                return {
                                                    panjang: acc.panjang + item.street_length,
                                                    lampu_dibutuhkan: acc.lampu_dibutuhkan + item.required_lamps,
                                                    lampu_nonapp: acc.lampu_nonapp + item.installed_lamps_non_app,
                                                    lampu_app: acc.lampu_app + item.installed_lamps_via_app,
                                                    lampu_mandiri: acc.lampu_mandiri + item.installed_lamps_mandiri,
                                                    lampu_belum: acc.lampu_belum + totalLampuBelum,
                                                    kabel_dibutuhkan: acc.kabel_dibutuhkan + item.required_cable_length,
                                                    kabel_terpasang: acc.kabel_terpasang + item.installed_cable_length,
                                                    kabel_belum: acc.kabel_belum + totalKabelBelum,
                                                    panel_dibutuhkan: acc.panel_dibutuhkan + item.required_panels,
                                                    panel_prabayar: acc.panel_prabayar + item.installed_panels_prabayar,
                                                    panel_pascabayar: acc.panel_pascabayar + item.installed_panels_pascabayar,
                                                    panel_belum: acc.panel_belum + totalPanelBelum,
                                                };
                                            },
                                            {
                                                panjang: 0,
                                                lampu_dibutuhkan: 0,
                                                lampu_nonapp: 0,
                                                lampu_app: 0,
                                                lampu_mandiri: 0,
                                                lampu_belum: 0,
                                                kabel_dibutuhkan: 0,
                                                kabel_terpasang: 0,
                                                kabel_belum: 0,
                                                panel_dibutuhkan: 0,
                                                panel_prabayar: 0,
                                                panel_pascabayar: 0,
                                                panel_belum: 0,
                                            },
                                        );

                                        // Fungsi bantu untuk hitung persentase
                                        const pct = (terpasang: number, dibutuhkan: number) =>
                                            dibutuhkan > 0 ? ((terpasang / dibutuhkan) * 100).toFixed(2) + '%' : '0%';

                                        const getProgressColor = (value: number) => {
                                            if (value >= 80) return 'bg-green-500';
                                            if (value >= 50) return 'bg-yellow-400';
                                            return 'bg-red-500';
                                        };

                                        const getTextColor = (value: number) => {
                                            if (value >= 80) return 'text-green-600';
                                            if (value >= 50) return 'text-yellow-600';
                                            return 'text-red-600';
                                        };

                                        const calcPct = (terpasang: number, dibutuhkan: number) => {
                                            return dibutuhkan > 0 ? (terpasang / dibutuhkan) * 100 : 0;
                                        };

                                        return (
                                            <>
                                                <TableRow>
                                                    <TableCell
                                                        rowSpan={village.streets.length + 3}
                                                        className="border border-gray-300 px-2 py-1 text-center align-top"
                                                    >
                                                        {idx + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        colSpan={15}
                                                        className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold"
                                                    >
                                                        Kelurahan {village.name}
                                                    </TableCell>
                                                </TableRow>

                                                {village.streets.map((street) => {
                                                    const totalLampuBelumTerpasang =
                                                        street.required_item.required_lamps -
                                                        (street.required_item.installed_lamps_via_app +
                                                            street.required_item.installed_lamps_mandiri +
                                                            street.required_item.installed_lamps_non_app);
                                                    const panjangKabelBelum =
                                                        street.required_item.required_cable_length - street.required_item.installed_cable_length;
                                                    const panelBelumTerpasang =
                                                        street.required_item.required_panels -
                                                        (street.required_item.installed_panels_pascabayar +
                                                            street.required_item.installed_panels_prabayar);

                                                    return (
                                                        <TableRow key={street.id} className="transition even:bg-gray-50 hover:bg-yellow-50">
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-nowrap">
                                                                {strLimit(street.name, 50)}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.street_length}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.required_lamps}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_lamps_non_app}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_lamps_via_app}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_lamps_mandiri}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {totalLampuBelumTerpasang}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.required_cable_length}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_cable_length}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {panjangKabelBelum}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.required_panels}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_panels_prabayar}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {street.required_item.installed_panels_pascabayar}
                                                            </TableCell>
                                                            <TableCell className="border border-gray-300 px-2 py-1 text-center">
                                                                {panelBelumTerpasang}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}

                                                <TableRow className="bg-gray-100 font-semibold">
                                                    <TableCell colSpan={1} className="border border-gray-300 px-3 py-2 text-right">
                                                        Subtotal {idx + 1}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">{subtotal.panjang}</TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.lampu_dibutuhkan}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.lampu_nonapp}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.lampu_app}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.lampu_mandiri}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.lampu_belum}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.kabel_dibutuhkan}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.kabel_terpasang}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.kabel_belum}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.panel_dibutuhkan}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.panel_prabayar}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.panel_pascabayar}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center">
                                                        {subtotal.panel_belum}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow className="bg-gray-50 font-semibold">
                                                    <TableCell colSpan={1} className="border border-gray-300 px-3 py-2 text-right">
                                                        Presentase
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center text-gray-500">-</TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center text-gray-500">-</TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.lampu_nonapp, subtotal.lampu_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.lampu_nonapp, subtotal.lampu_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.lampu_app, subtotal.lampu_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.lampu_app, subtotal.lampu_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.lampu_mandiri, subtotal.lampu_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.lampu_mandiri, subtotal.lampu_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.lampu_belum, subtotal.lampu_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.lampu_belum, subtotal.lampu_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center text-gray-500">-</TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.kabel_terpasang, subtotal.kabel_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.kabel_terpasang, subtotal.kabel_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.kabel_belum, subtotal.kabel_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.kabel_belum, subtotal.kabel_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell className="border border-gray-300 px-3 py-2 text-center text-gray-500">-</TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.panel_prabayar, subtotal.panel_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.panel_prabayar, subtotal.panel_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.panel_pascabayar, subtotal.panel_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.panel_pascabayar, subtotal.panel_dibutuhkan)}
                                                    </TableCell>
                                                    <TableCell
                                                        className={cn(
                                                            'border border-gray-300 px-3 py-2 text-center font-bold',
                                                            getTextColor(calcPct(subtotal.panel_belum, subtotal.panel_dibutuhkan)),
                                                        )}
                                                    >
                                                        {pct(subtotal.panel_belum, subtotal.panel_dibutuhkan)}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
