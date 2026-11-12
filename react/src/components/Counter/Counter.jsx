import { useState } from 'react';

import Button from './Button.jsx';
import { Link } from '../../routes/Link.jsx';

export default function Counter() {

const [counter, setCounter] = useState(7);

    const incrementCounter = () => setCounter(counter + 1);
    const decrementCounter = () => setCounter(counter - 1);

    return (
        <div className="m-12 p-4">
            <h1 className="text-7xl bg-amber-400 rounded-2xl text-white mb-10">Hola mundo</h1>
            
            <div className="mb-10">
                <h1 className="text-2xl font-bold text-white mb-5">Contador: {counter}</h1>
                
                <Button text={'Incrementar'} func={ incrementCounter } color={'blue'}/>
                <Button text={'Decrementar'} func={ decrementCounter } color={'red'} />
            </div>

            <div className="mt-10">
                <Link to='/'> <Button text={"Volver al inicio"} color={'green'} func={()=>{}} /> </Link>
            </div>
        </div>
    );
};
