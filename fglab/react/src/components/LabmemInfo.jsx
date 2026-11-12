import React from "react";
import { COLOR_MAP } from "../constants/colors";

export default function LabmemInfo({labmem}) {
    if(!labmem) {
        return <h1 className="text-white">Cargando labmems...</h1>
    }

    return (
        <div className={`rounded-lg p-4 text-white w-100 ${COLOR_MAP.labmem}`}>
            <img src={labmem.img}
            alt="labmem-img"
            className="w-100 h-150 object-cover" />

            <div>
                <h2 className="text-xl font-semibold capitalize text-white">
                    {labmem.name}
                </h2>

                <p className="text-white">ID: {labmem.code}</p>
            </div>
        </div>
    );
};
