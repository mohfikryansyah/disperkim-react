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
            <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4", className)}>
                {cards.slice(0, 4).map((card, i) => (
                    <Card key={i} className="bg-card-gradient text-white">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h1 className="text-3xl font-semibold">{card.content}</h1>
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
                            <Card key={i + 4} className="bg-card-gradient text-white">
                                <CardHeader>
                                    <CardTitle>{card.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h1 className="text-3xl font-semibold">{card.content}</h1>
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
