import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem, PanelType } from '@/types';
import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
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

export default function CreatePanel({ streets, panels, lamps, titleForButton }: CreatePanelProps) {
    const { data, setData, post, processing, errors, reset, isDirty } = useForm<Required<PanelFormType>>({
        street_id: '',
        latitude: NaN,
        longitude: NaN,
        type_panel: '' as PanelType,
        power: undefined,
        name: '',
        customer_name: '',
        customer_id: '',
    });

    const isOpenDialog = useBoolean();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('panel.store'), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Panel berhasil ditambahkan');
                isOpenDialog.setFalse();
                reset();
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menambahkan Panel!');
            },
        });
    };

    return (
        <Dialog open={isOpenDialog.state} onOpenChange={isOpenDialog.setState}>
            <DialogTrigger asChild>
                <Button className="hover:bg-primary/90 w-full bg-gradient-to-br from-[#105864] via-[#0E7C86] to-[#12A4A0] transition-colors duration-300 lg:w-fit">
                    <PlusCircle />
                    {titleForButton ? titleForButton : 'Tambah Panel'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Form Panel</DialogTitle>
                    <DialogDescription>Tambahkan kecamatan dengan mengisi form dibawah ini</DialogDescription>
                </DialogHeader>
                <div className="max-h-[75dvh] overflow-y-auto px-1 pr-4 pb-2">
                    <form id="create-apj" onSubmit={submit}>
                        <PanelForm data={data} setData={setData} errors={errors} streets={streets} lamps={lamps} panels={panels} />
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
