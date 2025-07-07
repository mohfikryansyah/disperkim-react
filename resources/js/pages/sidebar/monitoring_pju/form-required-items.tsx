import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import AppLayout from '@/layouts/app-layout';
import DataMasterLayout from '@/layouts/data-master/layout';
import { BreadcrumbItem, SharedData, Street } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type FormRequiredItemsProps = {
    street_id: number | null;
    created_by: number;
    street_length: string;
    installed_panels_prabayar: string;
    installed_panels_pascabayar: string;
    required_panels: string;
    installed_cable_length: string;
    required_cable_length: string;
    required_lamps: string;
    installed_lamps_via_app: string;
    installed_lamps_non_app: string;
    installed_lamps_mandiri: string;
};

export default function FormRequiredItems() {
    const { data, setData, post, processing, errors, reset, isDirty, transform } = useForm<Required<FormRequiredItemsProps>>({
        street_id: null,
        created_by: NaN,
        street_length: '',
        installed_panels_prabayar: '',
        installed_panels_pascabayar: '',
        required_panels: '',
        installed_cable_length: '',
        required_cable_length: '',
        required_lamps: '',
        installed_lamps_via_app: '',
        installed_lamps_non_app: '',
        installed_lamps_mandiri: '',
    });

    const { auth } = usePage<SharedData>().props;

    transform((data) => ({
        ...data,
        created_by: auth.user.id,
        street_length: Number(data.street_length),
        installed_panels_prabayar: Number(data.installed_panels_prabayar),
        installed_panels_pascabayar: Number(data.installed_panels_pascabayar),
        required_panels: Number(data.required_panels),
        installed_cable_length: Number(data.installed_cable_length),
        required_cable_length: Number(data.required_cable_length),
        required_lamps: Number(data.required_lamps),
        installed_lamps_via_app: Number(data.installed_lamps_via_app),
        installed_lamps_non_app: Number(data.installed_lamps_non_app),
        installed_lamps_mandiri: Number(data.installed_lamps_mandiri),
    }));

    const { streets } = usePage<{ streets: Street[] }>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('monitoring-pju.store'), {
            preserveState: true,
            onSuccess: () => {
                reset();
                toast.success('Data berhasil disimpan');
            },
            onError: () => {
                toast.error('Data gagal disimpan');
            },
        });
    };

    const isOpenPopover = useBoolean();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataMasterLayout>
                    {/* <Heading title="Tambah Data" description="Buat data kebutuhan jalan"></Heading> */}
                    <div className="max-w-3xl">
                        <form onSubmit={submit}>
                            <Card className="bg-gray-50">
                                <CardHeader>
                                    <CardTitle>Form Kebutuhan PJU Jalan</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid w-full gap-2">
                                        <Label>Jalan</Label>
                                        <Popover open={isOpenPopover.state} onOpenChange={isOpenPopover.setState}>
                                            <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                                <Button type="button" variant="outline" className="w-full justify-between">
                                                    {data.street_id ? streets.find((sub) => sub.id === data.street_id)?.name : 'Pilih Jalan'}
                                                    <ChevronDown className="size-3" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="popover-content p-0">
                                                <Command>
                                                    <CommandInput placeholder="Cari kecamatan..." />
                                                    <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                                    <CommandList className="max-h-60 overflow-y-auto">
                                                        {streets?.map((street) => (
                                                            <CommandItem
                                                                key={street.id}
                                                                onSelect={() => {
                                                                    setData('street_id', street.id);
                                                                    isOpenPopover.setFalse();
                                                                }}
                                                            >
                                                                {street.name} - Kelurahan {street.village.name} - Kecamatan{' '}
                                                                {street.village.subdistrict.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <InputError message={errors.street_id} />
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_cable_length">Panjang Kabel yang Terpasang</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_cable_length"
                                                value={data.installed_cable_length}
                                                onChange={(e) => setData('installed_cable_length', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="required_cable_length">Kabel yang dibutuhkan</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="required_cable_length"
                                                value={data.required_cable_length}
                                                onChange={(e) => setData('required_cable_length', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_lamps_via_app">Lampu via App</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_lamps_via_app"
                                                value={data.installed_lamps_via_app}
                                                onChange={(e) => setData('installed_lamps_via_app', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_lamps_non_app">Lampu non App</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_lamps_non_app"
                                                value={data.installed_lamps_non_app}
                                                onChange={(e) => setData('installed_lamps_non_app', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_lamps_mandiri">Lampu Mandiri</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_lamps_mandiri"
                                                value={data.installed_lamps_mandiri}
                                                onChange={(e) => setData('installed_lamps_mandiri', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_lamps_mandiri">Lampu yang dibutuhkan</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="required_lamps"
                                                value={data.required_lamps}
                                                onChange={(e) => setData('required_lamps', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center gap-4">
                                        <div className="gird grid w-full gap-2">
                                            <Label htmlFor="installed_panels_prabayar">Panel Prabayar Terpasang</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_panels_prabayar"
                                                value={data.installed_panels_prabayar}
                                                onChange={(e) => setData('installed_panels_prabayar', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="installed_panels_pascabayar">Panel Pascabayar Terpasang</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="installed_panels_pascabayar"
                                                value={data.installed_panels_pascabayar}
                                                onChange={(e) => setData('installed_panels_pascabayar', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid w-full gap-2">
                                            <Label htmlFor="required_panels">Panel yang dibutuhkan</Label>
                                            <Input
                                                className="bg-white"
                                                type="number"
                                                name="required_panels"
                                                value={data.required_panels}
                                                onChange={(e) => setData('required_panels', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Submit</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </div>
                </DataMasterLayout>
            </div>
        </AppLayout>
    );
}
