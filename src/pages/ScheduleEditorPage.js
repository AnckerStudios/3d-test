import '../pagesStyle/ScheduleEditorPage.css';
import AddEntry from '../components/scheduleComponents/AddEntry';
import ScheduleTable from '../components/scheduleComponents/ScheduleTable';
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ModalDateSelector from '../components/scheduleComponents/ModalDateSelector';


function ScheduleEditorPage() {
    const {id, topology} = useParams();
    const [schedule, setSchedule] = useState([]);
    const data = [
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "D500A", arrivalTime: {h:0,m:0}, departureTime: {h:1,m:0}, marshrut: "Санкт-Петербург-Екатеринбург",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: {h:0,m:0}, departureTime: {h:0,m:20}, marshrut: "город-город2",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: {h:12,m:0}, departureTime: {h:12,m:20}, marshrut: "город-город2",typeTrain:"п"},
        {plate: {number: 1, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName : "333", arrivalTime: {h:8,m:0}, departureTime: {h:8,m:30}, marshrut: "город-город2",typeTrain:"п"},
        ];
    const [date, setDate] = useState();
    useEffect(()=>{
        console.log(id, topology)
        if(id === 'create'){
            
        }else{
            axios.get('http://localhost:3000/api/schedule/', {
                params: {
                idTopology: id //или дату и id топологии
                }
            })
            .then(function (response) {
                setSchedule(response.data);
                console.log(response);
            })
            .catch(function (error) {
                setSchedule(data); //убрать
                setDate("2.2.22");
                console.log(error);
            });
        }
    },[])

    function Save(){
        axios.post('http://localhost:3000/api/schedule/save', {
            params: {
                idTopology: topology,
                dateTimeString: date
              },
            body:{
                records: schedule
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
    const items = []
        for(let i = 0; i < data.length; i++){
             items.push( <tr>
                <td>{data[i].nplat}</td>
                <td>{data[i].nputi}</td>
                <td>{data[i].npoezd}</td>
                <td>{data[i].timeotp}</td>
                <td>{data[i].timepr}</td>
                <td>{data[i].marshrut}</td>
                <td>{data[i].type}</td>
            </tr>)  
        }
    const platforms = []
        for(let i = 0; i < nplat.length; i++){
        platforms.push( 
            <option>{nplat[i]}</option>
        )  
        }
    const puty = []
        for(let i = 0; i < nput.length; i++){
        puty.push( 
            <option>{nput[i]}</option>
        )  
        }

    return (
        <>
        <div className=' flex p-10 w-full justify-center h-full'>
        {date && <ScheduleTable schedule={schedule}/>}
        {date && <AddEntry schedule={schedule} setSchedule={setSchedule} id={id}/>}
        {!date && <ModalDateSelector set={setDate}/>}
        <button  className='ex2'>Выход</button>
        <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={()=>Save()}>
            save
        </button>
        <Link className=" w-24 h-15 absolute  rounded-xl bottom-24 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" to={`/modeling/${id}`}>
            model
        </Link>
        </div>
        
        </>
    );
}
export default ScheduleEditorPage; 