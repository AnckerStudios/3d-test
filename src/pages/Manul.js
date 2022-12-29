import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopologyList from "../components/topologyComponents/TopologyList";
import authService from "../services/auth.service";


function Manul() {

    const {name} = useParams();


    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        {name}
                    </h4>
                </div>
                
                
            </div>
            <TopologyList cityName={name}/>
        </div>
        
    );
}


export default Manul;