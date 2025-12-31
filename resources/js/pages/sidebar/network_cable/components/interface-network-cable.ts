import { Lamp, NetworkCable, Panel, Street } from "@/types";

export interface PageCableNetworkProps {
    lamps: Lamp[];
    panels: Panel[];
    streetsForCreate: Street[];
    networkCables: NetworkCable[];
}