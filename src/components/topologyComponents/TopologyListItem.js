import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import close from "../../images/closeGray.png"
import { getCurRole } from "../../services/auth.service";


function TopologyListItem({topol, del, index}) {
    return (
        <div className=" h-64 w-64 flex relative ">
            <Link className=" bg-blue-200 rounded-xl flex justify-center font-bold items-center hover:bg-orange-300 w-full h-full shadow-lg text-center relative snap-start " to={`/${getCurRole() ? 'topology' : 'modeling'}/${topol?.idTopology}/${topol?.topologyName}`}>
                {topol?.topologyName}
            </Link>
            <div className=" absolute bottom-1 right-3 flex items-center gap-3 ">
                    <div>{topol?.accountName}</div>
            </div>
            {getCurRole() && <div className=" absolute top-1 right-1 z-10" onClick={()=>del(index)}>
                <img src={close} className=" w-7 h-7"></img>
            </div>}
        </div>
    );
}


export default TopologyListItem;