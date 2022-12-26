import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";



function TopologyAddItem({cityName}) {
    return (
        <>
        <div className=" h-40 w-64 flex relative flex-shrink-0 flex-grow">
        <Link className=" bg-slate-300 rounded-xl h-64 w-64 flex justify-center font-bold items-center hover:bg-orange-300" to={`/create-topology/${cityName}`}>+</Link>
        </div>
        
        </>
    );
}


export default TopologyAddItem;