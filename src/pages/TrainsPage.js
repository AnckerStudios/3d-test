import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TopologyList from "../components/topologyComponents/TopologyList";
import TrainAddModal from "../components/trainsComponents/TrainAddModal";
import TrainsList from "../components/trainsComponents/TrainsList";


function TrainsPage() {
    


    return (
        <div className="w-full h-screen flex p-4">
            <div className=" w-full h-full rounded-xl bg-blue-100 shadow-md flex justify-center ">
                <div className="  w-1/3 h-full flex flex-col pb-4">
                    <h4 className="font-bold text-4xl text-slate-900 py-5">
                        Список поездов
                    </h4>
                    <TrainsList/>
                </div>
            </div>
            
        </div>
        
    );
}


export default TrainsPage;