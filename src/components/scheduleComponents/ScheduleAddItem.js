import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalDateSelector from "./ModalDateSelector";


function ScheduleAddItem({idTopology,schedules}) {
    const [date,setDate] = useState("2022-01-01");
    let navigate = useNavigate();
    function createSchedule(){
        let revDate = date.split('-');
        revDate = revDate[2]+'-'+revDate[1]+'-'+revDate[0];
        
        for(let schedule of schedules){
            if(schedule.timetableDate === revDate){
                return;
            }
        }
        
        navigate(`/schedule-editor/${idTopology}/${revDate}/create`); 
    }
    return (
        <>
        <div className=" h-40 w-64 flex relative flex-shrink-0 flex-grow">
        
            <div className=" bg-slate-300 rounded-xl w-full h-full flex gap-2 justify-center font-bold items-center shadow-lg text-center relative snap-start " to={`/schedule-editor/${idTopology}/create`}>
            <input type="date" className="  outline-none  rounded-xl shadow-lg bg-slate-200 p-2 cursor-pointer hover:bg-orange-300" value={date} min="2022-01-01" max="2022-12-31" onChange={(e)=>setDate(e.target.value)} />
            <button className=" rounded-xl shadow-lg bg-slate-200 py-2 px-4 hover:bg-orange-300" onClick={()=>createSchedule()}>ok</button>
            </div>
        </div>
        
        </>
    );
}


export default ScheduleAddItem;