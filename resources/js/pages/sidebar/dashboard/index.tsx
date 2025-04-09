import AppLayout from '@/layouts/app-layout';
import { Barchart } from './charts/barchart';
import { Piechart } from './charts/piechart';
import Echart from './charts/echart';

export default function Index() {
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-5">
                    <Barchart />
                    {/* <Piechart /> */}
                    <Echart/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
