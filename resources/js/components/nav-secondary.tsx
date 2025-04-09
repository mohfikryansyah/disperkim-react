import * as React from 'react';

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { usePage } from '@inertiajs/react';

export function NavSecondary({ items, ...props }: { items: NavItem[] } & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const page = usePage()
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Lokasi</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.href.endsWith(page.url)}>
                            <a href={item.href}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
