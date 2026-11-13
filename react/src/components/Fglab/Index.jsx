import './Fglab.css';

import Hidari from './Hidari.jsx';

export default function Index({ migi }) {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 text-neutral-100 main-container">
            <aside className="w-[200px] flex-shrink-0 border-r border-neutral-800 bg-neutral-950 p-4 overflow-y-auto">
                <Hidari />
            </aside>

            {/* Panel Derecho (antiguo toppu.html / migi) */}
            <main className="flex-1 min-h-0 min-w-0 overflow-y-auto bg-neutral-900">
                { migi }
            </main>
        </div>
    );
};
