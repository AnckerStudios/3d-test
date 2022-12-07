import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleAddItem() {
    return (
        <Link className=" bg-slate-300 rounded-xl h-64 w-64 flex justify-center font-bold items-center hover:bg-orange-300" to={`/create-schedule/`}>+</Link>
        
    );
}


export default ScheduleAddItem;