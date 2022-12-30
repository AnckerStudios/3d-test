import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const data = [
  {plate: 1, plateLine: {x:0,y:0,number:1}, train : {idTrain: 2, nameTrain: "2fasd", typeTrain:"Грузовой", numberOfWagons:2}, arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10"},
  {plate: 1, plateLine: {x:0,y:0,number:1}, train : {idTrain: 2, nameTrain: "2fasd", typeTrain:"Грузовой", numberOfWagons:2}, arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10"},
  {plate: 1, plateLine: {x:0,y:0,number:1}, train : {idTrain: 2, nameTrain: "2fasd", typeTrain:"Грузовой", numberOfWagons:2}, arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10"},
  {plate: 1, plateLine: {x:0,y:0,number:1}, train : {idTrain: 2, nameTrain: "2fasd", typeTrain:"Грузовой", numberOfWagons:2}, arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10"},
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
        console.log("Расписание с бд",response);
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

  function del(index){
    let copy = Object.assign([], schedule);
    copy.splice(index,1)
    setSchedule(copy);
}

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
                  <td className=" text-center">{sch?.plate}</td>
                  <td className=" text-center">{sch?.plateLine?.number}</td>
                  <td className=" text-center">{sch?.train?.nameTrain}</td>
                  <td className=" text-center">{sch?.arrivalTime}</td>
                  <td className=" text-center">{sch?.departureTime}</td>
                  <td className=" text-center">{sch?.departureCity}-{sch?.arrivalCity}</td>
                  <td className=" text-center"> <div className=' flex justify-around items-center'> <div>{sch?.train?.typeTrain}</div><button className=' px-2 bg-pink-300 rounded-xl shadow-xl hover:bg-red-500' onClick={()=>del(index)}>X</button></div></td>
                </tr>
              })}

          </tbody>
        </table>
      </div> </>
  );
}


export default ScheduleTable;