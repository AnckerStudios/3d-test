import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CityList from "../components/cityComponents/CityList";
import CityListManagerT from "../components/cityComponents/CityListManagerT";



function CitysPage() {
    


    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        Города
                    </h4>
                </div>
                <CityListManagerT/>
                
            </div>
           
        </div>
        
    );
}


export default CitysPage;