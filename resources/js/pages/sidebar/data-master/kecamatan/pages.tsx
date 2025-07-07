'use client';

import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import DataMasterLayout from '@/layouts/data-master/layout';
import { cn } from '@/lib/utils';
import { Subdistrict, Totals } from '@/types';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { columns } from './columns';
import CreateKecamatan from './create-kecamatan';
import SummaryTotalItem from '@/components/custom/summary-total-item';

interface PagesProps {
    subdistricts: Subdistrict[];
    totals: Totals;
}

interface CardProps {
    title: string;
    content: string | number;
}

export default function Kecamatan({ subdistricts, totals }: PagesProps) {
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    <div>
                        <SummaryTotalItem totals={totals}/>
                    </div>
                    <DataTable columns={columns} data={subdistricts}>
                        <CreateKecamatan />
                    </DataTable>
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
