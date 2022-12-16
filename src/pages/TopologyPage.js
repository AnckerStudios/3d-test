import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModalDateSelector from "../components/scheduleComponents/ModalDateSelector";
import ScheduleList from "../components/scheduleComponents/ScheduleList";
import TopologyListItem from "../element/TopologyListItem";


function TopologyPage() {
    const {id} = useParams();
    function load(){
        axios.get('http://localhost:8080/api/field', {
           
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (

        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        Name 
                    </h4>
                </div>
                <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
                    <div className=" bg-slate-300 rounded-xl h-96 w-full"></div>
                    <div className=" bg-slate-300 rounded-xl h-96 w-full  md:w-1/3 flex flex-col justify-between">
                        <div className="m-2 ">
                            Enim et commodo culpa aliqua ullamco sit ut duis occaecat. Ex aliqua reprehenderit anim quis veniam mollit eiusmod incididunt aliqua commodo mollit voluptate ut. Nulla do sit commodo commodo. Irure id dolore ipsum id consectetur ex nulla nisi culpa voluptate quis consequat enim.                             
                        </div>
                        <button className=" border hover:bg-white rounded-xl  m-2 flex justify-center" onClick={() => load()}>
                            <Link className=" m-2 " to={`/topology-editor/${id}`}>button</Link>
                        </button>
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