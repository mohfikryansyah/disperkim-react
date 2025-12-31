import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kecamatan',
        href: route('subdistricts.index'),
    },
];

export type KecamatanForm = {
    name: string;
};

export default function CreateKecamatan() {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<KecamatanForm>>({
        name: '',
    });

    const [open, setOpen] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('subdistricts.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Kecamatan berhasil ditambahkan');
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                toast.error('Gagal menambahkan kecamatan!');
            },
        });
    };
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 xl:w-fit">
                        <PlusCircle />
                        Tambah Kecamatan
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Form Kecamatan</DialogTitle>
                        <DialogDescription>Tambahkan kecamatan dengan mengisi form dibawah ini</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Kecamatan</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
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
