import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScheduleList from "../components/scheduleComponents/ScheduleList";


function TopologyPage() {
    const {id,name} = useParams();
    // function load(){
    //     axios.get('http://localhost:8080/api/field', {
           
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    return (

        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        {name} 
                    </h4>
                </div>
                <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
                    <div className=" bg-slate-300 rounded-xl h-96 w-full flex items-center justify-center">

                    <Link className=" border bg-slate-200 hover:bg-slate-400 rounded-xl  p-2 flex justify-center" to={`/topology-editor/${id}/${name}`}>Редактировать</Link>
                    </div>

                    
                            
                        
                 
            
            
                </div>
                <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-2 p-2">
                    <ScheduleList id={id}/>
                </div>
            </div>
            
        </div>

        
    );
}


export default TopologyPage;