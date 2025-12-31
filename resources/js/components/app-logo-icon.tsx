import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/logo-kota.png" alt="Logo Kota Gorontalo" {...props}/>
    );
}
