import '../Fglab.css';
import '../../../App.css';

import { Link } from '../../../routes/Link.jsx';
import Bakc from '../../../routes/Bakc.jsx';

export default function Labo() {
    return (
        <div className="bg-haikei fglab-container" style={{ fontSize: '16px' }}>
            <p className="mb-8"><strong style={{ fontSize: '36px' }}>About Lab</strong></p>

            <p className="mb-6">~Vanishment this world like nightmares is our objective us fugitives of eternity~</p>

            <Link to={"/katudou"} className="anchor mb-3">Road of procure the chaotic</Link>
            <Link to={"/rabomen"} className="anchor mb-3">True name's of those chosen</Link>
            <Link to={"/kyuujin"} className="anchor mb-3">Want the strength?</Link>
            
            <div className="space-y-3 mt-8">
                <Link to={"/menseki"} className="anchor">about site</Link>
            </div>

            <div className="space-y-3 mt-8">
                <Bakc previousRoute={"/"} />
            </div>

            {
                // Gotta make sure you write this part, durr
            }
        </div>
    );
};
