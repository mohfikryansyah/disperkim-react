import { Head, useForm } from '@inertiajs/react';
import { ClipboardCopy, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengguna',
        href: '/users',
    },
    {
        title: 'Buat Pengguna',
        href: route('register'),
    },
];


type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const generateRandomPassword = (length: number = 8) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

        let result = '';
        const randomArray = new Uint8Array(length);

        crypto.getRandomValues(randomArray);

        for (let i = 0; i < length; i++) {
            result += chars[randomArray[i] % chars.length];
        }

        if (result) {
            setData('password', result);
            setData('password_confirmation', result);
        }
    };

    const handleCopy = async () => {
        if (!data.password) return;
        try {
            await navigator.clipboard.writeText(data.password);
            toast.success('Password berhasil disalin ke clipboard');
        } catch (error) {
            toast.error('Gagal menyalin password ke clipboard. Periksa Izin Browser Anda.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="max-w-xl">
                    <CardHeader>
                        <CardTitle>Buat Akun Baru</CardTitle>
                        <CardDescription>Lengkapi form dibawah ini untuk membuat akun</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>

                                        <button type="button" className="text-primary text-xs underline hover:opacity-80" onClick={() => generateRandomPassword(12)}>
                                            Random
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type="text"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Password"
                                            className="pr-10" // kasih ruang biar icon tidak nutup teks
                                        />

                                        {/* ICON COPY */}
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-black"
                                        >
                                            <ClipboardCopy size={18} />
                                        </button>
                                    </div>

                                    <InputError message={errors.password} />
                                </div>

                                <Input
                                    id="password_confirmation"
                                    type="hidden"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                />

                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Buat Akun
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
