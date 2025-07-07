'use client';

import { DataTable } from '@/components/datatable/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import DataMasterLayout from '@/layouts/data-master/layout';
import { cn } from '@/lib/utils';
import { Subdistrict, Totals, Village } from '@/types';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { columns } from './columns';
import CreateKelurahan from './create-kelurahan';
import SummaryTotalItem from '@/components/custom/summary-total-item';

interface PagesProps {
    villages: Village[];
    subdistricts: Subdistrict[];
    villageName: string;
    totals: Totals;
}

export default function ShowKecamatan({ villages, subdistricts, villageName, totals }: PagesProps) {

    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    <div>
                        <h1 className='text-2xl tracking-tight font-semibold text-gray-800'>Data di Kelurahan {villageName}</h1>
                        <SummaryTotalItem totals={totals} className='mt-6' initialState={true} />
                    </div>
                    <DataTable columns={columns} data={villages}>
                        <CreateKelurahan subdistricts={subdistricts} />
                    </DataTable>
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
