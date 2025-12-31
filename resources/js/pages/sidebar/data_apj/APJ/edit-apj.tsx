import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import { Lamp, LampType, StatusLampType } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import APJForm from './components/form-apj';
import { APJForm as APJFormType, CreateAPJProps, ENUMSumberDana } from './components/interface-apj';

interface EditAPJProps extends CreateAPJProps {
    lamp: Lamp;
}

export default function EditAPJ({ streets, lamps, panels, lamp }: EditAPJProps) {
    const { data, setData, put, processing, errors, isDirty } = useForm<Required<APJFormType>>({
        street_id: lamp.street_id,
        status: lamp.status as StatusLampType,
        name: lamp.name,
        latitude: lamp.latitude,
        longitude: lamp.longitude,
        panel_id: lamp.panel_id || null,
        type: lamp.type as LampType,
        listrik_pln: lamp.listrik_pln,
        sumber_dana: lamp.sumber_dana || ('' as ENUMSumberDana),
        tahun_pengadaan: lamp.tahun_pengadaan || '',
    });

    const isOpenDialog = useBoolean();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('lamp.update', lamp.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('APJ berhasil diperbarui');
                isOpenDialog.setFalse();
            },
            onError: (errors) => {
                toast.error('Gagal memperbarui APJ!');
            },
        });
    };

    return (
        <Dialog open={isOpenDialog.state} onOpenChange={isOpenDialog.setState}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="m-0 cursor-pointer hover:bg-yellow-100">
                    <Edit className="size-4 text-yellow-600" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader className="px-1">
                    <DialogTitle>Edit Data APJ</DialogTitle>
                    <DialogDescription>Perbarui informasi data lampu berikut.</DialogDescription>
                </DialogHeader>
                <div className="max-h-[75dvh] overflow-y-auto px-1 pr-4 pb-2">
                    <form id="edit-apj" onSubmit={submit}>
                        <APJForm data={data} setData={setData} errors={errors} streets={streets} lamps={lamps} panels={panels} />
                    </form>
                </div>
                <DialogFooter>
                    <Button form="edit-apj" disabled={processing || !isDirty}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
