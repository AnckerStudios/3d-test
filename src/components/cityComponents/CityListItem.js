import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function CityListItem({city}) {
    return (
        <div className="aspect-square w-3/12 flex relative ">
            <Link className=" bg-slate-300 rounded-xl w-full h-full flex justify-center font-bold items-center hover:bg-orange-300 snap-start " to={`/city/${city.cityName}`}>{city.cityName}</Link>
            <div className=" absolute bottom-1 right-3 flex items-center gap-3 ">
                    <div>{`${city?.countTopology} топологий`}</div>
                    <div className=" h-3 w-3 rounded-full bg-red-600 shadow-xl "/>
            </div>
        </div>
    );
}


export default CityListItem;