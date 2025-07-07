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
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
  
export interface Subdistrict {
  id: number | string;
  name: string;
  created_at: string;
  updated_at: string;
  villages?: Village[];
}

export interface Village {
  id: number | string;
  subdistrict_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  streets: Street[];
  subdistrict: Subdistrict;
}

export interface Street {
  id: number | string;
  village_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  village: Village;
  panels?: Panel[];
  lamps?: Lamp[];
}

export interface Panel {
  id: number;
  street_id: number;
  user_id: number;
  name: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}


export type LampType = 'LED' | 'Tenaga Surya' | 'Konvensional'

export interface Lamp {
  id: number;
  icon: IconPin;
  user: User;
  street_id: number;
  street: Street;
  user_id: number;
  latitude: number;
  longitude: number;
  type: LampType;
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
  id: number;
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

export interface IconPin {
  id: number;
  name: string;
  path_icon: string;
  created_at: string;
  updated_at: string;
}
  