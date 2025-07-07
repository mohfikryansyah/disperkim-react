import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BreadcrumbItem, Street, Village } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jalan',
        href: route('villages.index'),
    },
];

export type StreetForm = {
    name: string;
    village_id: number | null;
};

export type CreateStreetProps = {
    village?: string;
};

export default function CreateStreet({ streets }: { streets: Street[] }) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<StreetForm>>({
        name: '',
        village_id: null,
    });

    const { villages } = usePage<{ villages: Village[] }>().props;

    const [open, setOpen] = useState(false);
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.village_id === null) {
            toast.error('Pilih kelurahan terlebih dahulu!');
            return;
        }

        post(route('streets.store'), {
            preserveState: true,
            onSuccess: () => {
                toast.success('Jalan berhasil ditambahkan');
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menambahkan kelurahan!');
            },
        });
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="h-8 bg-emerald-600 transition-colors duration-300 hover:bg-emerald-700">Tambah Jalan</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Form Jalan</DialogTitle>
                        <DialogDescription>Tambahkan kelurahan dengan mengisi form dibawah ini</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Jalan</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="village_id">Kelurahan</Label>
                            <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover} modal={true}>
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
                                            {villages?.map((village) => (
                                                <CommandItem
                                                    key={village.id}
                                                    onSelect={() => {
                                                        setData('village_id', village.id);
                                                        setIsOpenPopover(false);
                                                    }}
                                                >
                                                    {village.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.village_id} />
                        </div>
                        <DialogFooter>
                            <Button disabled={processing || !isDirty}>Submit</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
