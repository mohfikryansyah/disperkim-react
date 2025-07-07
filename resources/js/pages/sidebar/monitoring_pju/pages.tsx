import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, RequiredItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import CableChart from './charts/cable-chart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function MonitoringPJU({ required_items }: { required_items: RequiredItem[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Monitoring PJU" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading title="Monitoring PJU" />

                <Link href={route('monitoring-pju.create')}>
                    <Button variant={'ghost'} size="sm" className="cursor-pointer hover:bg-orange-100">
                        <Plus className="size-4 text-orange-500" />
                    </Button>
                </Link>
                <CableChart />
            </div>
        </AppLayout>
    );
}
