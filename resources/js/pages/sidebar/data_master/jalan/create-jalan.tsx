import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem, Village } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown, PlusCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jalan',
        href: route('villages.index'),
    },
];

export type StreetForm = {
    name: string;
    village_id: number | string | null;
    required_lamps: number;
    required_panels: number;
    street_length: number;
    required_cable_length: number;
};

export type CreateStreetProps = {
    villages: string;
};

export default function CreateStreet({ villages }: { villages: Village[] }) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<StreetForm>>({
        name: '',
        village_id: null,
        required_lamps: 0,
        required_panels: 0,
        street_length: 0,
        required_cable_length: 0,
    });

    const isOpenPopover = useBoolean();
    const isOpenDialog = useBoolean();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.village_id === null) {
            toast.error('Pilih kelurahan terlebih dahulu!');
            return;
        }

        post(route('streets.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Jalan berhasil ditambahkan');
                reset();
                isOpenDialog.setFalse();
            },
            onError: (errors) => {
                toast.error('Gagal menambahkan kelurahan!');
            },
        });
    };
    return (
        <Dialog open={isOpenDialog.state} onOpenChange={isOpenDialog.setState}>
            <DialogTrigger asChild>
                <Button className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 xl:w-fit">
                    <PlusCircle />
                    Tambah Jalan
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={submit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Form Jalan</DialogTitle>
                        <DialogDescription>Tambahkan data jalan dengan mengisi form dibawah ini</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Jalan</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="village_id">
                            Kelurahan <span className="text-muted-foreground">(Lokasi Jalan)</span>
                        </Label>
                        <Popover open={isOpenPopover.state} onOpenChange={isOpenPopover.setState} modal={true}>
                            <PopoverTrigger asChild className="relative flex w-full items-center justify-between">
                                <Button type="button" variant="outline" className="w-full justify-between">
                                    {data.village_id ? villages.find((sub) => sub.id === data.village_id)?.name : 'Pilih Kelurahan'}
                                    <ChevronDown className="size-3" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content p-0">
                                <Command>
                                    <CommandInput placeholder="Cari kelurahan..." />
                                    <CommandList className="max-h-60 overflow-y-auto">
                                        <CommandEmpty>Tidak ada data yang ditemukan.</CommandEmpty>
                                        <CommandGroup>
                                            {villages?.map((village) => (
                                                <CommandItem
                                                    key={village.id}
                                                    value={village.name}
                                                    onSelect={() => {
                                                        setData('village_id', village.id);
                                                        isOpenPopover.setFalse();
                                                    }}
                                                >
                                                    {village.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.village_id} />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="street_length">
                            Panjang Jalan <span className="text-muted-foreground">(meter)</span>
                        </Label>
                        <Input
                            className="bg-white"
                            type="number"
                            name="street_length"
                            value={data.street_length}
                            onChange={(e) => setData('street_length', Number(e.target.value))}
                        />
                        <InputError message={errors.street_length} />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="required_cable_length">
                            Kabel yang dibutuhkan <span className="text-muted-foreground">(meter)</span>
                        </Label>
                        <Input
                            className="bg-white"
                            type="number"
                            name="required_cable_length"
                            value={data.required_cable_length}
                            onChange={(e) => setData('required_cable_length', Number(e.target.value))}
                        />
                        <InputError message={errors.required_cable_length} />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="required_panels">Panel yang dibutuhkan</Label>
                        <Input
                            className="bg-white"
                            type="number"
                            name="required_panels"
                            value={data.required_panels}
                            onChange={(e) => setData('required_panels', Number(e.target.value))}
                        />
                        <InputError message={errors.required_panels} />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="required_lamps">Lampu yang dibutuhkan</Label>
                        <Input
                            className="bg-white"
                            type="number"
                            name="required_lamps"
                            value={data.required_lamps}
                            onChange={(e) => setData('required_lamps', Number(e.target.value))}
                        />
                        <InputError message={errors.required_lamps} />
                    </div>
                    <DialogFooter>
                        <Button disabled={processing || !isDirty}>Submit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
