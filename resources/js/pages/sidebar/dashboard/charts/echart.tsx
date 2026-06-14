'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { cn } from '@/lib/utils';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;

interface DonutChartProps {
    totalsLampuPerKecamatan: { name: string; total: number }[];
    className?: string
}

export default function DonutChart({ totalsLampuPerKecamatan, className }: DonutChartProps ) {
    const chartRef = useRef<HTMLDivElement>(null);

    const { capitalize } = useCapitalizeEachWord();

    const colorPalette = [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))',
        'hsl(var(--chart-6))',
        'hsl(var(--chart-7))',
        'hsl(var(--chart-8))',
        'hsl(var(--chart-9))',
    ];

    const chartData =
        totalsLampuPerKecamatan?.map((total, i) => {
            const lampValue = Number(total.total);

            return {
                value: lampValue,
                name: capitalize(total.name),
            };
        }) ?? [];

    useEffect(() => {
        if (!chartRef.current) return;
        // if (!loading) {
            const chartInstance = echarts.init(chartRef.current);

            const option: EChartsOption = {
                title: {
                    text: 'Jumlah Titik Lampu',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    bottom: '0%',
                    left: 'center',
                    align: 'auto',
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2,
                            title: 'Simpan sebagai gambar',
                        },
                        dataView: {},
                    },
                },
                series: [
                    {
                        top: 20,
                        name: 'Jumlah Titik Lampu',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '42%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 24,
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: chartData,
                    },
                ],
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
    }, [chartData]);

    return (
        <Card className="gap-0 hover:border-primary/30 w-full">
            {/* <CardHeader>
                <CardTitle className='text-center'>Jumlah Titik Lampu</CardTitle>
                <CardDescription className='text-center'>Jumlah titik lampu di kecamatan</CardDescription>
            </CardHeader> */}
            <CardContent className="py-0">
                <div ref={chartRef} className={cn("h-[310px] w-full", className)} />
            </CardContent>
        </Card>
    );
}
