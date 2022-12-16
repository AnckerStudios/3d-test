import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleTable({schedule}) {

    const items = []
    for(let i = 0; i < schedule.length; i++){
        items.push( <tr>
            <td>{schedule[i].plate.number}</td>
            <td>{schedule[i].plateLine.number}</td>
            <td>{schedule[i].trainName}</td>
            <td>{schedule[i].arrivalTime.h}:{schedule[i].arrivalTime.m}</td>
            <td>{schedule[i].departureTime.h}:{schedule[i].departureTime.m}</td>
            <td>{schedule[i].marshrut.otp}-{schedule[i].marshrut.pr}</td>
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