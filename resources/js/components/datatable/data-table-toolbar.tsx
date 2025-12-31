'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

// import { statuses } from '@/pages/menu-sidebar/Dashboard/data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    children?: React.ReactNode;
    columnFilter?: string;
    titleFilter?: string;
    optionsFilter?: {
        label: string | number;
        value: string | number;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
}

export function DataTableToolbar<TData>({ table, children, columnFilter, titleFilter, optionsFilter }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const isGlobalFiltered = table.getState().globalFilter !== '';
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col items-center not-xl:space-y-2 xl:flex-row xl:space-x-2">
                {/* <Input
                    placeholder="Column search..."
                    value={(table.getColumn('nama')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('nama')?.setFilterValue(event.target.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                /> */}
                <Input
                    placeholder="Cari sesuatu..."
                    value={table.getState().globalFilter}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="w-full bg-gray-50 xl:w-[250px]"
                />
                {columnFilter && optionsFilter && table.getColumn(columnFilter) && (
                    <DataTableFacetedFilter column={table.getColumn(columnFilter)} title={titleFilter} options={optionsFilter} />
                )}
                {isGlobalFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            table.resetColumnFilters();
                            table.setGlobalFilter('');
                        }}
                        className="w-full px-2 xl:w-fit xl:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
                {children}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
