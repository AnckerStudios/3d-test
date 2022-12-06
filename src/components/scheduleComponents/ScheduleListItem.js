import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleListItem({name, id}) {
    return (
        <Link className=" bg-slate-300 rounded-xl h-64 w-64 flex justify-center font-bold items-center hover:bg-orange-300" to={`/schedule-editor/${id}`}>{name}</Link>
        
    );
}


export default ScheduleListItem;