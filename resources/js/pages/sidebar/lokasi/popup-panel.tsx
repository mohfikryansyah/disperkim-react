import { BreadcrumbItem, Panel } from '@/types';
import { Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PopupPanel({ marker, lat, lng }: { marker: Panel; lat: number; lng: number }) {
    return (
        <div>
            <div className="mb-3 border-b border-gray-200 pb-2">
                <h1 className="flex items-center text-lg font-bold text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Lokasi Panel
                </h1>
            </div>

            <div className="mb-4 space-y-[-0.5rem]">
                <div className="flex items-center">
                    <Zap className="mt-0.5 mr-2 size-5 text-emerald-500" />
                    <p>
                        <span className="font-semibold text-gray-700">Nama Panel:</span> <span className="text-gray-600">{marker.name}</span>
                    </p>
                </div>

                <div className="flex items-center">
                    <Zap className="mt-0.5 mr-2 size-5 text-emerald-500" />
                    <p>
                        <span className="font-semibold text-gray-700">ID Pelanggan:</span> <span className="text-gray-600">{marker.customer_id}</span>
                    </p>
                </div>

                <div className="flex items-center">
                    <svg className="mt-0.5 mr-2 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                    <p>
                        <span className="font-semibold text-gray-700">Power:</span> <span className="text-gray-600">{marker.power} VA</span>
                    </p>
                </div>

                <div className="flex items-center">
                    <svg className="mt-0.5 mr-2 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                    <p>
                        <span className="font-semibold text-gray-700">Tipe Panel:</span> <span className="text-gray-600">{marker.type_panel}</span>
                    </p>
                </div>

                <div className="flex items-center">
                    <svg className="mt-0.5 mr-2 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>
                        <span className="font-semibold text-gray-700">Alamat:</span>{' '}
                        <span className="text-gray-600">
                            {marker.street.name + ', ' + marker.street.village.name + ', ' + marker.street.village.subdistrict.name}
                        </span>
                    </p>
                </div>

                <div className="flex items-center">
                    <svg className="mt-0.5 mr-2 h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <p>
                        <span className="font-semibold text-gray-700">Ditambahkan oleh:</span>{' '}
                        <span className="text-gray-600">{marker.user?.name || 'Tidak diketahui'}</span>
                    </p>
                </div>
            </div>

            <div className="mb-3 rounded-md bg-gray-50 p-3">
                <p className="flex items-center text-sm text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Koordinat:</span>
                    <span className="ml-1 font-mono">
                        {lat}, {lng}
                    </span>
                </p>
            </div>

            <a
                href={`https://maps.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                </svg>
                Buka di Google Maps
            </a>
        </div>
    );
}
