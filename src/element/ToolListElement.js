import axios from "axios";
import React, { useEffect, useRef, useState } from "react";



function ToolListElement({setTool, tool='Tool'}) {
    return (
        <div className=" w-full rounded-xl aspect-square bg-slate-200 flex-col p-2 shadow-md flex gap-y-2 relative" onClick={() => setTool(tool)}>
            <div className=" w-full h-full rounded-xl bg-slate-400 ">

            </div>
            <div className="m-auto font-bold flex">{tool.name}
                
            </div>
            <div className=" absolute bottom-2 right-2 w-15 h-15">
                    <img width="20" height="20" src="./info.png"/>
                </div>
        </div>
    );
}


export default ToolListElement;