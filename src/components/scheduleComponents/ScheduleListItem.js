import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import close from "../../images/closeGray.png"

function ScheduleListItem({date, id, del, idTopology}) {
    
    return (
        <div className=" h-40 w-64 flex relative flex-shrink-0 flex-grow">
            <Link className=" bg-slate-300 rounded-xl w-full h-full flex justify-center font-bold items-center hover:bg-orange-300 shadow-lg text-center relative snap-start " to={`/schedule-editor/${idTopology}/${date}`}>
                {date}
                <div className=" absolute bottom-1 right-3 flex items-center gap-3 ">
                    <div>avtor</div>
                    <div className=" h-3 w-3 rounded-full bg-red-600 shadow-xl "/>
                </div>
            </Link>
            <div className=" absolute top-1 right-1 z-10" onClick={()=>del(id)}>
                <img src={close} className=" w-7 h-7"></img>
            </div>
        </div>
        
    );
}


export default ScheduleListItem;