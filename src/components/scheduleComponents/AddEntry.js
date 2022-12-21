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
            let resPlates = response.data.plates;
            let resInOut = response.data.inOut;
            setPlatforms(resPlates);
            setInOut(resInOut);
            setEntry({
                plate: resPlates[0], 
                plateLine: resPlates[0].lines[0],  //GGGGGGGGGGGGGGG
                trainName: "", 
                arrivalTime: '00:00', 
                departureTime:'00:00',
                departureCity:"",
                arrivalCity:"",
                typeTrain: type[0], 
                in:resInOut[0], 
                out:resInOut[0]});
            console.log(response);
            
        })
        .catch(function (error) {
            console.log(error);
            let resPlates =[{number: 7, dir: true, lines:[{x:0,y:0,number:1}]},{number: 8, dir: true, lines:[{x:0,y:0,number:3},{x:0,y:0,number:4}]},{number: 4, dir: true, lines:[{x:0,y:0,number:5},{x:0,y:0,number:6}]}];
            let resInOut = [{x:0,y:0,dir:0},{x:15,y:9,dir:0},{x:0,y:3,dir:0},{x:4,y:0,dir:0}];
            setPlatforms(resPlates);
            setInOut(resInOut);
            setEntry({
                plate: resPlates[0], 
                plateLine: resPlates[0].lines[0],  //GGGGGGGGGGGGGGG
                trainName: "", 
                arrivalTime: '00:00', 
                departureTime:'00:00',
                departureCity:"",
                arrivalCity:"",
                typeTrain: type[0], 
                in:resInOut[0], 
                out:resInOut[0]});
        });
    },[])
    const [platforms,setPlatforms] = useState();
    const [inOut,setInOut] = useState();


    const type = ['Пассаж.','Груз.','Электричка'];
    const [entry, setEntry] = useState({plate: {lines:[]}});

    const sity = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
    const sitys = []
    for(let i = 0; i < sity.length; i++){
         sitys.push(<option key={i}>{sity[i].city}</option>)  
    }

    function Add(){
        console.log(entry)
        setSchedule([...schedule,entry]);
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
    
    return (
        <div className='formsep'>
            <fieldset>
                <legend>Добавить запись</legend>
                <label id = "firstlab">Выберите платформу
                    <select className = "addsep" onChange={(e)=>setEntry({...entry, plate: platforms[e.target.value]})}>
                        {platforms?.map((platform,index) => {
                            return <option key={index} value={index}>Платформа №{platform.number}</option>
                        })}
                    </select>
                </label>
                <br/>
                <label>Выберите путь
                    <select className = "addsep" onChange={(e)=>setEntry({...entry, plateLine: entry.plate.lines[e.target.value]})}>
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