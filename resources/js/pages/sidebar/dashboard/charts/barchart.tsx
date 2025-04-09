'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
    { apj: 'konvensional', visitors: 275, fill: 'var(--color-konvensional)' },
    { apj: 'led', visitors: 200, fill: 'var(--color-led)' },
    { apj: 'pjuts', visitors: 187, fill: 'var(--color-pjuts)' },
];

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    konvensional: {
        label: 'Konvensional',
        color: 'hsl(var(--chart-1))',
    },
    led: {
        label: 'LED',
        color: 'hsl(var(--chart-2))',
    },
    pjuts: {
        label: 'PJUTS',
        color: 'hsl(var(--chart-4))',
    },
} satisfies ChartConfig;

export function Barchart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Data APJ</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 30,
                        }}
                    >
                        <YAxis
                            dataKey="apj"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
                        />
                        <XAxis dataKey="visitors" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="visitors" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
            </CardFooter>
        </Card>
    );
}
