import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BreadcrumbItem, Subdistrict } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelurahan',
        href: route('villages.index'),
    },
];

export type KelurahanForm = {
    name: string;
    subdistrict_id: number | null;
};

export default function CreateKelurahan({ subdistricts }: { subdistricts: Subdistrict[] }) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<KelurahanForm>>({
        name: '',
        subdistrict_id: null,
    });

    const [open, setOpen] = useState(false);
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.subdistrict_id === null) {
            toast.error('Pilih kecamatan terlebih dahulu!');
            return;
        }

        post(route('villages.store'), {
            preserveState: true,
            onSuccess: () => {
                toast.success('Kelurahan berhasil ditambahkan');
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menambahkan kecamatan!');
            },
        });
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="h-8 bg-emerald-600 transition-colors duration-300 hover:bg-emerald-700">Tambah Kelurahan</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Form Kelurahan</DialogTitle>
                        <DialogDescription>Tambahkan kecamatan dengan mengisi form dibawah ini</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Kelurahan</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subdistrict_id">Kecamatan</Label>
                            <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover} modal={true}>
                                <PopoverTrigger className="relative flex w-full items-center justify-between">
                                    <Button type="button" variant="outline" className="w-full justify-between   ">
                                        {data.subdistrict_id ? subdistricts.find((sub) => sub.id === data.subdistrict_id)?.name : 'Pilih Kecamatan'}
                                    </Button>
                                    <div className="absolute right-2">
                                        <ChevronDown className='size-3' />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="popover-content p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari kecamatan..." />
                                        <CommandList className="max-h-60 overflow-y-auto">
                                            {subdistricts?.map((subdistrict) => (
                                                <CommandItem key={subdistrict.id} onSelect={() => {
                                                    setData('subdistrict_id', subdistrict.id);
                                                    setIsOpenPopover(false);
                                                }}>
                                                    {subdistrict.name}
                                                </CommandItem>
                                            ))}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputError message={errors.subdistrict_id} />
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
