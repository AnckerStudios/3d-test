import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import infoLogo from '../images/info.png';
import toolLogo from '../images/logo192.png';


function ToolListElement({setTool, tool, selectedTool}) {
    

    function selectTool(){
        setTool(tool.id)
    }
    return (
        <div className={` w-full rounded-xl aspect-square ${selectedTool === tool.id ? ' bg-orange-300' : 'bg-slate-200'} flex-col p-2 shadow-md flex gap-y-2 relative`} onClick={() => selectTool()}>
            <div className={` w-full h-full rounded-xl  ${selectedTool === tool.id ?  ' bg-amber-700': 'bg-slate-400'}`}>
                <img src={toolLogo}/>
            </div>
            <div className="m-auto font-bold flex">{tool.name}
                
            </div>
            <div className=" absolute bottom-2 right-2 w-15 h-15">
                    <img width="20" height="20" src={infoLogo}/>
                </div>
        </div>
    );
}


export default ToolListElement;