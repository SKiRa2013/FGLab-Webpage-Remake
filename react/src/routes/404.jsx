import { Link } from "./Link.jsx";
import Button from "../components/Counter/Button.jsx";

export default function Page404 () {
    return (
        <div className="bg-haikei bg-black min-h-screen w-full flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="m-2 p-4 flex flex-col items-center">
                <h1>404 Wrong Timeline!</h1>
                <img src="/Data/1f.jpg" alt="Mr. Braun CRT Shop" />
            </div>

            <div className='mt-6'>
                <Link to="/"> <Button text="Volver al inicio" func={()=>{}} color={'green'} /> </Link>
            </div>
        </div>
    );
};
