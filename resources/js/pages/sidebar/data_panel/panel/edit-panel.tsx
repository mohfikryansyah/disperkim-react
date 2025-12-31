import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem, Panel } from '@/types';
import { useForm } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { CreatePanelProps, PanelForm as PanelFormType } from './components/interface-panel';
import PanelForm from './components/PANELForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: route('subdistricts.index'),
    },
];

interface EditPANELProps extends CreatePanelProps {
    panel: Panel;
}

export default function EditPanel({ streets, panels, lamps, panel }: EditPANELProps) {
    const { data, setData, put, processing, errors, reset, isDirty } = useForm<Required<PanelFormType>>({
        street_id: panel.street_id,
        latitude: panel.latitude,
        longitude: panel.longitude,
        type_panel: panel.type_panel,
        power: panel.power,
        name: panel.name,
        customer_name: panel.customer_name,
        customer_id: panel.customer_id,
    });

    const isOpenDialog = useBoolean();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('panel.update', panel.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Panel berhasil diperbarui');
                isOpenDialog.setFalse();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal memperbarui Panel!');
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
                <DialogHeader>
                    <DialogTitle>Form Panel</DialogTitle>
                    <DialogDescription>Tambahkan kecamatan dengan mengisi form dibawah ini</DialogDescription>
                </DialogHeader>
                <div className="max-h-[75dvh] overflow-y-auto px-1 pr-4 pb-2">
                    <form id="edit-panel" onSubmit={submit}>
                        <PanelForm data={data} setData={setData} errors={errors} streets={streets} lamps={lamps} panels={panels} />
                    </form>
                </div>
                <DialogFooter>
                    <Button form="edit-panel" disabled={processing || !isDirty}>
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
