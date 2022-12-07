import '../pagesStyle/ScheduleEditorPage.css';
import React, { useState } from "react";
import AddEntry from '../components/scheduleComponents/AddEntry';
import ScheduleTable from '../components/scheduleComponents/ScheduleTable';


function ScheduleCreatePage() {
    const {id} = useParams();
    const [schedule, setSchedule] = useState([]);

    function Save(){
        // axios.post('http://localhost:8080/api/topology', {
        //     title: 'lox',
        //     body: mtrx
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(mtrx[0][0])
        //     console.log(mtrx[1][0])
        //     console.log(error);
        //   });
    }

    return (
        <div className=' flex p-10 w-full justify-center'>
        <ScheduleTable schedule={schedule}/>
        <AddEntry schedule={schedule} setSchedule={setSchedule} id={id}/>
        <button  className='ex2'>Выход</button>
        <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={()=>Save()}>
            save
        </button>
        </div>
    );
}
export default ScheduleCreatePage; 