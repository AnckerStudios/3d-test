import '../pagesStyle/SchedulePage.css';
import React from "react";


function SchedulePage() {
 
    const data = [
    {nplat: "1", nputi: "2", npoezd : "D500A", timepr: "8:00", timeotp: "8:30", marshrut: "Санкт-Петербург-Екатеринбург",type:"п"},
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
        
        <div className='divbigshed'>
            <header className='head'>
            <a href='http://localhost:3000/admin-menu' id = "t1">назад</a>
            <a href='http://localhost:3000/admin-menu' id = 't2'>домой</a>         
            </header> 
            <div className='divlistshed'>
            <table id='shedulepage' className = "table2">
            <caption>Расписание</caption>
            <thead>
            <tr>
                <th>№ платф.</th>
                <th>№ пути</th>
                <th>№ поезда</th>
                <th>время<br/>прибытия</th>
                <th>время<br/>отбытия</th>
                <th>маршрут</th>
                <th>тип поезда</th>
             </tr>
            </thead>
            <tbody>
                {items}{items}
            </tbody>
        </table>
            </div>   
         
        <button  className='ex3'>Выход</button>
        </div>
    );
}
export default SchedulePage; 