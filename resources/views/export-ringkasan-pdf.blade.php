<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Ringkasan LPJU - Dinas Perumahan dan Kawasan Permukiman</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #333;
            background: #fff;
            font-size: 12px;
            margin: 2rem;
        }

        @page {
            size: A4 landscape;
            margin: 40mm;
        }

        .header {
            display: table;
            width: 100%;
            border-bottom: 2px solid #0077b6;
            padding: 10px 0;
            margin-bottom: 15px;
            margin-left: 0;
            margin-right: 0;
        }

        .header-left,
        .header-right {
            display: table-cell;
            vertical-align: middle;
        }

        .header-left {
            width: 80px;
            text-align: center;
        }

        .logo {
            width: 80px;
            height: auto;
        }

        .header-right {
            padding-left: 15px;
        }

        .header-right h1 {
            font-size: 16px;
            color: #023e8a;
            margin-bottom: 4px;
        }

        .header-right h2 {
            font-size: 14px;
            color: #0077b6;
            margin-bottom: 6px;
        }

        .header-right p {
            font-size: 11px;
            color: #444;
        }

        /* ==========================
            TABLE
        =========================== */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 12px;
        }

        th,
        td {
            border: 1px solid #999;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #0077b6;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        .sub-header {
            background-color: #1e9b98;
            color: white;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f1f9ff;
        }

        .diff-positive {
            color: green;
            font-weight: bold;
        }

        .diff-negative {
            color: red;
            font-weight: bold;
        }

        .diff-zero {
            color: black;
        }

        footer {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #777;
        }

        .text-left {
            text-align: left;
        }

        .text-right {
            text-align: right;
        }
    </style>
</head>

<body>

    <header class="header">
        <div class="header-left">
            <img src="file://{{ public_path('logo-kota.png') }}" alt="Logo Kota Gorontalo" class="logo">
        </div>

        <div class="header-right">
            <h1>Dinas Perumahan dan Kawasan Permukiman</h1>
            <h2>Kota Gorontalo</h2>
            <p>Jl. Jend. Sudirman Kel No.64, Limba U II, Kota Sel., Kota Gorontalo, Gorontalo 96115</p>
        </div>
    </header>

    @php
        function diffClassPdf($d)
        {
            if ($d > 0) {
                return 'diff-positive';
            }
            if ($d < 0) {
                return 'diff-negative';
            }
            return 'diff-zero';
        }
    @endphp

    <main>
        <table>
            <thead>
                <tr>
                    <th rowspan="2">No.</th>
                    <th rowspan="2">Nama Kecamatan</th>
                    <th rowspan="2">Panjang Jalan</th>

                    <th colspan="3">Lampu Penerangan (Unit)</th>
                    <th colspan="3">Panjang Kabel Jaringan (Meter)</th>
                    <th colspan="3">KWH Meter</th>
                </tr>

                <tr class="sub-header">
                    <th>Butuh</th>
                    <th>Terpasang</th>
                    <th>Selisih</th>

                    <th>Butuh</th>
                    <th>Terpasang</th>
                    <th>Selisih</th>

                    <th>Butuh</th>
                    <th>Terpasang</th>
                    <th>Selisih</th>
                </tr>

                <tr>
                    @for ($i = 1; $i <= 12; $i++)
                        <td>{{ $i }}</td>
                    @endfor
                </tr>

                <tr>
                    <td colspan="12" style="background:#eef8f8; font-style:italic; color:#444;">
                        Data Kecamatan
                    </td>
                </tr>
            </thead>

            <tbody>
                @foreach ($rows as $index => $row)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td class="text-left">{{ $row['name'] }}</td>
                        <td>{{ $row['streetLength'] }}</td>

                        <td>{{ $row['requiredLamps'] }}</td>
                        <td>{{ $row['installedLamps'] }}</td>
                        <td class="{{ diffClassPdf($row['diffLamps']) }}">
                            {{ $row['diffLamps'] > 0 ? '+' . $row['diffLamps'] : $row['diffLamps'] }}
                        </td>

                        <td>{{ $row['requiredCables'] }}</td>
                        <td>{{ $row['installedCables'] }}</td>
                        <td class="{{ diffClassPdf($row['diffCables']) }}">
                            {{ $row['diffCables'] > 0 ? '+' . $row['diffCables'] : $row['diffCables'] }}
                        </td>

                        <td>{{ $row['requiredPanels'] }}</td>
                        <td>{{ $row['installedPanels'] }}</td>
                        <td class="{{ diffClassPdf($row['diffPanels']) }}">
                            {{ $row['diffPanels'] > 0 ? '+' . $row['diffPanels'] : $row['diffPanels'] }}
                        </td>
                    </tr>
                @endforeach

                @php
                    $tLamp = $totals['installedLamps'] - $totals['requiredLamps'];
                    $tCable = $totals['installedCables'] - $totals['requiredCables'];
                    $tPanel = $totals['installedPanels'] - $totals['requiredPanels'];
                @endphp

                <tr style="background:#dff3f3; font-weight:bold;">
                    <td colspan="2" class="text-right">Total</td>
                    <td>{{ $totals['streetLength'] }}</td>

                    <td>{{ $totals['requiredLamps'] }}</td>
                    <td>{{ $totals['installedLamps'] }}</td>
                    <td class="{{ diffClassPdf($tLamp) }}">{{ $tLamp > 0 ? '+' . $tLamp : $tLamp }}</td>

                    <td>{{ $totals['requiredCables'] }}</td>
                    <td>{{ $totals['installedCables'] }}</td>
                    <td class="{{ diffClassPdf($tCable) }}">{{ $tCable > 0 ? '+' . $tCable : $tCable }}</td>

                    <td>{{ $totals['requiredPanels'] }}</td>
                    <td>{{ $totals['installedPanels'] }}</td>
                    <td class="{{ diffClassPdf($tPanel) }}">{{ $tPanel > 0 ? '+' . $tPanel : $tPanel }}</td>
                </tr>
            </tbody>
        </table>
    </main>

    <footer>
        Dicetak otomatis oleh Sistem Laporan Dinas Perkim Kota Gorontalo — {{ date('d/m/Y') }}
    </footer>

</body>

</html>
