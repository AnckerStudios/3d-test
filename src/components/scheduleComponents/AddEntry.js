import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function AddEntry({inOut, platforms, trains, id, addSchedule}) {
    const [loading, setLoading] = useState(true);
    
    console.log("plte",platforms[0].lines)

    const [lineIndex, setLineIndex] = useState(0);
    const [planeIndex, setPlaneIndex] = useState(0);
    const type = ['Пассаж.','Груз.','Электричка'];
    const [entry, setEntry] = useState({ plate: platforms[0].number, plateLine: platforms[0].lines[lineIndex], trainName: trains[0].nameTrain, arrivalTime: "00:00", departureTime: "00:00", in: inOut[0], out: inOut[0],typeTrain:type[0]});

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


    function setPlate(i){
        setPlaneIndex(i);
        console.log(platforms,i)
        if(platforms[i].lines.length-1 < lineIndex){
            console.log("gfgsdg",platforms[i].lines.length-1)
            setEntry({...entry, plate: platforms[i].number, plateLine: platforms[i].lines[0]})
            setLineIndex(0);
        }else{
            console.log("ccccc",platforms[i].lines.length)
            setEntry({...entry, plate: platforms[i].number, plateLine: platforms[i].lines[lineIndex]})
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
                    <select className = "addsep" onChange={(e)=>{setEntry({...entry, plateLine: platforms[planeIndex].lines[e.target.value]}); setLineIndex(e.target.value)}}>
                        {platforms[planeIndex].lines.map((line,index) => {
                            
                            return <option key={index} value={index}>Путь №{line.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Введите номер поезда
                    <select className = "addsep" onChange={(e)=>{setEntry({...entry, trainName: trains[e.target.value].nameTrain}); setLineIndex(e.target.value)}}>
                        {trains?.map((pl,index) => {
                            return <option key={index} value={index}>№{pl.nameTrain}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Время прибытия
                    <span id = "tpr">
                    <input className="addtime" type="time" onChange={(e)=>setEntry({...entry, arrivalTime: e.target.value})}></input>   
                    </span>
                </label> <br/>
                <label>Время отравления
                <span id='totpr'>
                        <input className="addtime" type="time" onChange={(e)=>setEntry({...entry, departureTime: e.target.value})}></input>
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
                <button id = "bb" className='cent' onClick={()=>Add()}>Добавить</button>
            </fieldset>
        </div>
        
    );
}


export default AddEntry;