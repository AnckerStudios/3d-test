import axios from "axios";
import { useEffect, useState } from "react";
import ScheduleAddItem from "./ScheduleAddItem";
import ScheduleListItem from "./ScheduleListItem";


function ScheduleList({id}) {
    const [selectedTool, setSelectedTool] = useState(0);

    
    const [schedules,setSchedules] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/schedule/all', {
            params: {
              idTopology: id
            }
        })
        .then(function (response) {
            setSchedules(response.data);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    return (
        <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
                
            {schedules?.map(schedule => {
                return <ScheduleListItem name={schedule.topologyName} id={schedule.idTopology}/>
            })}
        <ScheduleAddItem/>
    </div>
    );
}

export default ScheduleList;
