import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    profile_banner?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
  
export interface Subdistrict {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  villages?: Village[];
}

export interface Village {
  id: string;
  subdistrict_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  streets: Street[];
  subdistrict: Subdistrict;
}

export interface Street {
  id: string;
  village_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  village: Village;
  panels?: Panel[];
  lamps?: Lamp[];
  required_item: RequiredItem;
}

export interface Panel {
  id: string;
  street_id: string;
  street: Street;
  user: User;
  name: string;
  customer_name: string;
  customer_id: string;
  type_panel: PanelType;
  latitude: number;
  power: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}


export type PanelType = 'Prabayar' | 'Pasca Bayar' | 'Non APP'
export type LampType =
  | "Tiang PLN Tanpa PJU"
  | "Tiang PLN / PJU Manual"
  | "Tiang PLN PJU Sodium Jaringan"
  | "Tiang PLN PJU LED Jaringan"
  | "Tiang PJU Single Sodium Jaringan"
  | "Tiang PJU Double Sodium Jaringan"
  | "Tiang PJU Single LED Jaringan"
  | "Tiang PJU Double LED Jaringan"
  | "Tiang Flood Light Jaringan"
  | "Tiang PJUTS";
  
export type ListrikPLN = 'APP' | 'Non APP' | 'Mandiri' | '-';

export interface Lamp {
  id: string;
  user: User;
  user_id: number;
  street_id: string;
  street: Street;
  panel: Panel | null;
  panel_id: string | null;
  user_id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: LampType;
  listrik_pln: ListrikPLN;
  status: StatusLampType;
  sumber_dana: string | null;
  tahun_pengadaan: string | null;
  created_at: string;
  updated_at: string;
}

export interface IconPin {
  id: number;
  path_icon: string;
  created_at: string;
  updated_at: string;
}

export interface RequiredItem extends Totals {
  id: number | string;
  created_at: string;
  updated_at: string;
}

export interface Totals {
  user_id: number
  street_length: number;
  installed_panels_prabayar: number;
  installed_panels_pascabayar: number;
  required_panels: number;
  installed_cable_length: number;
  required_cable_length: number;
  required_lamps: number;
  installed_lamps_via_app: number;
  installed_lamps_non_app: number;
  installed_lamps_mandiri: number;
}

export interface NetworkCable {
    id: number | string;
    user_id: number;
    user: User;
    street_id: number | string;
    street: Street;
    name: string | null;
    polyline: Coordinates[];
    length: number;
    type_cable: TypeCable;
    created_at: string;
    updated_at: string;
}

export type TypeCable = 'Kabel Jaringan TC-2x10mm' | 'Kabel Jaringan TC-4x10mm' | 'Kabel Jaringan TC-4x25mm' | 'Kabel Jaringan NYY-3x4mm';

export type Coordinates = {
    lat: number;
    lng: number;
};
  
export type StatusLampType = 'Menyala' | 'Mati' | 'Rusak' | '-';
