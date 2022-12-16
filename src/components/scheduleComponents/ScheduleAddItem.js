import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ModalDateSelector from "./ModalDateSelector";


function ScheduleAddItem({idTopology}) {
    return (
        <>
        <div className=" h-40 w-64 flex relative flex-shrink-0 flex-grow">
            <Link className=" bg-slate-300 rounded-xl w-full h-full flex justify-center font-bold items-center hover:bg-orange-300 shadow-lg text-center relative snap-start " to={`/schedule-editor/${idTopology}/create`}>
            +
            </Link>
        </div>
        
        </>
    );
}


export default ScheduleAddItem;