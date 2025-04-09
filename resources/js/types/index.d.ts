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

export interface DistrictLightingStat {
    id?: number;
    district_name: string;
    subdistrict: SubdistrictLightingStat[];
    panel_count: number;
    lamp_count: number;
    cable_length: number;
    created_at?: string;
    updated_at?: string;
    subdistrict_lighting_details?: SubdistrictLightingDetail[];
  }
  
  export interface SubdistrictLightingDetail {
    id?: number;
    district_lighting_stat_id: number;
    district: DistrictLightingStat;
    subdistrict_name: string;
    lamp_count: number;
    cable_length: number;
    created_at?: string;
    updated_at?: string;
    panels?: Panel[];
    lamps?: Lamp[];
  }
  
  export interface Panel {
    id?: number;
    subdistrict_lighting_detail_id: number;
    subdistrict: SubdistrictLightingDetail;
    name?: string | null;
    latitude: number;
    longitude: number;
    status: 'Baik' | 'Rusak';
    created_at?: string;
    updated_at?: string;
  }
  
  export interface Lamp {
    id?: number;
    subdistrict: SubdistrictLightingDetail;
    latitude: number;
    longitude: number;
    type: 'LED' | 'PJUTS' | 'Konvensional';
    created_at?: string;
    updated_at?: string;
  }
  