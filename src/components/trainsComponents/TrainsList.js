import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TrainAddModal from "./TrainAddModal";
import TrainsListItem from "./TrainsListItem";


function TrainsList() {
    const [trains,setTrains] = useState();
    const [loading, setLoading] = useState(true);
    const [addFlag, setAddFlag] = useState(false);
    const [err, setErr] = useState({flag: false, mes: ""})
    const [delErr, setDelErr] = useState({flag: false, mes: ""})
    const [addErr, setAddErr] = useState({flag: false, mes: ""})
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/train')
        .then(function (response) {
            setTrains(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setTrains([{idTrain: 1,nameTrain:"55",numberOfWagons:2, typeTrain:"Пасажирский"},{idTrain: 1,nameTrain:"10",numberOfWagons:3, typeTrain:"Грузовой"},{idTrain: 1,nameTrain:"121",numberOfWagons:2, typeTrain:"Скоростной"}]);
            setLoading(false);
            //setErr({flag: true, mes: "Ошибка обращения к серверу"})
            console.log(error);
        });

    },[])
    function del(index){
        axios.delete('http://localhost:8080/api/train', {
            params: {
                idTrain: trains[index].idTrain
            }
        })
        .then(function (response) {
            let copy = Object.assign([], trains);
            copy.splice(index,1)
            setTrains(copy);
            console.log(response);
        })
        .catch(function (error) {
            setDelErr({flag: true, mes: "Ошибка удаления поезда"})
            console.log(error);
        });
    }

    function addTrain(train){
        console.log("sefgsdh", train)
        axios.post('http://localhost:8080/api/train', train 
        )
        .then(function (response) {
            let copy = Object.assign([], trains);
            copy.push(train)
            setTrains(copy);
            console.log(response);
            setAddFlag(false);
        })
        .catch(function (error) {
            setAddErr({flag: true, mes: error?.message || "Неполучилось добавить"})
            console.log(error);
            
        });
    }

    return (
        <div className=" bg-orange-300 rounded-xl max-h-full relative overflow-auto">
            <div className=" flex justify-around p-1 px-5 w-full">
                <div className="  w-1/4 font-bold text-lg  flex items-center justify-center">Номер</div>
                <div className=" w-1/4 font-bold text-lg text-orange-900 flex items-center justify-center">Тип</div>
                <div className=" w-1/4 font-bold text-lg text-slate-900 flex items-center justify-center">Вагонов</div>
                <div className=" w-1/6 flex justify-center">
                <button onClick={()=> {setAddFlag(true); setAddErr({flag: false, mes: ""})}} className=" font-bold text-lg rounded-xl bg-orange-900 px-2  text-orange-200">+</button>
                </div>
                
            </div>
            <hr className=" border-orange-800 mx-6 snap-center"></hr>
            {err.flag ? <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center">{err.mes}</div> :
            <>
            {loading ? <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center">Загрузка наших лучших поездов...</div> : 
            
            trains.length === 0 ? <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center">{`Пока что, пусто :(`}</div> : trains?.map((train, index) => 
            {return <>
                <TrainsListItem key={index} train={train} del={del} index={index}/>
                {index < trains.length-1 && <hr key={'hr'+index} className=" border-orange-800 mx-6 snap-center"></hr>}
            </>})}
            {addFlag && <TrainAddModal submin={addTrain} exit={setAddFlag} addErr={addErr}/>}
            {delErr && <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center text-red-800">{delErr.mes}</div>}
            </>}
            
        </div>


    );
}


export default TrainsList;