import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TrainAddModal from "./TrainAddModal";
import TrainsListItem from "./TrainsListItem";


function TrainsList() {
    const [trains,setTrains] = useState();
    const [loading, setLoading] = useState(true);
    const [addFlag, setAddFlag] = useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/train')
        .then(function (response) {
            setTrains(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setTrains([{idTrain: 1,nameTrain:"10A",numberOfWagons:2, typeTrain:{idType: 1, typeTrain: "Пасажирский"}},{idTrain: 1,nameTrain:"10A",numberOfWagons:2, typeTrain:{idType: 1, typeTrain: "Пасажирский"}},{idTrain: 1,nameTrain:"10A",numberOfWagons:2, typeTrain:{idType: 1, typeTrain: "Пасажирский"}}]);
            setLoading(false);
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
            let copy = Object.assign([], trains);
            // let index = copy.findIndex(item => item.number == delNumber);
            copy.splice(index,1);
            setTrains(copy);
            console.log(error);
        });
    }

    function addTrain(train){
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
                <button onClick={()=> setAddFlag(true)} className=" font-bold text-lg rounded-xl bg-orange-900 px-2  text-orange-200">+</button>
                </div>
                
            </div>
            <hr className=" border-orange-800 mx-6 snap-center"></hr>
            {loading ? <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center">Загрузка наших лучших поездов...</div> : 
            
            trains.length === 0 ? <div className=" w-full p-5 font-bold text-2xl flex items-center justify-center">{`Пока что, пусто :(`}</div> : trains?.map((train, index) => 
            {return <>
                <TrainsListItem key={index} train={train} del={del} index={index}/>
                {index < trains.length-1 && <hr key={'hr'+index} className=" border-orange-800 mx-6 snap-center"></hr>}
            </>})}
            {addFlag && <TrainAddModal submin={addTrain} exit={setAddFlag}/>}
            
        </div>


    );
}


export default TrainsList;