import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BreadcrumbItem, Subdistrict, Village } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown, Edit } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { KelurahanForm } from './create-kelurahan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    village: Village;
    subdistricts?: Subdistrict[];
}

export default function EditKelurahan({ village, subdistricts }: Props) {
    const { data, setData, put, processing, errors, reset, isDirty } = useForm<Required<KelurahanForm>>({
        name: village.name,
        subdistrict_id: village.subdistrict_id,
    });

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('villages.update', { village: village }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Data kecamatan berhasil diubah');
                reset();
                setIsOpenDialog(false);
            },
            onError: (errors) => {
                setIsOpenDialog(true);
                console.error(errors);
                toast.error('Gagal mengubah data kecamatan!');
            },
        });
    };

    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size="sm" className="cursor-pointer hover:bg-orange-100">
                    <Edit className="size-4 text-orange-500" />
                </Button>
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
                        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
                            <PopoverTrigger asChild>
                                <Button className="w-full justify-between" variant="outline" disabled={processing}>
                                    {data.subdistrict_id ? subdistricts?.find((sub) => sub.id === data.subdistrict_id)?.name : 'Pilih Kecamatan'}
                                    <ChevronDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content p-0">
                                <Command>
                                    <CommandInput placeholder="Search subdistrict..." />
                                    <CommandList>
                                        {subdistricts?.map((subdistrict) => (
                                            <CommandItem
                                                key={subdistrict.id}
                                                value={subdistrict.name}
                                                onSelect={() => {
                                                    setData('subdistrict_id', String(subdistrict.id));
                                                    setIsOpenPopover(false);
                                                }}
                                            >
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
    );
}
