import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import close from "../../images/closeGray.png"


function TopologyListItem({name,id, del, index}) {
    return (
        <div className=" h-64 w-64 flex relative ">
            <Link className=" bg-slate-300 rounded-xl flex justify-center font-bold items-center hover:bg-orange-300 w-full h-full shadow-lg text-center relative snap-start " to={`/topology/${id}/${name}`}>
                {name}
            </Link>
            <div className=" absolute top-1 right-1 z-10" onClick={()=>del(index)}>
                <img src={close} className=" w-7 h-7"></img>
            </div>
        </div>
    );
}


export default TopologyListItem;