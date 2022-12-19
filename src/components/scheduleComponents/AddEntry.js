import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function AddEntry({schedule, setSchedule, id}) {

    useEffect(()=>{
        axios.get('http://localhost:8080/api/topology/plates', {
            params: {
              idTopology: id
            }
        })
        .then(function (response) {
            setPlatforms(response.data.plates);
            setInOut(response.data.inOut);
            console.log(response);
            
        })
        .catch(function (error) {
            console.log(error);
            setPlatforms([{number: 7, lines:[{x:0,y:0,number:1}]},{number: 8, lines:[{x:0,y:0,number:3},{x:0,y:0,number:4}]},{number: 4, lines:[{x:0,y:0,number:5},{x:0,y:0,number:6}]}]);
            setInOut([{x:0,y:0,dir:0},{x:15,y:9,dir:0},{x:0,y:3,dir:0},{x:4,y:0,dir:0}]);
        });
    },[])

    const [platforms,setPlatforms] = useState();
    const [inOut,setInOut] = useState();
    const type = ['Пассаж.','Груз.','Электричка'];
    const [entry, setEntry] = useState({plate: {number: 1,dir:true, lines:[{x:0,y:0,number:1}]}, plateLine: {x:0,y:0,number:1}, trainName: "gg", arrivalTime: '10:23', departureTime:'12:34',departureCity:"Samara" ,arrivalCity:"Moscow" ,typeTrain: "type", in:{x:0,y:0,dir:2}, out:{x:0,y:0,dir:2}});

    const sity = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
    const sitys = []
    for(let i = 0; i < sity.length; i++){
         sitys.push(<option>{sity[i].city}</option>)  
    }
    const types = []
    for(let i = 0; i < type.length; i++){
         types.push(<option>{type[i]}</option>)  
    }

    function Add(){
        console.log(entry)
        setSchedule([...schedule,entry]);
    }
    return (
        <div className='formsep'>
            <fieldset>
                <legend>Добавить запись</legend>
                <label id = "firstlab">Выберите платформу
                    <select className = "addsep" value={entry.plate.number} onChange={(e)=>setEntry({...entry, plate: platforms.find(item => item.number == e.target.value), plateLine: entry.plate.lines[0]})}>
                        {platforms?.map(platform => {
                            return <option value={platform.number}>Платформа №{platform.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Выберите путь
                    <select className = "addsep" value={entry.plateLine.number} onChange={(e)=>setEntry({...entry, plateLine: entry.plate.lines.find(item => item.number == e.target.value)})}>
                        {entry.plate.lines?.map(line => {
                            return <option value={line.number}>Путь №{line.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Введите номер поезда
                    <input className = "addsep text-center"  type = "text" minLength = "1" maxLength = "6" onChange={(e)=>setEntry({...entry, trainName: e.target.value})}/> 
                </label>
                <br/>
                <label>Время прибытия
                    <span id = "tpr">
                        <input type="number" min="0" max="23" /*onChange={(e)=>setEntry({...entry, arrivalTime: {...entry.arrivalTime,h:e.target.value}})}*//>

                    <text>:</text>

                        <input type="number" min="0" max="59" /*onChange={(e)=>setEntry({...entry, arrivalTime: {...entry.arrivalTime,m:e.target.value}})}*//>
 
                    </span>
                </label> <br/>
                <label>Время отравления
                <span id='totpr'>

                        <input type="number" min="0" max="23" /*onChange={(e)=>setEntry({...entry, departureTime: {...entry.departureTime,h:e.target.value}})}*//>

                    <text>:</text>
 
                        <input type="number" min="0" max="59" /*onChange={(e)=>setEntry({...entry, departureTime: {...entry.departureTime,m:e.target.value}})}*//>

                    </span>
                </label>
                <br/><br/>
                <label>Город отправления
                    <input className = "addsep" placeholder='Введите город...' list='list' onChange={(e)=>setEntry({...entry, departureCity: e.target.value})}/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>Город прибытия<input className = "addsep" placeholder='Введите город...' list='list' onChange={(e)=>setEntry({...entry, arrivalCity: e.target.value})}/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>In
                    <select className = "addsep" value={entry.in} >
                        {inOut?.map(io => {
                            return <option value={{x:io.x,y:io.y,dir:io.dir}}>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Out
                    <select className = "addsep" value={entry.out} >
                        {inOut?.map(io => {
                            return <option value={{x:io.x,y:io.y,dir:io.dir}}>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Выберите тип поезда<select className = "addsep" value={entry.typeTrain} onChange={(e)=>setEntry({...entry, typeTrain: e.target.value})}>
                        {types?.map(io => {
                            return <option value={1}>{io}</option>
                        })}
                    </select></label><br/>
                <button id = "bb" className='cent' onClick={()=>Add()}>Добавить</button>
            </fieldset>
        </div>
        
    );
}


export default AddEntry;