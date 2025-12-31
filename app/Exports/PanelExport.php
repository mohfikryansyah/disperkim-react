<?php

namespace App\Exports;

use App\Models\Panel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class PanelExport implements FromCollection, WithHeadings, WithMapping, WithEvents, WithColumnFormatting    
{
    protected $panels;
    private int $rowNumber = 1;

    public function __construct($panels)
    {
        $this->panels = $panels;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->panels;
    }

    public function headings(): array
    {
        return [
            'No.',
            'Kecamatan',
            'Desa',
            'Jalan',
            'Nama Panel',
            'ID Pelanggan',
            'Nama Pelanggan',
            'Daya (Watt)',
            'Latitdude',
            'Longitude',
            'Ditambahkan Pada',
        ];
    }

    public function map($panel): array
    {
        return [
            $this->rowNumber++,
            $panel->street->village->subdistrict->name ?? '-',
            $panel->street->village->name ?? '-',
            $panel->street->name ?? '-',
            $panel->name ?? '-',
            $panel->customer_id,
            $panel->customer_name,
            $panel->power,
            $panel->latitude,
            $panel->longitude,
            $panel->tanggal_formatted,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet->getDelegate();

                $rowCount = $this->panels->count() + 1;

                foreach (range('A', 'K') as $column) {
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                }

                $sheet->getStyle('A1:K1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['rgb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'color' => ['rgb' => '187F80'],
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                        'wrapText' => true,
                    ],
                ]);

                $sheet->getRowDimension(1)->setRowHeight(28);

                $sheet->getStyle("A1:K{$rowCount}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['rgb' => '000000'],
                        ],
                    ],
                ]);

                $sheet->getStyle("A2:A{$rowCount}")
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);

                $sheet->getStyle("F2:F{$rowCount}")
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);

                $sheet->freezePane('A2');
            },
        ];
    }

    public function columnFormats(): array
    {
        return [
            'F' => NumberFormat::FORMAT_NUMBER,
        ];
    }
}
