import axios from "axios";
import { useEffect, useState } from "react";
import close from "../../images/closeGray.png"


function TrainAddModal({submin, exit, addErr}) {
    const [train, setTrain] = useState({nameTrain:undefined,numberOfWagons:undefined, typeTrain:"Пасажирский"});
   
    const type = [1,2,3];
    function getType(type){
        switch(type){
            case 1: return "Пасажирский";
            case 2: return "Грузовой";
            case 3: return "Скоростной";
        }
    }
    return (
        <>
        <div className=" fixed bg-black/50 top-0 right-0 left-0 bottom-0 z-20">
            <div className="w-[500px] p-5 rounded-xl bg-blue-200 absolute top-10 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center">
                <div className="flex flex-grow gap-2">
                    <div className="flex flex-col">
                        <div className=" w-full p-5 font-bold text-xl flex items-center justify-center">Номер</div>
                        <input className=" border rounded-lg p-2" type="text" onChange={(e)=>setTrain({...train, nameTrain: e.target.value})}/>
                    </div>
                    <div className="flex flex-col">
                        <div className=" w-full p-5 font-bold text-xl flex items-center justify-center">Тип</div>
                        <select className = "border rounded-lg h-full" onChange={(e)=>setTrain({...train, typeTrain: getType(type[e.target.value])})}>
                        {type?.map((io,index) => {
                            return <option key={index} value={index}>{getType(io)}</option>
                        })}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <div className=" w-full p-5 font-bold text-xl flex items-center justify-center">Вагонов</div>
                        <input className=" border rounded-lg p-2" type="number" min="0" max="5" onChange={(e)=>setTrain({...train, numberOfWagons: e.target.value})}/>
                    </div>
                    
                </div>
                {addErr?.flag && <div className=" w-full p-5 font-bold text-xl flex items-center justify-center text-red-800">Ошибка создания: {addErr.mes}</div>}
                <button className=" rounded-lg bg-blue-400 p-2 w-1/4" onClick={()=> {submin(train)}}>ok</button>
                <div className=" absolute top-2 right-2 z-30" onClick={()=>exit(false)}>
                <img src={close} className=" w-7 h-7"></img>
            </div>
            </div>
            
            
        </div>
        </>
    );
}

export default TrainAddModal;

