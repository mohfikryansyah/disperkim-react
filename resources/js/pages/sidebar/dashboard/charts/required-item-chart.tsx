'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { Subdistrict } from '@/types';
import { router } from '@inertiajs/react';
import * as echarts from 'echarts';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PropsRequiredItemChart } from '../interface-dashboard';

type EChartsOption = echarts.EChartsOption;

export default function RequiredItemChart({ subdistricts, lampsStatisticForRequiredItem, className }: PropsRequiredItemChart) {
    const chartRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!chartRef.current) return;
        // if (!loading) {
        const chartInstance = echarts.init(chartRef.current);

        const dataAxis = lampsStatisticForRequiredItem.map((v) => v.subdistrict_name);
        const dataTerpasang = lampsStatisticForRequiredItem.flatMap((v) => v.lampu_terpasang);
        const dataBelumTerpasang = lampsStatisticForRequiredItem.flatMap((v) => {
            return -Math.abs(v.lampu_belum_terpasang)
        });
        console.log(dataBelumTerpasang)
        const dataDibutuhkan = lampsStatisticForRequiredItem.flatMap((v) => v.lampu_dibutuhkan);
        

        const option: EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: {
                data: ['Terpasang', 'Belum Terpasang', 'Kebutuhan'],
                bottom: '0%',
                left: 'center',
                align: 'auto',
            },
            xAxis: [
                {
                    type: 'value',
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false,
                    },
                    data: dataAxis,
                },
            ],
            series: [
                {
                    name: 'Terpasang',
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'inside',
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: dataTerpasang,
                },
                {
                    name: 'Kebutuhan',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: dataDibutuhkan,
                },
                {
                    name: 'Belum Terpasang',
                    type: 'bar',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'left',
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: dataBelumTerpasang,
                },
            ],
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, []);

    const isOpenPopoverFilter = useBoolean(false);

    const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>();

    const displayNameSub = subdistricts?.find((sub) => sub.id === selectedSubdistrict)?.name;

    useEffect(() => {
        if (!selectedSubdistrict) return;

        router.reload({ data: { subdistrict_id: selectedSubdistrict } });
    }, [selectedSubdistrict]);

    return (
        <Card className="hover:border-primary/30 w-full gap-0 xl:col-span-2">
            <CardHeader>
                <CardTitle className="text-center">Realisasi vs Kebutuhan Lampu</CardTitle>
                <CardDescription className="text-center">Jumlah titik lampu di kecamatan</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 py-0">
                {/* <Popover modal open={isOpenPopoverFilter.state} onOpenChange={isOpenPopoverFilter.setState}>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="border-muted-foreground/20 hover:border-primary/40 w-full justify-between transition-colors"
                        >
                            <span className="truncate">{selectedSubdistrict ? displayNameSub : 'Pilih Kecamatan'}</span>
                            <ChevronDown className="size-4 opacity-70 transition-opacity group-hover:opacity-100" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        sideOffset={8}
                        className="border-border bg-background popover-content rounded-md border p-0 shadow-lg"
                    >
                        <Command>
                            <CommandInput placeholder="Cari kecamatan..." className="h-9" />
                            <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>

                            <CommandList className="max-h-64 overflow-y-auto">
                                {subdistricts.map((sub) => (
                                    <CommandItem
                                        key={sub.id}
                                        onSelect={() => {
                                            setSelectedSubdistrict(sub.id);
                                            isOpenPopoverFilter.setFalse();
                                        }}
                                        className="hover:bg-accent flex cursor-pointer items-center gap-2 px-3 py-2 transition-colors"
                                    >
                                        {sub.name}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover> */}
                <div ref={chartRef} className={cn('h-[310px] w-full', className)} />
            </CardContent>
        </Card>
    );
}
