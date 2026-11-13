import '../Fglab.css';
import '../../../App.css';

import Bakc from '../../../routes/Bakc.jsx';

export default function Katudou() {
    return (
        <div className="bg-haikei fglab-container" style={{ fontSize: "16px" }}>
            <p className="mb-3">Chaotic Road</p>
            <p className="mb-3"><strong style={{fontSize: "36px" }}>Road of procure the chaotic</strong></p>
            <p className="mb-3">~We is not to be stopped- never. Not until grab in this palm~</p>
            
            <p className="mb-7">Supreme objective (function) of Future Gadget Laboratory is "of doing invent".</p>
            <p className="mb-3">By invention by his companions and mad scientist Hououin Kyouma of madness, do destroy the governance structure in the shadows that manipulate world, and in result world surely head to chaos.</p>
            <p className="mb-7">It is of the selection of Door of Destiny Stone- Steins Gate. El Psy Kongroo.</p>
            
            {
                //    Why must it come to this
            }

            <Bakc previousRoute={"/labo"} className="mt-8" />
        </div>
    );
};
