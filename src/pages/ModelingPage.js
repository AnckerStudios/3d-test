import { useFrame } from "@react-three/fiber";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Modeling from "../element/Modeling";
import TopologyListItem from "../element/TopologyListItem";
import { createMtrx } from "../logic/EditorLogic";


function ModelingPage() {
    const [mtrx, setMtrx] = useState(createMtrx(16,16));

    let test = {start: {x:0,y:0,dir:2}, end:{x:15,y:4,dir:2}, stop: {x:11, y:4}, time: 1, wagons: 3, way: [{x:0,y:0,dir:2},{x:1,y:0,dir:2},{x:2,y:0,dir:1},{x:3,y:1,dir:1},{x:4,y:2,dir:1},{x:5,y:3,dir:1},{x:6,y:4,dir:2},{x:7,y:4,dir:2},{x:8,y:4,dir:2},{x:9,y:4,dir:2},{x:10,y:4,dir:2},{x:11,y:4,dir:2},{x:12,y:4,dir:2},{x:13,y:4,dir:2},{x:14,y:4,dir:2},{x:15,y:4,dir:2}]}
    let test2 = {start: {x:0,y:0,dir:2}, end:{x:15,y:4,dir:2}, stop: {x:11, y:4}, time: 5, wagons:3, way: [{x:0,y:0,dir:2},{x:1,y:0,dir:2},{x:2,y:0,dir:1},{x:3,y:1,dir:1},{x:4,y:2,dir:1},{x:5,y:3,dir:1},{x:6,y:4,dir:2},{x:7,y:4,dir:2},{x:8,y:4,dir:2},{x:9,y:4,dir:2},{x:10,y:4,dir:2},{x:11,y:4,dir:2},{x:12,y:4,dir:2},{x:13,y:4,dir:2},{x:14,y:4,dir:2},{x:15,y:4,dir:2}]}
    let ways = [test]
    const [timer, setTimer] = useState(0)
    const countRef = useRef(null)
    const handleStart = () => {
        //setIsActive(true)
        //setIsPaused(true)
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1)
        }, 10)
      }

    return (
    <div className="w-full h-screen flex p-4">
        
         
        <div className=" w-full h-full rounded-xl bg-slate-300 shadow-md relative">
            <div className=" w-40 h-full absolute  left-4 top-4 flex flex-col  gap-y-4">
                <div className={` w-full rounded-xl h-20 bg-slate-200 flex-col p-5 justify-center shadow-md flex gap-y-2 relative text-right font-bold`} >
                    {timer}
                </div>  
            </div>
            <Modeling mtrx={mtrx} ways={ways} timer={timer}/>
            <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={() => handleStart()}>
                Go
            </button>
        </div>
    </div>
        
    );
}


export default ModelingPage;