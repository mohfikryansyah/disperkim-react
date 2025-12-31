import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function NavbarLogo({
    logoRef,
    textColor,
    logo,
}: {
    logoRef?: any;
    textColor?: string;
    logo?: string;
}) {
    return (
        <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <div className={logo}>
                <img
                    src="/logo-kota.png"
                    className="w-9 h-auto"
                    alt="Logo Kota Gorontalo"
                />
            </div>
            <div
                ref={logoRef}
                className={cn("-space-y-2 text-gray-800", textColor)}
            >
                <p className="self-center text-base tracking-widest font-normal whitespace-nowrap">
                    DISPERKIM
                </p>
                <p className="self-center text-base font-normal whitespace-nowrap">
                    GORONTALO
                </p>
            </div>
        </Link>
    );
}
