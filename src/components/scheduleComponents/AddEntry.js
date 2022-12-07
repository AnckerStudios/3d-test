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
            setPlatforms([{number: 1, lines:[{x:0,y:0,number:1}]},{number: 2, lines:[{x:0,y:0,number:3},{x:0,y:0,number:4}]},{number: 3, lines:[{x:0,y:0,number:5},{x:0,y:0,number:6}]}]);
            setInOut([{x:0,y:0,dir:0},{x:15,y:9,dir:0},{x:0,y:3,dir:0},{x:4,y:0,dir:0}]);
        });
    },[])

    const [platforms,setPlatforms] = useState();
    const [inOut,setInOut] = useState();
    const type = ['Пассаж.','Груз.','Электричка'];
    const [entry, setEntry] = useState({nplat: 0, nputi: 0, npoezd: "", timepr: {h:0,m:0},timeotp:{h:0,m:0},marshrut:{otp:"", pr: ""},type: type[0], cells:{in:{x:0,y:0,dir:2}, out:{x:0,y:0,dir:2}, plate: {x:0,y:0,dir:2}}});

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
                    <select className = "addsep" value={entry.nplat} onChange={(e)=>setEntry({...entry, nplat: e.target.value})}>
                        {platforms?.map(platform => {
                            return <option>{platform.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Выберите путь
                    <select className = "addsep" value={entry.nputi} onChange={(e)=>setEntry({...entry, nputi: e.target.value})}>
                        {platforms?.find(item => item.number == entry.nplat)?.lines?.map(line => {
                            return <option>{line.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Введите номер поезда
                    <input className = "addsep text-center"  type = "text" minLength = "1" maxLength = "6" onChange={(e)=>setEntry({...entry, npoezd: e.target.value})}/> 
                </label>
                <br/>
                <label>Время прибытия
                    <span id = "tpr">
                        <input type="number" min="0" max="23" onChange={(e)=>setEntry({...entry, timepr: {...entry.timepr,h:e.target.value}})}/>

                    <text>:</text>

                        <input type="number" min="0" max="59" onChange={(e)=>setEntry({...entry, timepr: {...entry.timepr,m:e.target.value}})}/>
 
                    </span>
                </label> <br/>
                <label>Время отравления
                <span id='totpr'>

                        <input type="number" min="0" max="23" onChange={(e)=>setEntry({...entry, timeotp: {...entry.timeotp,h:e.target.value}})}/>

                    <text>:</text>
 
                        <input type="number" min="0" max="59" onChange={(e)=>setEntry({...entry, timeotp: {...entry.timeotp,m:e.target.value}})}/>

                    </span>
                </label>
                <br/><br/>
                <label>Город отправления
                    <input className = "addsep" placeholder='Введите город...' list='list' onChange={(e)=>setEntry({...entry, marshrut: {...entry.marshrut, otp: e.target.value}})}/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>Город прибытия<input className = "addsep" placeholder='Введите город...' list='list' onChange={(e)=>setEntry({...entry, marshrut: {...entry.marshrut, pr: e.target.value}})}/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>In
                    <select className = "addsep" value={entry.cells.in} onChange={(e)=>setEntry({...entry, cells: {...entry.cells, in: e.target.value}})}>
                        {inOut?.map(io => {
                            return <option>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Out
                    <select className = "addsep" value={entry.cells.out} onChange={(e)=>setEntry({...entry, cells: {...entry.cells, out: e.target.value}})}>
                        {inOut?.map(io => {
                            return <option>x: {io.x} y: {io.y}</option>
                        })}
                    </select>
                </label><br/>
                <label>Выберите тип поезда<select className = "addsep" value={entry.type} onChange={(e)=>setEntry({...entry, type: e.target.value})}>
                        {types}
                    </select></label><br/>
                <button id = "bb" className='cent' onClick={()=>Add()}>Добавить</button>
            </fieldset>
        </div>
        
    );
}


export default AddEntry;