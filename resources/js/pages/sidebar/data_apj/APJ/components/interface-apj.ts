import { Lamp, Panel, StatusLampType, Street, Subdistrict, Village } from "@/types";

export interface CreateAPJProps {
    lamps: Lamp[];
    panels: Panel[];
    streets: Street[];
    titleForButton?: string
}

export interface PagesAPJProps {
    lamps: Lamp[];
    subdistricts: Subdistrict[];
    streets: Street[];
    panels: Panel[];
}

export interface APJExportPDFProps {
    subdistricts: Subdistrict[];
    villages: Village[];
    streets: Street[];
    filters?: {
        subdistrict: string;
        village: string;
        street: string;
    };
}

export type APJForm = {
    street_id: string;
    status: StatusLampType;
    name: string;
    latitude: number | string;
    longitude: number | string;
    panel_id: string | null;
    type: string;
    listrik_pln: string;
    sumber_dana: string | null;
    tahun_pengadaan: string | null;
};

export type ENUMSumberDana = 'APBD' | 'APBN';