import { useEffect, useState } from 'react';

import { Link } from "../../routes/Link.jsx";

import LabmemInfo from "./LabmemInfo.jsx";
import Button from "../Counter/Button.jsx";

export default function Labmem(){

    const [labmemData, setLabmemData] = useState([]);
    const BASE_URL = 'http://localhost:8000/labmem/';

    const fetchLabmem = async (id) => {
        try{
            const response = await fetch(`${BASE_URL}${id}/`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            setLabmemData(
                (prevLabmemData) => [...prevLabmemData, data[0]]
            );
        } catch (error){
            console.error("ERROR IN LABMEM FETCH:", error);
        };
    };

    const fetchAllLabmem = () => {
        setLabmemData([]);

        for (let i = 1; i <= 11; i++){
            fetchLabmem(i);
        }   
    };

    // Executes once, at the moment the page loads
    useEffect(() => {
        fetchAllLabmem();
    }, []);

    useEffect(() => {
        console.log(labmemData);
    }, [labmemData]);
    ///////////////////////////////////////////////

    const uniqueLabmems = Array.from(
        new Map(labmemData.map((labmem) => [labmem?.code, labmem])).values()
    );

    const sortedLabmems = uniqueLabmems.sort((a, b) => a.code - b.code);

    return (  
        <div className="m-3 p-1">
            <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    sortedLabmems.length <= 0 ? 
                        <h1 className="text-white">Cargando labmems...</h1>
                    :
                        sortedLabmems.map((labmem, index) => (
                            <LabmemInfo className="m-5" key={index} labmem={labmem}/>
                        ))
                }
            </div>
            <div className="mt-10">
                <Link to='/'> <Button text={"Volver al inicio"} color={'green'} func={()=>{}} /> </Link>
            </div>
        </div> 
    );
};
