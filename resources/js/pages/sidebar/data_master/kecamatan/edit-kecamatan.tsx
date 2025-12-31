import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BreadcrumbItem, Subdistrict } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { KecamatanForm } from './create-kecamatan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    kecamatan: Subdistrict;
}

export default function EditKecamatan({ kecamatan }: Props) {
    const { data, setData, put, processing, errors, reset, isDirty } = useForm<Required<KecamatanForm>>({
        name: kecamatan.name,
    });

    const [open, setOpen] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('subdistricts.update', {subdistrict: kecamatan }), {
            preserveState: true,
                        preserveScroll: true,
            onSuccess: () => {
                toast.success('Data kecamatan berhasil diubah');
                reset();
                setOpen(false);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal mengubah data kecamatan!');
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size="sm" className="cursor-pointer hover:bg-orange-100">
                    <Edit className="size-4 text-orange-500" />
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
    );
}
