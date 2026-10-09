import './App.css'

import { useState } from 'react'

import Button from "./components/Button"
import Labmem from "./components/Labmem"

function App() {
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
      
      <Labmem />

    </div>
  )
}

export default App
