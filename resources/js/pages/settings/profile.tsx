import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { UploadIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    avatar?: File | string | null;
    profile_banner?: File | string | null;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
        profile_banner: null,
    });

    const inputProfileBanner = useRef<HTMLInputElement>(null);
    const inputAvatar = useRef<HTMLInputElement>(null);
    const [previewProfileBanner, setPreviewProfileBanner] = useState<string>('');
    const [previewAvatar, setPreviewAvatar] = useState<string>('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            route('profile.update', {
                _method: 'PATCH',
            }),
            {
                preserveScroll: true,
                forceFormData: true,
                onError: (errors) => {
                    console.log(errors);
                }
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informasi Profil" description="Perbarui nama dan alamat email Anda" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <div
                                className="relative z-10 mb-16 w-full cursor-pointer rounded-xl bg-gray-300 lg:h-[15rem]"
                                onClick={() => inputProfileBanner.current?.click()}
                            >
                                {previewProfileBanner || auth.user.profile_banner ? (
                                    <>
                                        <InputError className="mb-2" message={errors.profile_banner} />
                                        <img
                                            src={previewProfileBanner ? previewProfileBanner : '/storage/' + auth.user.profile_banner}
                                            alt="banner"
                                            className="h-full w-full rounded-xl object-cover"
                                        />
                                    </>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gray-300">
                                        <UploadIcon />
                                    </div>
                                )}

                                {previewAvatar || auth.user.avatar ? (
                                    <img
                                        src={previewAvatar ? previewAvatar : '/storage/' + auth.user.avatar}
                                        alt={auth.user.name}
                                        className="absolute -bottom-16 left-6 z-30 size-28 rounded-full object-cover ring-4 ring-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            inputAvatar.current?.click();
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="absolute -bottom-16 left-6 z-30 flex h-28 w-28 items-center justify-center rounded-full bg-gray-400 text-3xl font-bold text-white ring-4 ring-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            inputAvatar.current?.click();
                                        }}
                                    >
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <Input
                                ref={inputProfileBanner}
                                id="profile_banner"
                                name="profile_banner"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={processing}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('profile_banner', file);

                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            setPreviewProfileBanner(ev.target?.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <Input
                                ref={inputAvatar}
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={processing}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('avatar', file);

                                        const reader = new FileReader();
                                        reader.onload = (ev) => {
                                            setPreviewAvatar(ev.target?.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                {/* <DeleteUser /> */}
            </SettingsLayout>
        </AppLayout>
    );
}
