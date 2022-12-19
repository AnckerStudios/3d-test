import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleTable({schedule}) {

    const items = []
    for(let i = 0; i < schedule.length; i++){
        items.push( <tr key={i}>
            <td>{schedule[i].plate.number}</td>
            <td>{schedule[i].plateLine.number}</td>
            <td>{schedule[i].trainName}</td>
            <td>{schedule[i].arrivalTime}</td>
            <td>{schedule[i].departureTime}</td>
            <td>{schedule[i].departureCity}-{schedule[i].arrivalCity}</td>
            <td>{schedule[i].typeTrain}</td>
        </tr>)  
    }
    
    return (
        <table className = "table2">
            <caption>Расписание</caption>
            <thead>
            <tr className='trtab'>
                <th>№ платф.</th>
                <th>№ пути</th>
                <th>№ поезда</th>
                <th>время<br/>прибытия</th>
                <th>время<br/>отбытия</th>
                <th>маршрут</th>
                <th>тип поезда</th>
             </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
        
    );
}


export default ScheduleTable;