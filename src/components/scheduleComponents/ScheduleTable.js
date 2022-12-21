import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleTable({schedule = [], loading = true}) {

    const items = []
    for(let i = 0; i < schedule.length; i++){
        items.push( <tr key={i} className=' border'>
            <td className=" text-center">{schedule[i].plate.number}</td>
            <td className=" text-center">{schedule[i].plateLine.number}</td>
            <td className=" text-center">{schedule[i].trainName}</td>
            <td className=" text-center">{schedule[i].arrivalTime}</td>
            <td className=" text-center">{schedule[i].departureTime}</td>
            <td className=" text-center">{schedule[i].departureCity}-{schedule[i].arrivalCity}</td>
            <td className=" text-center">{schedule[i].typeTrain}</td>
        </tr>)  
    }
    
    return (
        <div>
        <table className = " ">
            <caption>Расписание</caption>
            
            <thead>
                <tr className=' border'>
                 <th className=" p-2">№ пути</th>
                 <th className=" p-2">№ платф.</th>
                 <th className=" p-2">№ поезда</th>
                 <th className=" p-2">время<br/>прибытия</th>
                 <th className=" p-2">время<br/>отбытия</th>
                 <th className=" p-2">маршрут</th>
                 <th className=" p-2">тип поезда</th>
                 </tr>
            </thead>
            
           
            <tbody>
                {loading ? <div>Loading...</div> : items}
            </tbody>
        </table>
        </div>
        
    );
}


export default ScheduleTable;