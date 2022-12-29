import axios from "axios";
import { useEffect, useState } from "react";
import { getCurRole } from "../../services/auth.service";
import TopologyAddItem from "./TopologyAddItem";
import TopologyListItem from "./TopologyListItem";


function TopologyList({cityName}) {
    const [topologys,setTopologys] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/topology/bycity',{
            params:{
                cityName: cityName
            }
        })
        .then(function (response) {
            setTopologys(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setTopologys([{topologyName:"name",idTopology:1, accountName: "avtor"}]);
            setLoading(false);
            console.log(error);
        });

    },[])
    function delShedule(index){
        axios.delete(`http://localhost:8080/api/topology`, {
            params: {
              idTopology: topologys[index].idTopology,
            }
        })
        .then(function (response) {
            let copy = Object.assign([], topologys);
            copy.splice(index,1)
            setTopologys(copy);
            console.log(response);
        })
        .catch(function (error) {
            let copy = Object.assign([], topologys);
            // let index = copy.findIndex(item => item.number == delNumber);
            copy.splice(index,1);
            setTopologys(copy);
            console.log(error);
        });
    }
    return (
        <>
        {loading ? <div>Loading...</div> :
        <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
            

            {topologys?.map((topol,index) => {
                return <TopologyListItem key={index} topol={topol} del={delShedule} index={index}/>
            })}
            {getCurRole() && <TopologyAddItem cityName={cityName}/>}
        </div>}
        </>
    );
}

export default TopologyList;

