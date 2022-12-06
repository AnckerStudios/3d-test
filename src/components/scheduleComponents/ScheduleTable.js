import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleTable({schedule}) {

    const items = []
    for(let i = 0; i < schedule.length; i++){
        items.push( <tr>
            <td>{schedule[i].nplat}</td>
            <td>{schedule[i].nputi}</td>
            <td>{schedule[i].npoezd}</td>
            <td>{schedule[i].timepr.h}:{schedule[i].timepr.m}</td>
            <td>{schedule[i].timeotp.h}:{schedule[i].timeotp.m}</td>
            <td>{schedule[i].marshrut.otp}-{schedule[i].marshrut.pr}</td>
            <td>{schedule[i].type}</td>
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