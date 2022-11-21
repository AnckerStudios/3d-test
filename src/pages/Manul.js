import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TopologyListItem from "../element/TopologyListItem";


function Monul() {
    const [topologys,setTopologys] = useState([{topologyName:22}]);
    useEffect(()=>{
        axios.get('http://localhost:8080/api/topology/all')
        .then(function (response) {
            setTopologys(response.data);
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    },[])


    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        Name 
                    </h4>
                </div>
                <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
                
                    {topologys?.map(topol => {
                        return <TopologyListItem name={topol.topologyName} id={topol.idTopology}/>
                    })}
                    
                </div>
                
            </div>
            
        </div>
        
    );
}


export default Monul;