'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

import { useCapitalizeEachWord } from '@/hooks/use-capitalize-each-word';
import { useDistrict } from '@/hooks/use-fetch';

export function Piechart() {
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
          browser: capitalize(district.name),
          visitors: visitorValue,
          fill: colorPalette[i % colorPalette.length], // pakai warna dari CSS variable
        };
      }) ?? [];

      console.log(chartData)
    

    const chartConfig: ChartConfig = {
        visitors: {
            label: 'Jumlah Lampu',
        },
        ...Object.fromEntries(
            chartData.map((data) => [
                capitalize(data.browser),
                {
                    label: capitalize(data.browser),
                    color: data.fill,
                },
            ]),
        ),
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Jumlah Lampu per Kecamatan</CardTitle>
                <CardDescription>Update wilayah 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-14 mt-20">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square md:max-h-[350px]">
                    <PieChart>
                        <Pie data={chartData} dataKey="visitors" nameKey="browser" cx="50%" cy="50%" outerRadius={100} label />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="browser" />}
                            className="translate-y-14 flex-wrap  [&>*]:justify-start"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
