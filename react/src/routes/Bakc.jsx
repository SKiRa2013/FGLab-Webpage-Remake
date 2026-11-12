import '../App.css';

import { Link } from "../routes/Link.jsx";

export default function Bakc({ previousRoute }) {
    return (
        <>
            <Link to={previousRoute} className="anchor">bakc</Link>
        </>
    );
}
