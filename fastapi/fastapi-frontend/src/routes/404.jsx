import { Link } from "./Link.jsx";
import Button from "../components/Counter/Button.jsx";

export default function Page404 () {
    return (
        <div className="m-12 p-4">
            <div>
                <h1>404 Wrong Timeline!</h1>
                <img src="/Data/1f.jpg" alt="Mr. Braun CRT Shop"></img>
            </div>
            
            <Link to="/"> <Button text="Volver al inicio" func={()=>{}} color={'green'} /> </Link>

        </div>
    );
};
