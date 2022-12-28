import '../pagesStyle/ModelirovaniePage.css';
import React, { createRef, useEffect } from "react";
import { useState } from "react";
import Modeling from '../element/Modeling';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ScheduleTable2 from '../components/scheduleComponents/ScheduleTable2';
import { mtrx2, rec } from '../testComponent/mtrx2';




function ModelirovaniePage() {
  const[start,setStart] = useState("00:00");
  const[end,setEnd] = useState("23:59");
  const[endTimer,setEndTimer] = useState();

  const {id,date} = useParams();
    const [mtrx, setMtrx] = useState();
    const [schedule, setSchedule] = useState();
    const [scheduleEntry, setScheduleEntry] = useState();
    const [err, setErr] = useState(false);

    useEffect(()=>{
if(err === true){
  clearInterval(interval);
}

    },[err])
    const [timer, setTimer] = useState(0)
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        setLoading(true);
        axios.get(`http://localhost:8080/api/topology/${id}/${date}`)
            .then(function (response) {
                setMtrx(response.data.matrix);
                setSchedule(response.data.records);
                console.log(response);
                setLoading(false)
            })
            .catch(function (error) {
                let arr = mtrx2();
                setMtrx(arr);
                let sch = rec();
                setSchedule(sch);
                console.log(error);
                setLoading(false)
            });
      },[])

  let arr,arr2, h,m,hourEnd,minuteEnd;
  let time= createRef();
  const [interval,setInter] = useState();
  
  function setStartPoint(e){
    clearInterval(interval);
    let arr = e.split(':');
    let h = arr[0];
    let m = arr[1];
    console.log((h*60+(+m))*100);
    setTimer((h*60+(+m))*100);
  }
  function setEndPoint(e){
    clearInterval(interval);
    let arr = e.split(':');
    let h = arr[0];
    let m = arr[1];
    console.log((h*60+(+m))*100);
    setEndTimer((h*60+(+m))*100);
  }

  useEffect(()=>{
    if(timer >= endTimer){
      clearInterval(interval);
    }
  },[timer])
  function myPusk(t){
    setErr(false);
    clearInterval(interval);
    setInter(setInterval(() => {
      setTimer((timer) => timer + 1)
    }, t))
  }

  function pusk() 
  {
    arr = start.split(':');
    arr2 = end.split(':');
    h = arr[0];
    m = arr[1];
    hourEnd = arr2[0]
    minuteEnd = arr2[1];
    

    if (hourEnd < h)
      {
          h=0;
          m=0;
          hourEnd=0;
          minuteEnd=0;
          time.current.innerHTML="Некорректный ввод";
      }
    else
      {
        clearInterval(interval);
        interval=setInterval(addTime,1000);
      }
  }

  function addTime()
  {
    if(((h==hourEnd) && (m==minuteEnd)) || ((h==hourEnd) && ( m=="0" + minuteEnd))|| ((h=="0"+hourEnd) && ( m=="0" + minuteEnd)))
      {
          m = m < 10 && m != '00' ? '0'+ m : m;
          time.current.innerHTML = h + ":" + m;
          clearInterval(interval);
      }
    else 
      {
          if(m != 59)
            {
              m = m < 10 && m.length !== 2 ? '0'+ m : m;
             
              time.current.innerHTML = h + ":" + m;
              m++;
            }
          else 
            {
              time.current.innerHTML = h + ":" + m;
              m = '00';
              h++;
              h = h < 10 ? '0'+ h : h;
            }
      }
  }

  function pause() {
    //setStart(h + ':' + m);
    clearInterval(interval);
  }

  function stop() {
    time.current.innerHTML = "00:00";
    clearInterval(interval);
    arr2[0] = hourEnd;
    arr2[1] = minuteEnd;
  }

  function x2() {
    clearInterval(interval);
    setInter(setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 5));
  }
  function x1() {
    clearInterval(interval);
    setInter(setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 10));
  }
  function x3() {
    clearInterval(interval);
    setInter(setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 3));
  }


  return (
    <div className='bigdivformmod'>
       {loading ? <div className=" ">Loading</div> : <Modeling mtrx={mtrx} ways={schedule} timer={timer} setErr={setErr}/>}
      <div className='columndiv'>
        <ScheduleTable2 schedule={schedule} loading={loading}/>

        <div className='divwithform'>
          <div className='form5'>

            <legend>Введите параметры для запуска моделирования</legend>

            <span className='strocktimer'>
              <label >Начало
              </label>
              <span>
                <input type="time" className="addtime2" onChange={(e) => setStartPoint(e.target.value)} />
              </span>
              <label>Конец
              </label>
              <span>
                <input className="addtime2" type="time" onChange={(e) => setEndPoint(e.target.value)}></input>
              </span>
            </span>

            <span className='strocktimer'>
              <label>Скорость:</label>
              <button onClick={()=>myPusk(10)} id='x1'>1X</button>
              <button onClick={()=>myPusk(5)} id='x2'>2X</button>
              <button onClick={()=>myPusk(3)} id='x3'>3X</button>
              <button onClick={()=>myPusk(10)} id="pusk">Запуск</button>
            </span>


          </div>

          <div className='rec'>
            <button onClick={stop} className="sqvare"></button>
            <button onClick={pause} className='pause'></button>
            <button onClick={pusk} className="treug"></button>

          </div>

        </div>

      </div>
      <div className='buttonex'>
        <button className='ex4'>Выход</button>
      </div>
      <div className='timer'>
        <p id="timer">Время</p>
        <p ref={time} id="timer2" >
          {Math.floor(Math.floor(timer/100)/60)< 10 ? '0'+Math.floor(Math.floor(timer/100)/60) : Math.floor(Math.floor(timer/100)/60)}:{Math.floor(timer/100)%60 < 10 ? '0'+Math.floor(timer/100)%60 : Math.floor(timer/100)%60}
          </p>
      </div>
    </div>

  );
}

export default ModelirovaniePage; 