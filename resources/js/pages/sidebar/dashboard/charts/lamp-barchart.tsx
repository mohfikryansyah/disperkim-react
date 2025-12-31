'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import { Subdistrict } from '@/types';
import { router } from '@inertiajs/react';
import * as echarts from 'echarts';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LampDataBarChart } from '../interface-dashboard';

export default function LampChart({ lampsStatistic, subdistricts }: { lampsStatistic: LampDataBarChart[]; subdistricts: Subdistrict[] }) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const dataAxis = lampsStatistic.map((item) => item.village_name);
        const data = lampsStatistic.map((item) => item.lamp_count);

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#aaa' } },
            },
            yAxis: {
                type: 'category',
                data: dataAxis,
                axisLine: { lineStyle: { color: '#aaa' } },
                axisLabel: {
                    color: '#333',
                    fontSize: 12,
                },
            },
            series: [
                {
                    type: 'bar',
                    data,
                    barWidth: '60%',
                    itemStyle: {
                        borderRadius: [0, 10, 10, 0],
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                            { offset: 0, color: '#5c7bd9' },
                            { offset: 1, color: '#334479' },
                        ]),
                    },
                },
            ],
        };

        chart.setOption(option);

        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.dispose();
        };
    }, [lampsStatistic]);

    const isOpenPopoverFilter = useBoolean(false);

    const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>();

    const displayNameSub = subdistricts?.find((sub) => sub.id === selectedSubdistrict)?.name;

    useEffect(() => {
        if (!selectedSubdistrict) return;

        router.reload({
            data: { subdistrict_id: selectedSubdistrict },
            replace: true,
            preserveUrl: true,
        });
    }, [selectedSubdistrict]);

    return (
        <Card className="group hover:border-primary/40 shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3">
                <CardTitle className="text-center">Jumlah Titik Lampu</CardTitle>
                <CardDescription className="text-center">Jumlah titik lampu di setiap kelurahan</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Popover modal open={isOpenPopoverFilter.state} onOpenChange={isOpenPopoverFilter.setState}>
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
                </Popover>

                <div className="border-muted bg-muted/10 relative flex h-[400px] flex-1 items-center justify-center overflow-hidden rounded-md border border-dashed">
                    <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
                    {lampsStatistic.length === 0 && (
                        <div className="text-muted-foreground bg-muted/10 absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <p>Tidak ada data untuk kecamatan ini</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
