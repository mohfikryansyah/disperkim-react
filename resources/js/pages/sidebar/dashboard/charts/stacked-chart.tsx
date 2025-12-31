'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { Subdistrict } from '@/types';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

type EChartsOption = echarts.EChartsOption;

type SubdistrictData = {
    subdistrict: string;
    required_panels: number;
    installed_panels: number;
    required_lamps: number;
    installed_lamps: number;
    required_cable: number;
    installed_cable: number;
};

const data: SubdistrictData[] = [
    {
        subdistrict: 'Kecamatan A',
        required_panels: 50,
        installed_panels: 40,
        required_lamps: 100,
        installed_lamps: 85,
        required_cable: 123,
        installed_cable: 100,
    },
    {
        subdistrict: 'Kecamatan B',
        required_panels: 30,
        installed_panels: 25,
        required_lamps: 70,
        installed_lamps: 60,
        required_cable: 321,
        installed_cable: 100,
    },
    {
        subdistrict: 'Kecamatan C',
        required_panels: 60,
        installed_panels: 45,
        required_lamps: 120,
        installed_lamps: 90,
        required_cable: 244,
        installed_cable: 100,
    },
];

export default function StackedChart({ subdistricts }: { subdistricts: Subdistrict[] }) {
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
        subdistricts?.map((subdistrict, i) => {
            const visitorValue = Number(subdistrict.id);

            return {
                value: visitorValue,
                name: capitalize(subdistrict.name),
            };
        }) ?? [];

    useEffect(() => {
        if (!chartRef.current) return;
        const chartInstance = echarts.init(chartRef.current);

        const option: EChartsOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: {
                bottom: 0,
                data: [
                    'Kebutuhan Panel',
                    'Panel Terpasang',
                    'Kebutuhan Lampu',
                    'Lampu Terpasang',
                    'Kebutuhan Kabel (meter)',
                    'Kabel Terpasang (meter)',
                ],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: data.map((d) => d.subdistrict),
            },
            yAxis: {
                type: 'value',
                name: 'Jumlah',
            },
            series: [
                {
                    name: 'Kebutuhan Panel',
                    type: 'bar',
                    data: data.map((d) => d.required_panels),
                    stack: 'panel',
                    itemStyle: { color: '#fddd65' },
                    emphasis: {
                        focus: 'series',
                    },
                },
                {
                    name: 'Panel Terpasang',
                    type: 'bar',
                    data: data.map((d) => d.installed_panels),
                    stack: 'panel',
                    itemStyle: { color: '#48b27e' },
                    emphasis: {
                        focus: 'series',
                    },
                },
                {
                    name: 'Kebutuhan Lampu',
                    type: 'bar',
                    data: data.map((d) => d.required_lamps),
                    stack: 'lamp',
                    itemStyle: { color: '#83d1f2' },
                    emphasis: {
                        focus: 'series',
                    },
                },
                {
                    name: 'Lampu Terpasang',
                    type: 'bar',
                    data: data.map((d) => d.installed_lamps),
                    stack: 'lamp',
                    itemStyle: { color: '#fa7170' },
                    emphasis: {
                        focus: 'series',
                    },
                },
                {
                    name: 'Kebutuhan Kabel (meter)',
                    type: 'bar',
                    data: data.map((d) => d.required_cable),
                    stack: 'cable',
                    itemStyle: { color: '#a668c3' },
                    emphasis: {
                        focus: 'series',
                    },
                },
                {
                    name: 'Kabel Terpasang (meter)',
                    type: 'bar',
                    data: data.map((d) => d.installed_cable),
                    stack: 'cable',
                    itemStyle: { color: '#607ad7' },
                    emphasis: {
                        focus: 'series',
                    },
                },
            ],
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [chartData]);

    return (
        <Card className="gap-0">
            <CardHeader>
                <CardTitle className="text-center">Kebutuhan vs Realisasi Panel, Lampu & Kabel</CardTitle>
                <CardDescription className="text-center">Data diseluruh kecamatan</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] py-0">
                <div ref={chartRef} className="h-full w-full" />
            </CardContent>
        </Card>
    );
}
