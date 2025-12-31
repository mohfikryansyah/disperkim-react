import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BreadcrumbItem, Street, Village } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChevronDown, Edit } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { StreetForm } from './create-jalan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    street: Street;
    villages?: Village[];
}

export default function EditJalan({ street, villages }: Props) {
    const { data, setData, put, processing, errors, reset, isDirty } = useForm<Required<StreetForm>>({
        name: street.name,
        village_id: street.village_id,
        required_lamps: street.required_item.required_lamps,
        required_panels: street.required_item.required_panels,
        street_length: street.required_item.street_length,
        required_cable_length: street.required_item.required_cable_length,
    });

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenPopover, setIsOpenPopover] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('streets.update', { street: street }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Data jalan berhasil diubah');
                reset();
                setIsOpenDialog(false);
            },
            onError: (errors) => {
                setIsOpenDialog(true);
                console.error(errors);
                toast.error('Gagal mengubah data jalan!');
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
                    <DialogTitle>Form Jalan</DialogTitle>
                    <DialogDescription>Tambahkan jalan dengan mengisi form dibawah ini</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Jalan</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="village_id">Kelurahan</Label>
                        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
                            <PopoverTrigger asChild>
                                <Button className="w-full justify-between" variant="outline" disabled={processing}>
                                    {data.village_id ? villages?.find((sub) => sub.id === data.village_id)?.name : 'Pilih Kelurahan'}
                                    <ChevronDown />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="popover-content p-0">
                                <Command>
                                    <CommandInput placeholder="Search village..." />
                                    <CommandList>
                                        {villages?.map((village) => (
                                            <CommandItem
                                                key={village.id}
                                                value={village.name}
                                                onSelect={() => {
                                                    setData('village_id', village.id);
                                                    setIsOpenPopover(false);
                                                }}
                                            >
                                                {`Kelurahan ${village.name} - Kecamatan ${village.subdistrict.name}`}
                                            </CommandItem>
                                        ))}
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
