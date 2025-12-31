import { IconPin, Lamp, Panel, PanelType, Street, Subdistrict } from "@/types";

export interface CreatePanelProps {
    panels: Panel[];
    lamps: Lamp[];
    streets: Street[];
    titleForButton?: string
}

export interface PagePanelProps extends CreatePanelProps {
    subdistricts: Subdistrict[]
}


export type PanelForm = {
    street_id: string;
    latitude: number;
    longitude: number;
    type_panel: PanelType;
    power: number | undefined;
    name: string;
    customer_name: string;
    customer_id: string;
};