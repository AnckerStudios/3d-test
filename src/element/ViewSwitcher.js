import { Canvas } from "@react-three/fiber";

import { useEffect, useState } from "react";
import Cell from "./Cell";
import Editor from "./Editor";


import Preview from "./Preview";
import ToolListElement from "./ToolListElement";
import Train from "./Train";

function ViewSwitcher({setView}) {
    


    return (
        <div className=" w-24 h-15 absolute  rounded-xl top-4 right-4 bg-slate-200 flex shadow-md">
            <button className=" w-1/2 h-full rounded-l-xl bg-slate-400 flex p-2 justify-center font-bold" onClick={() => setView(true)}>3D</button>
            <button className=" w-1/2 h-full rounded-xl bg-slate-200 flex p-2 justify-center font-bold" onClick={() => setView(false)}>2D</button>
        </div>

    );
}

export default ViewSwitcher;
