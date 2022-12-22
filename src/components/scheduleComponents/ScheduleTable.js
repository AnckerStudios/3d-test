import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const data = [
  {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "D500A", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
  {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
  {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
  {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
  ];

function ScheduleTable({id,date,setSchedule, schedule, isCreate}) {
  //const[schedule,setSchedule] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(isCreate === undefined){
    setLoading(true);
    axios.get('http://localhost:8080/api/schedule/', {
      params: {
        idTopology: id, //или дату и id топологии
        date: date
      }
    })
      .then(function (response) {
        setSchedule(response.data);
        console.log(response);
        setLoading(false);
      })
      .catch(function (error) {
        setSchedule(data); //убрать
        console.log(error);
        setLoading(false);
      });
    }else{
      setLoading(false);
    }
  }, [])



  return (
    <>

      <div className='divwithtable'>
        <table className="table2">
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

              {loading ? <div>Погоди...</div> : schedule?.map((sch, index) => {
                return <tr key={index} className=' border'>
                  <td className=" text-center">{sch.plate.number}</td>
                  <td className=" text-center">{sch.plateLine.number}</td>
                  <td className=" text-center">{sch.trainName}</td>
                  <td className=" text-center">{sch.arrivalTime}</td>
                  <td className=" text-center">{sch.departureTime}</td>
                  <td className=" text-center">{sch.departureCity}-{sch.arrivalCity}</td>
                  <td className=" text-center">{sch.typeTrain}</td>
                </tr>
              })}

          </tbody>
        </table>
      </div> </>
  );
}


export default ScheduleTable;