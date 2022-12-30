import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function ScheduleTable2({schedule = [], loading = true}) {

    const items = []
    for(let i = 0; i < schedule.length; i++){
        items.push( <tr key={i} className=' border'>
            <td className=" text-center">{schedule[i]?.record?.plate}</td>
            <td className=" text-center">{schedule[i]?.record?.plateLine?.number}</td>
            <td className=" text-center">{schedule[i]?.record?.train?.nameTrain}</td>
            <td className=" text-center">{schedule[i]?.record?.arrivalTime}</td>
            <td className=" text-center">{schedule[i]?.record?.departureTime}</td>
            <td className=" text-center">{schedule[i]?.record?.departureCity}-{schedule[i]?.record?.arrivalCity}</td>
            <td className=" text-center">{schedule[i]?.record?.train?.typeTrain}</td>
        </tr>)  
    }
    
    return (
        <div className='divwithtable'>
          <table className="table3">
            <caption>Расписание</caption>
            <thead>
              <tr className='trtab'>
                <th>№ платф.</th>
                <th>№ пути</th>
                <th>№ поезда</th>
                <th>время<br />прибытия</th>
                <th>время<br />отбытия</th>
                <th>маршрут</th>
                <th>тип поезда</th>
              </tr>
            </thead>
            <tbody>
                {loading ? <div>Loading...</div> : items}
            </tbody>
          </table>
        </div>
        
    );
}


export default ScheduleTable2;