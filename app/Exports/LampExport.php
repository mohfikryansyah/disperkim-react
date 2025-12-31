<?php

namespace App\Exports;

use App\Models\Lamp;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class LampExport implements FromCollection, WithHeadings, WithMapping, WithEvents
{
    protected $lamps;
    private int $rowNumber = 1;

    public function __construct($lamps)
    {
        $this->lamps = $lamps;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->lamps;
    }

    public function headings(): array
    {
        return [
            'No.',
            'Kecamatan',
            'Desa',
            'Jalan',
            'Panel',
            'Tipe Lampu',
            'Latitude',
            'Longitude',
            'Status',
            'Sumber Listrik',
            'Sumber Dana',
            'Tahun Pengadaan',
        ];
    }

    public function map($lamp): array
    {
        return [
            $this->rowNumber++,
            $lamp->street->village->subdistrict->name ?? '-',
            $lamp->street->village->name ?? '-',
            $lamp->street->name ?? '-',
            $lamp->panel->name ?? '-',
            $lamp->type,
            $lamp->latitude,
            $lamp->longitude,
            $lamp->status,
            $lamp->listrik_pln ?? '-',
            $lamp->sumber_dana ?? '-',
            $lamp->tahun_pengadaan ?? '-',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet->getDelegate();

                // Total rows (headings + data)
                $rowCount = $this->lamps->count() + 1; // +1 untuk header

                // ==== AUTO SIZE SEMUA KOLOM ====
                foreach (range('A', 'L') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }

                // ==== STYLE HEADER ====
                $sheet->getStyle('A1:L1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'color' => ['rgb' => '187F80'], // warna primary #187f80
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                        'wrapText' => true,
                    ],
                ]);

                // Tinggi baris header
                $sheet->getRowDimension(1)->setRowHeight(28);

                // ==== BORDER FULL TABLE ====
                $sheet->getStyle("A1:L{$rowCount}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                ]);

                // ==== ALIGNMENT DATA ====
                $sheet->getStyle("A2:A{$rowCount}")
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);

                $sheet->getStyle("F2:F{$rowCount}")
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);

                // ==== FREEZE HEADER ====
                $sheet->freezePane('A2');
            },
        ];
    }
}
