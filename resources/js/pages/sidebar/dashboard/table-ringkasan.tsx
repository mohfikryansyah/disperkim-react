import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    countInstalledLamps,
    countInstalledNetworkCable,
    countInstalledPanels,
    countRequiredLamps,
    countRequiredNetworkCable,
    countRequiredPanels,
    countStreetLength,
    getDiffColor,
} from '@/helpers';
import { BreadcrumbItem, Subdistrict } from '@/types';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type LampDiffCellProps = {
    installed: number;
    required: number;
};

interface PropsTableKecamatan {
    subdistricts: Subdistrict[];
}

export default function TabelRingkasanKecamatan({ subdistricts }: PropsTableKecamatan) {
    const totals = subdistricts.reduce(
        (acc, v) => {
            acc.streetLength += countStreetLength(v);

            acc.requiredLamps += countRequiredLamps(v);
            acc.installedLamps += countInstalledLamps(v);

            acc.requiredCables += countRequiredNetworkCable(v);
            acc.installedCables += countInstalledNetworkCable(v);

            acc.requiredPanels += countRequiredPanels(v);
            acc.installedPanels += countInstalledPanels(v);

            return acc;
        },
        {
            streetLength: 0,

            requiredLamps: 0,
            installedLamps: 0,

            requiredCables: 0,
            installedCables: 0,

            requiredPanels: 0,
            installedPanels: 0,
        },
    );

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <Table className="w-full">
                <TableHeader className="sticky top-0 z-10">
                    <TableRow className="bg-primary/90 hover:bg-primary">
                        <TableHead rowSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            No.
                        </TableHead>
                        <TableHead rowSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            Nama Kecamatan
                        </TableHead>
                        <TableHead rowSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            Panjang Jalan
                        </TableHead>

                        <TableHead colSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            Lampu Penerangan (Unit)
                        </TableHead>
                        <TableHead colSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            Panjang Kabel Jaringan LPJU (Meter)
                        </TableHead>
                        <TableHead colSpan={3} className="px-3 py-2 text-center font-semibold text-white">
                            KWH Meter
                        </TableHead>
                    </TableRow>

                    <TableRow className="bg-primary/80 hover:bg-primary">
                        {['Yang Dibutuhkan', 'Terpasang', 'Belum Terpasang'].map((h) => (
                            <TableHead key={h} className="px-3 py-2 text-center text-white">
                                {h}
                            </TableHead>
                        ))}
                        {['Yang Dibutuhkan', 'Terpasang', 'Belum Terpasang'].map((h) => (
                            <TableHead key={h} className="px-3 py-2 text-center text-white">
                                {h}
                            </TableHead>
                        ))}
                        {['Yang Dibutuhkan', 'Terpasang', 'Belum Terpasang'].map((h) => (
                            <TableHead key={h} className="px-3 py-2 text-center text-white">
                                {h}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody className="text-sm">
                    <TableRow className="bg-gray-100/50">
                        {[...Array(12)].map((_, i) => (
                            <TableCell key={i} className="border-b px-3 py-2 text-center text-gray-500">
                                {i + 1}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={12} className="bg-gray-50 py-2.5 text-center text-sm">
                            <span className="text-gray-500 italic">Data Kecamatan</span>
                        </TableCell>
                    </TableRow>

                    {subdistricts.map((v, i) => (
                        <React.Fragment key={i}>
                            <TableRow className="hover:bg-primary/5 transition-colors even:bg-gray-50">
                                <TableCell className="px-3 py-3 text-center font-semibold">{i + 1}</TableCell>
                                <TableCell className="px-3 py-3 font-medium">{v.name}</TableCell>
                                <TableCell className="px-3 py-3 text-center">{countStreetLength(v)}</TableCell>

                                <TableCell className="px-3 py-3 text-center">{countRequiredLamps(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">{countInstalledLamps(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">
                                    <DiffCell installed={countInstalledLamps(v)} required={countRequiredLamps(v)} />
                                </TableCell>

                                <TableCell className="px-3 py-3 text-center">{countRequiredNetworkCable(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">{countInstalledNetworkCable(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">
                                    <DiffCell installed={countInstalledNetworkCable(v)} required={countRequiredNetworkCable(v)} />
                                </TableCell>

                                <TableCell className="px-3 py-3 text-center">{countRequiredPanels(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">{countInstalledPanels(v)}</TableCell>
                                <TableCell className="px-3 py-3 text-center">
                                    <DiffCell installed={countInstalledPanels(v)} required={countRequiredPanels(v)} />
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}

                    <TableRow>
                        <TableCell colSpan={12} className="bg-gray-50 py-4"></TableCell>
                    </TableRow>

                    {/* TOTAL */}
                    <TableRow className="bg-primary/10 border-t font-bold">
                        <TableCell colSpan={2} className="px-3 py-3 text-right">
                            Total
                        </TableCell>
                        <TableCell className="px-3 py-3 text-center">{totals.streetLength}</TableCell>
                        <TableCell className="px-3 py-3 text-center">{totals.requiredLamps}</TableCell>
                        <TableCell className="px-3 py-3 text-center">{totals.installedLamps}</TableCell>
                        <TableCell className="px-3 py-3 text-center">
                            <DiffCell required={totals.requiredLamps} installed={totals.installedLamps} />
                        </TableCell>

                        <TableCell className="px-3 py-3 text-center">{totals.requiredCables}</TableCell>
                        <TableCell className="px-3 py-3 text-center">{totals.installedCables}</TableCell>
                        <TableCell className="px-3 py-3 text-center">
                            <DiffCell required={totals.requiredCables} installed={totals.installedCables} />
                        </TableCell>

                        <TableCell className="px-3 py-3 text-center">{totals.requiredPanels}</TableCell>
                        <TableCell className="px-3 py-3 text-center">{totals.installedPanels}</TableCell>
                        <TableCell className="px-3 py-3 text-center">
                            <DiffCell required={totals.requiredPanels} installed={totals.installedPanels} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

function DiffCell({ installed, required }: LampDiffCellProps) {
    const diff = installed - required;
    const color = getDiffColor(diff);

    return (
        <span className={color}>
            {diff > 0 && `+${diff}`}
            {diff === 0 && '0'}
            {diff < 0 && diff}
        </span>
    );
}
