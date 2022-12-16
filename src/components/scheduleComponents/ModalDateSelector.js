import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ModalDateSelector({set}) {
    const [date, setDate] = useState();
    return (
        <div className=" w-96 h-96 bg-slate-300 rounded-xl p-8 flex flex-col gap-4 justify-center items-center">
            Ты лох, ха-ха
           <input className = " rounded-lg text-center"  type = "text" minLength = "8" maxLength = "8" onChange={(e)=>setDate(e.target.value)}/> 
           <button className=" bg-slate-200 hover:bg-fuchsia-300 w-24 p-2 rounded-xl shadow-xl" onClick={()=>set(date)}>ok</button>
        </div>
        
    );
}


export default ModalDateSelector;