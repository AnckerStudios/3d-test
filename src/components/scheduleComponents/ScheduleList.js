import axios from "axios";
import { useEffect, useState } from "react";
import ModalDateSelector from "./ModalDateSelector";
import ScheduleAddItem from "./ScheduleAddItem";
import ScheduleListItem from "./ScheduleListItem";


function ScheduleList({id}) {
    const [schedules,setSchedules] = useState([{scheduleName:'26.12.22', idSchedule:1},{scheduleName:'27.12.22', idSchedule:2}]);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(schedules.length)
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
        console.log(schedules);
    },[])
    useEffect(()=>{console.log(schedules)},[schedules])
    function delShedule(idSchedule){
        console.log(schedules);
        axios.get('http://localhost:3000/api/schedule/delete', {
            params: {
              idTopology: id,
              idSchedule: idSchedule
            }
        })
        .then(function (response) {
            let copy = Object.assign([], schedules);
            let index = copy.findIndex(item => item.idSchedule == idSchedule);
            copy.splice(index,1)
            setSchedules(copy);
            console.log(response);
        })
        .catch(function (error) {
            let copy = Object.assign([], schedules);
            let index = copy.findIndex(item => item.idSchedule == idSchedule);
            copy.splice(index,1)
            setSchedules(copy);
            console.log(error);
        });
    }
    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }
    return (

        <div className=" w-full relative">
            <div className=" w-full flex overflow-hidden">
                <div className=" flex gap-4 " style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                {schedules?.map(schedule => {
                    return <ScheduleListItem key={schedule.idSchedule} name={schedule.scheduleName} id={schedule.idSchedule} del={delShedule} idTopology={id}/>
                })}
                <ScheduleAddItem idTopology={id}/>
                </div>  
                
                
            </div> 
            <button className=" absolute z-10 w-16 h-16 top-12 -left-8 bg-slate-200 hover:bg-orange-300 shadow-lg rounded-full" onClick={prev}>prev</button>
            <button className=" absolute z-10 w-16 h-16 top-12 -right-8 bg-slate-200 hover:bg-orange-300 shadow-lg rounded-full" onClick={next}>next</button>
        </div>

    );
}

export default ScheduleList;
