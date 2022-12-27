import axios from "axios";
import { useEffect, useState } from "react";
import TopologyAddItem from "./TopologyAddItem";
import TopologyListItem from "./TopologyListItem";


function TopologyList({id}) {
    const [topologys,setTopologys] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/topology/all')
        .then(function (response) {
            setTopologys(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setTopologys([{topologyName:22,idTopology:22}]);
            setLoading(false);
            console.log(error);
        });

    },[])
    return (
        <>
        {loading ? <div>Loading...</div> :
        <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
            

            {topologys?.map(topol => {
                return <TopologyListItem name={topol.topologyName} id={topol.idTopology}/>
            })}
            <TopologyAddItem />
        </div>}
        </>
    );
}

export default TopologyList;

