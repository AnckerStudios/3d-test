import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TopologyList from "../components/topologyComponents/TopologyList";


function Monul() {
    


    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        Город N 
                    </h4>
                </div>
                
                
            </div>
            <TopologyList/>
        </div>
        
    );
}


export default Monul;