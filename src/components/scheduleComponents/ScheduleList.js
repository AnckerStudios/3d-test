import axios from "axios";
import { useEffect, useState } from "react";
import ScheduleAddItem from "./ScheduleAddItem";
import ScheduleListItem from "./ScheduleListItem";


function ScheduleList({id}) {
    const [schedules,setSchedules] = useState();
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(2)
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/schedule/all', {
            params: {
              idTopology: id
            }
        })
        .then(function (response) {
            setSchedules(response.data);
            console.log(response);
            setLoading(false);
        })
        .catch(function (error) {
            setSchedules([{timetableDate:'26-12-2222', idTimetable:1, status: true},{timetableDate:'27-12-2222', idTimetable:2,status: false}]);
            console.log(error);
            setLoading(false);
        });
        console.log(schedules);
    },[])
    useEffect(()=>{console.log(schedules)},[schedules])
    function delShedule(index){
        console.log(schedules);
        axios.delete('http://localhost:8080/api/schedule', {
            params: {
              //idTopology: id,
              idTimetable: schedules[index].idTimetable
            }
        })
        .then(function (response) {
            let copy = Object.assign([], schedules);
            // let index = copy.findIndex(item => item.idSchedule == idSchedule);
            copy.splice(index,1)
            setSchedules(copy);
            console.log(response);
        })
        .catch(function (error) {
            let copy = Object.assign([], schedules);
            // let index = copy.findIndex(item => item.idSchedule == idSchedule);
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
                {loading ? <div>Loading...</div>:
                <div className=" flex gap-4 " style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
                {schedules?.map((schedule, index) => {
                    return <ScheduleListItem key={schedule.idTimetable} schedule={schedule} index={index} del={delShedule} idTopology={id}/>
                })}
                <ScheduleAddItem idTopology={id} schedules={schedules}/>
                </div>  }
                
                
            </div> 
            <button className=" absolute z-10 w-16 h-16 top-12 -left-8 bg-blue-200 hover:bg-orange-300 shadow-lg rounded-full" onClick={prev}>prev</button>
            <button className=" absolute z-10 w-16 h-16 top-12 -right-8 bg-blue-200 hover:bg-orange-300 shadow-lg rounded-full" onClick={next}>next</button>
        </div>

    );
}

export default ScheduleList;
