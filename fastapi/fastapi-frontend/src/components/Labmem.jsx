import React from "react";

import { useEffect, useState } from 'react';
import LabmemInfo from "./LabmemInfo";


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
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                sortedLabmems.map((labmem, index) => (
                    <LabmemInfo className="m-5" key={index} labmem={labmem}/>
                ))
            }
        </div>
    );
};
