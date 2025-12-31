import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

interface GridBoxProps {
    isDark: boolean;
}

function GridBox({ isDark }: GridBoxProps) {
    const isMobile = useIsMobile();

    return (
        <div
            className={`flex flex-shrink-0 rounded-[2px] ${
                isDark
                    ? "bg-gray-50 dark:bg-neutral-950"
                    : "bg-gray-200 dark:bg-neutral-950 dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
            } ${!isMobile ? "w-32 h-32" : "w-10 h-10"}`}
        />
    );
}

export function GridPattern() {
    const columns = 41;
    const rows = 4;
    const [gridData, setGridData] = useState<boolean[][]>([]);

    useEffect(() => {
        const generateGridData = (): boolean[][] => {
            const data = [];
            for (let row = 0; row < rows; row++) {
                const rowData = [];
                for (let col = 0; col < columns; col++) {
                    rowData.push(Math.random() < 0.9);
                }
                data.push(rowData);
            }
            return data;
        };

        setGridData(generateGridData());
    }, []);

    return (
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px">
            {gridData.map((rowData, rowIndex) =>
                rowData.map((isDark, colIndex) => (
                    <GridBox key={`${colIndex}-${rowIndex}`} isDark={isDark} />
                ))
            )}
        </div>
    );
}