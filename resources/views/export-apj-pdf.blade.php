<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan LPJU - Dinas Perumahan dan Kawasan Permukiman</title>
    <style>
        /* Reset biar tampilan bersih */
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

        /* HEADER */
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

        /* TABEL */
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
            text-align: left;
        }

        th {
            background-color: #0077b6;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        tr:nth-child(even) {
            background-color: #f1f9ff;
        }

        /* FOOTER (opsional) */
        footer {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #777;
        }

        /* Hindari flex untuk layout rumit (DOMPDF kadang error),
           tapi ini aman untuk header kecil seperti ini */
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


    <main>
        <table>
            <thead>
                <tr>
                    <th>Nama Lampu</th>
                    <th>Tipe Lampu</th>
                    <th>Listrik PLN</th>
                    <th>Terhubung ke Panel</th>
                    <th>Status</th>
                    <th>Alamat</th>
                    <th>Ditambahkan pada</th>
                    <th>LatLng</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($lamps as $item)
                    <tr>
                        <td>{{ $item->name }}</td>
                        <td>{{ $item->type }}</td>
                        <td>{{ $item->listrik_pln }}</td>
                        <td>{{ $item->panel->name ?? '-' }}</td>
                        <td>{{ $item->status }}</td>
                        <td>{{ $item->street->name . ' Kel. ' . $item->street->village->name . ' Kec. ' . $item->street->village->subdistrict->name }}
                        </td>
                        <td>{{ $item->tanggal_formatted }}</td>
                        <td>{{ $item->latitude . ', ' . $item->longitude }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </main>

    <footer>
        Dicetak otomatis oleh Sistem Laporan Dinas Perkim Kota Gorontalo — {{ date('d/m/Y') }}
    </footer>
</body>

</html>
