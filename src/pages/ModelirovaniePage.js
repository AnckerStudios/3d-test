import '../pagesStyle/ModelirovaniePage.css';
import React from "react";
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
  let time = React.createRef();
  let hour = React.createRef();
  let min = React.createRef();
  let minEnd = React.createRef();
  let hourEnd = React.createRef();
  let interval;
  let h, m;
  let speed = 1000;

  function start() {
    h = hour.current.value;
    m = min.current.value;
    if (m < 0 || m > 60 || h < 0 || h > 23 || hourEnd.current.value < 0 || hourEnd.current.value > 23 || hourEnd.current.value < h) {
      hour.current.value = 0;
      min.current.value = 0;
      hourEnd.current.value = 0;
      minEnd.current.value = 0;
      time.current.innerHTML = "Некорректный ввод";
    }
    else {
      clearInterval(interval);
      interval = setInterval(addTime, speed);
    }
  }

  function addTime() {
    if (((h === hourEnd.current.value) && (m === minEnd.current.value)) || ((h === hourEnd.current.value) && (m === "0" + minEnd.current.value)) || ((h === "0" + hourEnd.current.value) && (m === "0" + minEnd.current.value))) {
      m = m < 10 ? '0' + m : m;
      time.current.innerHTML = h + ":" + m;
      clearInterval(interval);
    }
    else {
      if (m !== 59) {
        m = m < 10 ? '0' + m : m;
        time.current.innerHTML = h + ":" + m;
        m++;
      }
      else {
        time.current.innerHTML = h + ":" + m;
        m = 0;

        h++;
        h = h < 10 ? '0' + h : h;
      }
    }

  }

  function pause() {
    min.current.value = m;
    hour.current.value = h;
    clearInterval(interval);
  }

  function stop() {
    hour.current.value = 0;
    min.current.value = 0;
    hourEnd.current.value = 0;
    minEnd.current.value = 0;
    time.current.innerHTML = "00:00";
    clearInterval(interval);
  }

  function x2() {
    speed = 500;
  }
  function x1() {
    speed = 1000;
  }
  function x3() {
    speed = 250;
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
                <input className="addtime2" type="time"></input>
              </span>
              <label>Конец
              </label>
              <span>
                <input className="addtime2" type="time"></input>
              </span>
            </span>

            <span className='strocktimer'>
              <label>Скорость:</label>
              <button onClick={x1} id='x1'>1X</button>
              <button onClick={x2} id='x2'>2X</button>
              <button onClick={x3} id='x3'>3X</button>
              <button onClick={start} id="pusk">Запуск</button>
            </span>


          </div>

          <div className='rec'>
            <button onClick={stop} id="sqvare"></button>
            <button onClick={pause} id='pause'>
              <div>
                <section className='dd' />
                <section className='dd2' />
              </div>
            </button>
            <button onClick={start} id="treug"></button>

          </div>

        </div>

      </div>
      <div className='buttonex'>
          <a href='http://localhost:3000/admin-menu' className='ex4'>x</a>
      </div>
      <div className='timer'>
        <p id="timer">Время</p>
        <p id="timer2" ref={time} >00:00</p>
      </div>
    </div>

  );
}

export default ModelirovaniePage; 