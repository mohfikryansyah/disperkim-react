'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { useDistrict } from '@/hooks/use-fetch';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;

export default function Echart() {
    const chartRef = useRef<HTMLDivElement>(null);

    const { districts, loading } = useDistrict();
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
        districts?.map((district, i) => {
            const visitorValue = Number(district.id);

            return {
                value: visitorValue,
                name: capitalize(district.name),
            };
        }) ?? [];

    useEffect(() => {
        if (!chartRef.current) return;
        if (!loading) {
            const chartInstance = echarts.init(chartRef.current);

            const option: EChartsOption = {
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    bottom: '0%',
                    left: 'center',
                    align: 'auto',
                },
                series: [
                    {
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
        }
    }, [loading, chartData]);

    return (
        <Card className="gap-0">
            <CardHeader>
                <CardTitle className='text-center'>Jumlah Titik Lampu</CardTitle>
                <CardDescription className='text-center'>Jumlah titik lampu di kecamatan</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] py-0">
                <div ref={chartRef} className="h-full w-full" />
            </CardContent>
        </Card>
    );
}
