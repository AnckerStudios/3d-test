import '../pagesStyle/ModelirovaniePage.css';
import React from "react";


function ModelirovaniePage() {
    const hours =[]
    for(let i =0; i<24;i++){
        hours.push(
            <option>{i}</option>
        )
    }
    const min =[]
    for(let i =0; i<60;i++){
        min.push(
            <option>{i}</option>
        )
    }
    const data = [
        {nplat: "1", nputi: "2", npoezd : "D500A", timepr: "8:00", timeotp: "8:30", marshrut: "Санкт-Петербург-Екатеринбург",type:"п"},
        {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
        {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
        {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
        {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
        ]
        const items = []
            for(let i = 0; i < data.length; i++){
                 items.push( <tr>
                    <td>{data[i].nplat}</td>
                    <td>{data[i].nputi}</td>
                    <td>{data[i].npoezd}</td>
                    <td>{data[i].timeotp}</td>
                    <td>{data[i].timepr}</td>
                    <td>{data[i].marshrut}</td>
                    <td>{data[i].type}</td>
                </tr>)  
            }

        return (
        
        <div>  
            <form className='form5'>
                <legend className='ff5'>Введите параметры для запуска моделирования</legend>
                <br/>
                <label>Начало
                <span>
                    <select className = "tim">
                        {hours}
                    </select>
                    <text>:</text>
                    <select className = "tim">
                        {min}
                    </select>
                    </span>
                </label>
                <label>Скорость:</label>
                <button id = 'x1'>1X</button>
                <button id = 'x2'>2X</button>
                <button id = 'x3'>3X</button>
                <br/>
                <br/>
                <label id = "endlabel">Конец
                <span  id = 'end'>
                    <select className = "tim">
                        {hours}
                    </select>
                    <text>:</text>
                    <select className = "tim">
                        {min}
                    </select>
                    </span>
                </label>
                <button id = "pusk">Запуск</button>
            </form>
            <span id = "timer">Время<br/>
                00 : 00
            </span>
            <table className = "table3">
            <thead>
            <tr className='trtab'>
                <th>№ платф.</th>
                <th>№ пути</th>
                <th>№ поезда</th>
                <th>время<br/>прибытия</th>
                <th>время<br/>отбытия</th>
                <th>маршрут</th>
                <th>тип<br/>поезда</th>
             </tr>
            </thead>
            <tbody>
                {items}{items}
            </tbody>
        </table>
            <form className='rec'>
                <button id = "sqvare"></button>
                <button id = "treug"></button>
                <button id = 'pause'>
                    <form className='dd'></form>
                    <form className='dd2'></form>
                </button>
            </form>
        <button className='ex4'>Выход</button>
        </div>
        
    );
}
export default ModelirovaniePage; 