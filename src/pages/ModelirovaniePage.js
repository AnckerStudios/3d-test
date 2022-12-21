import '../pagesStyle/ModelirovaniePage.css';
import React, { createRef } from "react";
import { useState } from "react";

const data = [
  { nplat: "1", nputi: "2", npoezd: "D500A", timepr: "8:00", timeotp: "8:30", marshrut: "Санкт-Петербург-Екатеринбург", type: "п" },
  { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
  { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
  { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
]

const items = []
for (let i = 0; i < data.length; i++) {
  items.push(<tr>
    <td>{data[i].nplat}</td>
    <td>{data[i].nputi}</td>
    <td>{data[i].npoezd}</td>
    <td>{data[i].timeotp}</td>
    <td>{data[i].timepr}</td>
    <td>{data[i].marshrut}</td>
    <td>{data[i].type}</td>
  </tr>)
}

function ModelirovaniePage() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  let arr, arr2, h, m, hourEnd, minuteEnd;
  let time = createRef();
  let interval;

  function pusk() {
    arr = start.split(':');
    arr2 = end.split(':');
    h = arr[0];
    m = arr[1];
    hourEnd = arr2[0]
    minuteEnd = arr2[1];

    if (hourEnd < h) {
      h = 0;
      m = 0;
      hourEnd = 0;
      minuteEnd = 0;
      time.current.innerHTML = "Некорректный ввод";
    }
    else {
      clearInterval(interval);
      interval = setInterval(addTime, 1000);
    }
  }

  function addTime() {
    if (((h === hourEnd) && (m === minuteEnd)) || ((h === hourEnd) && (m === "0" + minuteEnd)) || ((h === "0" + hourEnd) && (m === "0" + minuteEnd))) {
      m = m < 10 && m !== '00' ? '0' + m : m;
      time.current.innerHTML = h + ":" + m;
      clearInterval(interval);
    }
    else {
      if (m !== 59) {
        if (m < 10) {
          if (m < 10 && m.length !== 2) {
            m = '0' + m;
          }


        }

        time.current.innerHTML = h + ":" + m;
        m++;
      }
      else {
        time.current.innerHTML = h + ":" + m;
        m = '00';
        h++;
        h = h < 10 ? '0' + h : h;
      }
    }
  }

  function pause() {
    setStart(h + ':' + m);
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
    interval = setInterval(addTime, 500);
  }
  function x1() {
    clearInterval(interval);
    interval = setInterval(addTime, 1000);
  }
  function x3() {
    clearInterval(interval);
    interval = setInterval(addTime, 250);
  }


  return (
    <div className='bigdivformmod'>
      <div className='columndiv'>
        <div className='divwithtable'>
          <table className="table3">
            <caption>Расписание</caption>
            <thead>
              <tr className='trtab'>
                <th>№ платф.</th>
                <th>№ пути</th>
                <th>№ поезда</th>
                <th>время<br />прибытия</th>
                <th>время<br />отбытия</th>
                <th>маршрут</th>
                <th>тип поезда</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>

        <div className='divwithform'>
          <div className='form5'>

            <legend>Введите параметры для запуска моделирования</legend>

            <span className='strocktimer'>
              <label >Начало
              </label>
              <span>
                <input type="time" className="addtime2" onChange={(e) => setStart(e.target.value)} />
              </span>
              <label>Конец
              </label>
              <span>
                <input className="addtime2" type="time" onChange={(e) => setEnd(e.target.value)}></input>
              </span>
            </span>

            <span className='strocktimer'>
              <label>Скорость:</label>
              <button onClick={x1} id='x1'>1X</button>
              <button onClick={x2} id='x2'>2X</button>
              <button onClick={x3} id='x3'>3X</button>
              <button onClick={pusk} id="pusk">Запуск</button>
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
        <p ref={time} id="timer2" >00:00</p>
      </div>
    </div>

  );
}

export default ModelirovaniePage; 