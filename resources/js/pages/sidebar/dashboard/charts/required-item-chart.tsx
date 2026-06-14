'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useBoolean from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { PropsRequiredItemChart } from '../interface-dashboard';

type EChartsOption = echarts.EChartsOption;

export default function RequiredItemChart({ subdistricts, lampsStatisticForRequiredItem, className }: PropsRequiredItemChart) {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chartInstance = echarts.init(chartRef.current);

        const dataAxis = lampsStatisticForRequiredItem.map((v) => v.subdistrict_name);
        const dataTerpasang = lampsStatisticForRequiredItem.flatMap((v) => v.lampu_terpasang);
        const dataBelumTerpasang = lampsStatisticForRequiredItem.flatMap((v) => {
            return -Math.abs(v.lampu_belum_terpasang);
        });

        const dataDibutuhkan = lampsStatisticForRequiredItem.flatMap((v) => v.lampu_dibutuhkan);

        const option: EChartsOption = {
            title: {
                text: 'Realisasi vs Kebutuhan Lampu',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            toolbox: {
                feature: {
                    saveAsImage: {
                        pixelRatio: 2,
                        title: 'Simpan sebagai gambar',
                    },
                    magicType: {
        type: ['stack']
      },
                    dataView: {},
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
            <CardContent className="flex flex-col gap-4 py-0">
                <div ref={chartRef} className={cn('h-[310px] w-full', className)} />
            </CardContent>
        </Card>
    );
}
