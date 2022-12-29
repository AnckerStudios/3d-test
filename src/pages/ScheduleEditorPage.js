import '../pagesStyle/ScheduleEditorPage.css';
import AddEntry from '../components/scheduleComponents/AddEntry';
import ScheduleTable from '../components/scheduleComponents/ScheduleTable';
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ScheduleTable2 from '../components/scheduleComponents/ScheduleTable2';
import Ground from '../element/Ground';
import Preview from '../element/Preview';
import { Stats } from '@react-three/drei';
import { Canvas, useThree } from "@react-three/fiber";
import TopologyView from '../components/scheduleComponents/TopologyView';


function ScheduleEditorPage() {

    const { id, date, isCreate } = useParams();
    console.log(isCreate)
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addFlag, setaddFlag] = useState(false);
    const [trains, setTrains] = useState([]);
    const [city, setCity] = useState();
    const [mtrx, setMtrx] = useState();
    let objSettings = { x: 16, y: 16 }
    const data = [
        { plate: { number: 1, lines: [{ x: 0, y: 0, number: 1 }] }, plateLine: { x: 0, y: 0, number: 1 }, trainName: "D500A", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10", typeTrain: "п" },
        { plate: { number: 1, lines: [{ x: 0, y: 0, number: 1 }] }, plateLine: { x: 0, y: 0, number: 1 }, trainName: "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10", typeTrain: "п" },
        { plate: { number: 1, lines: [{ x: 0, y: 0, number: 1 }] }, plateLine: { x: 0, y: 0, number: 1 }, trainName: "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10", typeTrain: "п" },
        { plate: { number: 1, lines: [{ x: 0, y: 0, number: 1 }] }, plateLine: { x: 0, y: 0, number: 1 }, trainName: "333", arrivalTime: "10:10", departureTime: "10:10", arrivalCity: "10:10", departureCity: "10:10", typeTrain: "п" },
    ];



    function Save() {
        axios.post('http://localhost:8080/api/schedule/save', schedule, {
            params: {
                idTopology: id,
                date: date
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const nplat = ['1', '2', '3', '4']
    const nput = ['1', '2', '3', '4']
    const type = ['Пассаж.', 'Груз.', 'Электричка']


    const types = []
    for (let i = 0; i < type.length; i++) {
        types.push(<option>{type[i]}</option>)
    }
    const hours = []
    for (let i = 0; i < 24; i++) {
        hours.push(
            <option>{i}</option>
        )
    }
    const min = []
    for (let i = 0; i < 60; i++) {
        min.push(
            <option>{i}</option>
        )
    }
    const [platforms, setPlatforms] = useState();
    const [inOut, setInOut] = useState();
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/topology/plates', {
            params: {
                idTopology: id
            }
        })
            .then(function (response) {
                let res = response.data;
                let resInOut = response.data.inOut;
                setPlatforms(res.plates);
                setInOut(res.inOut);
                setTrains(res.trains);
                setCity(res.cities);
                console.log(response);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);

                let resPlates = [{ number: 7, dir: true, lines: [{ x: 0, y: 1, number: 1 }] }, { number: 8, dir: true, lines: [{ x: 0, y: 4, number: 3 }, { x: 0, y: 6, number: 4 }] }, { number: 4, dir: true, lines: [{ x: 10, y: 5, number: 5 }, { x: 12, y: 5, number: 6 }] }];
                let resInOut = [{ x: 0, y: 0, dir: 0, name: "A" }, { x: 15, y: 9, dir: 0, name: "B" }, { x: 0, y: 3, dir: 0, name: "C" }, { x: 4, y: 0, dir: 0, name: "D" }];
                let trains = [{ idTrain: 56, nameTrain: "333", typeTrain: "Грузовой", numberOfWagons: 3 }, { idTrain: 56, nameTrain: "23", typeTrain: "Грузовой", numberOfWagons: 3 }]

                setPlatforms(resPlates);
                setInOut(resInOut);
                setTrains(trains);
                setLoading(false);
            });
    }, [])
    function addSchedule(entry) {
        setSchedule([...schedule, entry]);
        setaddFlag(false);
    }
    return (
        <>
            <div className='divsep'>
                <div className='flex flex-col'>

                    {loading ? <div>Погоди-погожу</div> :
                        <><ScheduleTable id={id} date={date} setSchedule={setSchedule} schedule={schedule} isCreate={isCreate} />
                            <button onClick={() => setaddFlag(true)}>Добавить</button>
                            {<AddEntry active={addFlag} setActive={setaddFlag} schedule={schedule} inOut={inOut} platforms={platforms} trains={trains} addSchedule={addSchedule} />}</>}

                </div>
                
                <div className='flex flex-grow'>
                    <div className=" w-full h-full rounded-xl bg-slate-300 shadow-md relative">

                        {loading ? <div>Loading...</div> : <TopologyView id={id} inOut={inOut} platforms={platforms} />}
                    </div>


                </div>
                <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={() => Save()}>
                    save
                </button>
                <Link className=" w-24 h-15 absolute  rounded-xl bottom-24 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" to={`/modelirovanie/${id}/${date}`}>
                    model
                </Link>

            </div>
            {/* <div className=' flex p-10 w-full justify-center h-full'>
        <ScheduleTable schedule={schedule} loading={loading}/>
        <AddEntry schedule={schedule} setSchedule={setSchedule} id={id}/>
        <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={()=>Save()}>
            save
        </button>
        <Link className=" w-24 h-15 absolute  rounded-xl bottom-24 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" to={`/modelirovanie/${id}/${date}`}>
            model
        </Link>
        </div> */}

        </>
    );
}
export default ScheduleEditorPage; 