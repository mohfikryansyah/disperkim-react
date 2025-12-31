import { Lamp, Panel, Street, Subdistrict, Totals } from "@/types";

export interface LampDataBarChart {
    village_name: string;
    lamp_count: number;
}


export type InstalledLampData = {
    [subdistrictName: string]: {
        installed_lamps_mandiri: number;
        installed_lamps_via_app: number;
        installed_lamps_non_app: number;
    };
};

export interface PropsDashboard {
    totals: Totals;
    totalsPerKecamatans: InstalledLampData;
    subdistricts: Subdistrict[];
    lampsStatistic: LampDataBarChart[];
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItem[]
    cableLength: number;
    streets: Street[];
    lamps: Lamp[];
    panels: Panel[]
}

export interface LampsStatisticForRequiredItem {
    subdistrict_name: string,
    lampu_terpasang: number,
    lampu_belum_terpasang: number,
    lampu_dibutuhkan: number,
}

export interface PropsRequiredItemChart{
    subdistricts: Subdistrict[];
    className?: string;
    lampsStatisticForRequiredItem: LampsStatisticForRequiredItem[]
}