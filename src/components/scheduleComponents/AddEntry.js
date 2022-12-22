import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function AddEntry({inOut, platforms, id, addSchedule}) {
    const [loading, setLoading] = useState(true);
    
   

    const [lineIndex, setLineIndex] = useState(0);
    const [plateIndex, setPlateIndex] = useState();
    const type = ['Пассаж.','Груз.','Электричка'];
    const [entry, setEntry] = useState({plate: platforms[0]});

    const sity = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
    const sitys = []
    for(let i = 0; i < sity.length; i++){
         sitys.push(<option key={i}>{sity[i].city}</option>)  
    }

    function Add(){
        console.log(entry)
        addSchedule(entry);
    }
    // const [selectLine,setSelectLine]=useState(0);
    // useEffect(()=>{
    //     if(selectLine < entry.plate.lines.length){
    //         setEntry({...entry, plateLine: entry.plate.lines[selectLine]})}
    //     },[selectLine]);
    const [arTime, setArTime] = useState({h:0,m:0});
    const [deTime, setDeTime] = useState({h:0,m:0});

    useEffect(()=>{
        setEntry({...entry, arrivalTime: `${arTime.h < 10 ? '0'+arTime.h :arTime.h }:${arTime.m < 10 ? '0'+arTime.m :arTime.m }`});
    },[arTime])
    useEffect(()=>{setEntry({...entry, departureTime: `${deTime.h < 10 ? '0'+deTime.h :deTime.h }:${deTime.m < 10 ? '0'+deTime.m :deTime.m }`})},[deTime])


    function setPlate(i){
        console.log(platforms,i)
        if(platforms[i].lines.length-1 < lineIndex){
            console.log(platforms[i].lines.length-1)
            setEntry({...entry, plate: platforms[i], plateLine: platforms[i].lines[0]})
        }else{
            setEntry({...entry, plate: platforms[i], plateLine: platforms[i].lines[lineIndex]})
        }
    }
    return (
        <div className='formsep'>
            <fieldset>
                <legend>Добавить запись</legend>
                <label id = "firstlab">Выберите платформу
                    <select className = "addsep" onChange={(e)=>setPlate(e.target.value)}>
                        {platforms?.map((platform,index) => {
                            return <option key={index} value={index}>Платформа №{platform.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Выберите путь
                    <select className = "addsep" onChange={(e)=>{setEntry({...entry, plateLine: entry.plate.lines[e.target.value]}); setLineIndex(e.target.value)}}>
                        {entry.plate.lines?.map((line,index) => {
                            return <option key={index} value={index}>Путь №{line.number}</option>
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
                        <input type="number" min="0" max="23" value={arTime.h} onChange={(e)=>setArTime({...arTime, h: +e.target.value > 23? 23: Math.floor(+e.target.value) })}/>

                    :

                        <input type="number" min="0" max="59" value={arTime.m} onChange={(e)=>setArTime({...arTime, m: +e.target.value > 59? 59: Math.floor(+e.target.value) })}/>
 
                    </span>
                </label> <br/>
                <label>Время отравления
                <span id='totpr'>

                        <input type="number" min="0" max="23"  value={deTime.h} onChange={(e)=>setDeTime({...deTime,  h: +e.target.value > 23? 23: Math.floor(+e.target.value)})}/>

                    :
 
                        <input type="number" min="0" max="59" value={deTime.m} onChange={(e)=>setDeTime({...deTime, m: +e.target.value > 59? 59: Math.floor(+e.target.value) })}/>

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
                    <select className = "addsep" onChange={(e)=>setEntry({...entry, in: inOut[e.target.value]})}>
                        {inOut?.map((io,index) => {
                            return <option  key={index} value={index}>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Out
                    <select className = "addsep" onChange={(e)=>setEntry({...entry, out: inOut[e.target.value]})}>
                        {inOut?.map((io,index) => {
                            return <option key={index} value={index}>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Выберите тип поезда<select className = "addsep" onChange={(e)=>setEntry({...entry, typeTrain: type[e.target.value]})}>
                        {type?.map((io,index) => {
                            return <option key={index} value={index}>{io}</option>
                        })}
                    </select></label><br/>
                <button id = "bb" className='cent' onClick={()=>Add()}>Добавить</button>
            </fieldset>
        </div>
        
    );
}


export default AddEntry;