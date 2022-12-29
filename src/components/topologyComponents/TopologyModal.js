import axios from "axios";
import { useEffect, useState } from "react";
import TopologyAddItem from "./TopologyAddItem";
import TopologyListItem from "./TopologyListItem";


function TopologyModal({submin}) {
    const [data, setData] = useState({name: "", x: 16, y:16});
    return (
        <>
        <div className=" fixed bg-black/50 top-0 right-0 left-0 bottom-0">
            <div className="w-[500px] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2 flex flex-col gap-2">
                <div>Название:</div>
                <input className=" border rounded-lg" type="text" min="0" max="23" onChange={(e)=>setData({...data, name: e.target.value})}/>
                <div className="w-full flex flex-grow">
                    <div>Ширина:</div>
                    <input className=" border rounded-lg" type="number" min="10" max="100" onChange={(e)=>setData({...data, x: e.target.value})}/>
                    <div>Высота:</div>
                    <input className=" border rounded-lg" type="number" min="10" max="100" onChange={(e)=>setData({...data, y: e.target.value})}/>

                </div>
                <button className=" rounded-lg bg-orange-400  p-4" onClick={()=> submin(data)}>ok</button>
            </div>

            
        </div>
        </>
    );
}

export default TopologyModal;

