import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem, StatusLampType } from '@/types';
import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import APJForm from './components/form-apj';
import { APJForm as APJFormType, CreateAPJProps, ENUMSumberDana } from './components/interface-apj';

export default function CreateAPJ({ streets, lamps, panels, titleForButton }: CreateAPJProps) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<APJFormType>>({
        street_id: '019ac4ac-7c16-71a2-9a35-92e39661dec2',
        status: 'Menyala' as StatusLampType,
        name: '',
        latitude: '',
        longitude: '',
        panel_id: null,
        type: 'Tiang PJUTS',
        listrik_pln: 'Mandiri',
        sumber_dana: 'APBN' as ENUMSumberDana,
        tahun_pengadaan: '2022',
    });

    const isOpenDialog = useBoolean();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('lamp.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('APJ berhasil ditambahkan');
                isOpenDialog.setFalse();
                reset();
            },
            onError: (errors) => {
                toast.error('Gagal menambahkan APJ!');
            },
        });
    };

    return (
        <Dialog open={isOpenDialog.state} onOpenChange={isOpenDialog.setState}>
            <DialogTrigger asChild>
                <Button className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 xl:w-fit">
                    <PlusCircle />
                    {titleForButton ? titleForButton : 'Tambah APJ'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader className="px-1">
                    <DialogTitle>Tambah Data APJ</DialogTitle>
                    <DialogDescription>Isi informasi berikut untuk menambahkan data lampu ke sistem.</DialogDescription>
                </DialogHeader>
                <div className="max-h-[75dvh] overflow-y-auto px-1 pr-4 pb-2">
                    <form id="create-apj" onSubmit={submit}>
                        <APJForm data={data} setData={setData} errors={errors} streets={streets} lamps={lamps} panels={panels} />
                    </form>
                </div>
                <DialogFooter>
                    <Button form="create-apj" disabled={processing || !isDirty}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
