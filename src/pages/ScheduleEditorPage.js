import '../pagesStyle/ScheduleEditorPage.css';
import AddEntry from '../components/scheduleComponents/AddEntry';
import ScheduleTable from '../components/scheduleComponents/ScheduleTable';
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ModalDateSelector from '../components/scheduleComponents/ModalDateSelector';
import ScheduleTable2 from '../components/scheduleComponents/ScheduleTable2';


function ScheduleEditorPage() {

    const {id, date} = useParams();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const data = [
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "D500A", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10",typeTrain:"п"},
        ];
    
    useEffect(()=>{
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
    },[])

    function Save(){
        axios.post('http://localhost:8080/api/schedule/save',schedule,{
            params: {
                idTopology: id,
                date: date
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    
    const nplat = ['1','2','3','4']
    const nput = ['1','2','3','4']
    const type = ['Пассаж.','Груз.','Электричка']
    const sity = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
        const sitys = []
            for(let i = 0; i < sity.length; i++){
                 sitys.push(<option>{sity[i].city}</option>)  
            }
            const types = []
            for(let i = 0; i < type.length; i++){
                 types.push(<option>{type[i]}</option>)  
            }
    const hours =[]
        for(let i =0; i<24;i++){
            hours.push(
                <option>{i}</option>
            )
        }
        const min =[]
        for(let i =0; i<60;i++){
            min.push(
                <option>{i}</option>
            )
        }


    return (
        <>
        <div className=' flex p-10 w-full justify-center h-full'>
        <ScheduleTable schedule={schedule} loading={loading}/>
        <AddEntry schedule={schedule} setSchedule={setSchedule} id={id}/>
        <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={()=>Save()}>
            save
        </button>
        <Link className=" w-24 h-15 absolute  rounded-xl bottom-24 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" to={`/modelirovanie/${id}/${date}`}>
            model
        </Link>
        </div>
        
        </>
    );
}
export default ScheduleEditorPage; 