import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopologyListItem from "../components/topologyComponents/TopologyListItem";


function ModelingListPage() {
    const {id,name} = useParams();
    const [schedules, setSchedules] = useState();
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(2)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
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
                setSchedules([{ timetableDate: '26-12-2222', idTimetable: 1, status: true }, { timetableDate: '27-12-2222', idTimetable: 2, status: false }]);
                console.log(error);
                setLoading(false);
            });
        console.log(schedules);
    }, [])


    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        {name}
                    </h4>
                </div>
                {loading ? <div>Loading...</div> : <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">

                    {schedules?.map(schedule => {
                        return <div className=" h-64 w-64 flex relative ">
                            <Link className=" bg-slate-300 rounded-xl w-full h-full flex justify-center font-bold items-center hover:bg-orange-300 shadow-lg text-center relative snap-start " to={`/modelirovanie/${id}/${schedule.timetableDate}`}>
                                {schedule.timetableDate}
                                <div className=" absolute bottom-1 right-3 flex items-center gap-3 ">
                                    <div>{schedule?.status ? "корректна" : "не корректна"}</div>
                                    <div className={`h-3 w-3 rounded-full ${schedule?.status ? "bg-green-400" : "bg-red-600"} shadow-xl`} />
                                </div>
                            </Link>
                            
                        </div>
                    })}
                    <TopologyListItem name={"+"} />
                </div>}

            </div>

        </div>

    );
}


export default ModelingListPage;