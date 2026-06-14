import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Totals } from '@/types';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface SummaryTotalItemProps {
    totals: Totals;
    className?: string;
    initialState?: boolean;
}

interface CardProps {
    title: string;
    content: string | number;
}

export default function SummaryTotalItem({ totals, className, initialState = false }: SummaryTotalItemProps) {
    const [showAll, setShowAll] = useState(initialState);

    const cards: CardProps[] = [
        { title: 'Panel Terpasang (Prabayar)', content: totals.installed_panels_prabayar },
        { title: 'Panel Terpasang (Pascabayar)', content: totals.installed_panels_pascabayar },
        { title: 'Panel Dibutuhkan', content: totals.required_panels },
        { title: 'Panjang Kabel Terpasang (meter)', content: totals.installed_cable_length },
        { title: 'Panjang Kabel Dibutuhkan (meter)', content: totals.required_cable_length },
        { title: 'Lampu Dibutuhkan', content: totals.required_lamps },
        { title: 'Lampu Terpasang via App', content: totals.installed_lamps_via_app },
        { title: 'Lampu Terpasang Non-App', content: totals.installed_lamps_non_app },
        { title: 'Lampu Terpasang Mandiri', content: totals.installed_lamps_mandiri },
    ];

    return (
        <>
            <div className={cn('grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4', className)}>
                {cards.slice(0, 4).map((card, i) => (
                    <Card
                        key={i}
                        className="group border-border bg-card hover:border-accent/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="bg-accent absolute top-0 left-0 h-1 w-full" />

                        <div className="bg-accent/10 group-hover:bg-accent/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-3xl transition-all duration-300" />

                        <CardHeader className="relative z-10">
                            <CardTitle className="text-foreground">{card.title}</CardTitle>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <div className="flex items-end justify-between">
                                <h1 className="text-primary text-3xl font-bold">{card.content}</h1>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <AnimatePresence initial={false}>
                {showAll && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4"
                    >
                        {cards.slice(4).map((card, i) => (
                            <Card
                                key={i}
                                className="group border-border bg-card hover:border-accent/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="bg-accent absolute top-0 left-0 h-1 w-full" />

                                <div className="bg-accent/10 group-hover:bg-accent/20 absolute -top-8 -right-8 h-24 w-24 rounded-full blur-3xl transition-all duration-300" />

                                <CardHeader className="relative z-10">
                                    <CardTitle className="text-foreground">{card.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <div className="flex items-end justify-between">
                                        <h1 className="text-primary text-3xl font-bold">{card.content}</h1>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={cn('px-4 text-end', showAll ? 'mt-0' : 'mt-2')}>
                <Button
                    variant={'ghost'}
                    onClick={() => setShowAll((prev) => !prev)}
                    className="cursor-pointer px-0 text-blue-500 hover:bg-transparent hover:text-blue-500 hover:underline"
                >
                    {showAll ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua'}
                </Button>
            </div>
        </>
    );
}
