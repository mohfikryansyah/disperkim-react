import { Icon } from "leaflet";
import { RequiredItem, Street, Subdistrict } from "./types";

export const TypesLamp = [
  { label: "Tiang PJUTS", value: "Tiang PJUTS" },
  { label: "Tiang PLN Tanpa PJU", value: "Tiang PLN Tanpa PJU" },
  { label: "Tiang PLN / PJU Manual", value: "Tiang PLN / PJU Manual" },
  { label: "Tiang PLN PJU Sodium Jaringan", value: "Tiang PLN PJU Sodium Jaringan" },
  { label: "Tiang PLN PJU LED Jaringan", value: "Tiang PLN PJU LED Jaringan" },
  { label: "Tiang PJU Single Sodium Jaringan", value: "Tiang PJU Single Sodium Jaringan" },
  { label: "Tiang PJU Double Sodium Jaringan", value: "Tiang PJU Double Sodium Jaringan" },
  { label: "Tiang PJU Single LED Jaringan", value: "Tiang PJU Single LED Jaringan" },
  { label: "Tiang PJU Double LED Jaringan", value: "Tiang PJU Double LED Jaringan" },
  { label: "Tiang Flood Light Jaringan", value: "Tiang Flood Light Jaringan" },
] as const;

export const StatusLamp = [
  { label: "Menyala", value: "Menyala" },
  { label: "Mati", value: "Mati" },
  { label: "Rusak", value: "Rusak" },
  { label: "-", value: "-" },
];

export const ListSumberDana = [
  { label: "APBN", value: "APBN" },
  { label: "APBD", value: "APBD" },
];

export const lampTypeCategories = {
  konvensional: [
    "Tiang PLN / PJU Manual",
    "Tiang PLN PJU Sodium Jaringan",
    "Tiang PJU Single Sodium Jaringan",
    "Tiang PJU Double Sodium Jaringan",
  ],
  led: [
    "Tiang PLN PJU LED Jaringan",
    "Tiang PJU Single LED Jaringan",
    "Tiang PJU Double LED Jaringan",
    "Tiang Flood Light Jaringan",
  ],
  ts: [
    "Tiang PJUTS", // Tenaga Surya
  ],
};


export const getLampIconUrl = (lampName: string): string => {
  return iconUrls[lampName] || iconUrls.default
}


export const TypesCable = [
    { label: 'Kabel Jaringan TC-2x10mm', value: 'Kabel Jaringan TC-2x10mm', color: '#ff0000'  },
    { label: 'Kabel Jaringan TC-4x10mm', value: 'Kabel Jaringan TC-4x10mm', color: '#000000'  },
    { label: 'Kabel Jaringan TC-4x25mm', value: 'Kabel Jaringan TC-4x25mm', color: '#ff6600'  },
    { label: 'Kabel Jaringan NYY-3x4mm', value: 'Kabel Jaringan NYY-3x4mm', color: '#00ffff'  },
]


export const ListrikPLN = [
    { label: 'Non APP', value: 'Non APP' },
    { label: 'APP', value: 'APP' },
    { label: 'Mandiri (Tenaga Surya)', value: 'Mandiri' },
    { label: '-', value: '-' },
]

export const TypesPanel = [
    { label: 'Prabayar', value: 'Prabayar' },
    { label: 'Pasca Bayar', value: 'Pasca Bayar' },
    { label: 'Non APP', value: 'Non APP' },
]

const baseIconConfig = {
  iconSize: [40, 40] as [number, number],
  iconAnchor: [20, 36] as [number, number],
  popupAnchor: [8, -38] as [number, number],
  shadowAnchor: [10, 41] as [number, number],
  shadowSize: [41, 41] as [number, number],
}

const iconUrls: Record<string, string> = {
  "Tiang PLN Tanpa PJU": "/images/icon-apj/Tiang-PLN-Tanpa-PJU.png",
  "Tiang PLN / PJU Manual": "/images/icon-apj/Tiang-PLN-PJU-Manual.png",
  "Tiang PLN PJU Sodium Jaringan": "/images/icon-apj/Tiang-PLN-PJU-Sodium-Jaringan.png",
  "Tiang PLN PJU LED Jaringan": "/images/icon-apj/Tiang-PLN-PJU-LED-Jaringan.png",
  "Tiang PJU Single Sodium Jaringan": "/images/icon-apj/Tiang-PJU-Single-Sodium-Jaringan.png",
  "Tiang PJU Double Sodium Jaringan": "/images/icon-apj/Tiang-PJU-Double-Sodium-Jaringan.png",
  "Tiang PJU Single LED Jaringan": "/images/icon-apj/Tiang-PJU-Single-LED-Jaringan.png",
  "Tiang PJU Double LED Jaringan": "/images/icon-apj/Tiang-PJU-Double-LED-Jaringan.png",
  "Tiang Flood Light Jaringan": "/images/icon-apj/Tiang-Flood-Light-Jaringan.png",
  "Tiang PJUTS": "/images/icon-apj/Tiang-PJUTS.png",
  "Pasca Bayar": "/images/icon-apj/Pasca-Bayar.png",
  "Prabayar": "/images/icon-apj/Prabayar.png",
  "Non APP": "/images/icon-apj/Non-APP.png",
  default: "/storage/pin/default.png",
}

export const markerIcon = (name: string) => {
  const iconUrl = iconUrls[name] || iconUrls.default
  return new Icon({ ...baseIconConfig, iconUrl })
}

export const allMarkerIcons: Record<string, Icon> = Object.entries(iconUrls).reduce(
  (acc, [key, url]) => {
    acc[key] = new Icon({ ...baseIconConfig, iconUrl: url })
    return acc
  },
  {} as Record<string, Icon>
)

export function getDiffColor(diff: number) {
  if (diff > 0) return "text-green-600 font-semibold";
  if (diff < 0) return "text-red-600 font-semibold";
  return "text-blue-600 font-semibold";
}


type InputType = Subdistrict | Street;

const isStreet = (input: InputType): input is Street => {
    return (input as Street).required_item !== undefined;
};

const sumFromSubdistrict = (
    subdistrict: Subdistrict,
    extractor: (ri: RequiredItem) => number
): number => {
    return (
        subdistrict.villages?.reduce((accVillage, village) => {
            return (
                accVillage +
                (village.streets?.reduce((accStreet, street) => {
                    const ri = street.required_item;
                    if (!ri) return accStreet;
                    return accStreet + extractor(ri);
                }, 0) || 0)
            );
        }, 0) || 0
    );
};

export const countStreetLength = (input: InputType): number => {
    if (isStreet(input)) {
        return input.required_item?.street_length ?? 0;
    }

    return sumFromSubdistrict(input, (ri) => ri.street_length ?? 0);
};

export const countInstalledLamps = (input: InputType): number => {
    if (isStreet(input)) {
        const ri = input.required_item;
        if (!ri) return 0;
        return (
            (ri.installed_lamps_via_app ?? 0) +
            (ri.installed_lamps_non_app ?? 0) +
            (ri.installed_lamps_mandiri ?? 0)
        );
    }

    return sumFromSubdistrict(input, (ri) =>
        (ri.installed_lamps_via_app ?? 0) +
        (ri.installed_lamps_non_app ?? 0) +
        (ri.installed_lamps_mandiri ?? 0)
    );
};

export const countRequiredLamps = (input: InputType): number => {
    if (isStreet(input)) {
        return input.required_item?.required_lamps ?? 0;
    }

    return sumFromSubdistrict(input, (ri) => ri.required_lamps ?? 0);
};

export const countRequiredPanels = (input: InputType): number => {
    if (isStreet(input)) {
        return input.required_item?.required_panels ?? 0;
    }

    return sumFromSubdistrict(input, (ri) => ri.required_panels ?? 0);
};

export const countRequiredNetworkCable = (input: InputType): number => {
    if (isStreet(input)) {
        return input.required_item?.required_cable_length ?? 0;
    }

    return sumFromSubdistrict(input, (ri) => ri.required_cable_length ?? 0);
};

export const countInstalledPanels = (input: InputType): number => {
    if (isStreet(input)) {
        const ri = input.required_item;
        if (!ri) return 0;
        return (
            (ri.installed_panels_prabayar ?? 0) +
            (ri.installed_panels_pascabayar ?? 0)
        );
    }

    return sumFromSubdistrict(input, (ri) =>
        (ri.installed_panels_prabayar ?? 0) +
        (ri.installed_panels_pascabayar ?? 0)
    );
};

export const countInstalledNetworkCable = (input: InputType): number => {
    if (isStreet(input)) {
        return input.required_item?.installed_cable_length ?? 0;
    }

    return sumFromSubdistrict(input, (ri) => ri.installed_cable_length ?? 0);
};

export const getPath = (url: string) => new URL(url, window.location.origin).pathname;
