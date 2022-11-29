import '../pagesStyle/ScheduleEditorPage.css';
import React from "react";


function ScheduleEditorPage() {
 
    const data = [
    {nplat: "1", nputi: "2", npoezd : "D500A", timepr: "8:00", timeotp: "8:30", marshrut: "Санкт-Петербург-Екатеринбург",type:"п"},
    {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
    {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
    {nplat: "1", nputi: "2", npoezd : "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2",type:"п"},
    ]
    const nplat = ['1','2','3','4']
    const nput = ['1','2','3','4']
    const type = ['Пассаж.','Груз.','Электричка']
    const sity = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
        const sitys = []
            for(let i = 0; i < sity.length; i++){
                 sitys.push(<option>{sity[i].city}</option>)  
            }
            const types = []
            for(let i = 0; i < type.length; i++){
                 types.push(<option>{type[i]}</option>)  
            }
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
    const platforms = []
        for(let i = 0; i < nplat.length; i++){
        platforms.push( 
            <option>{nplat[i]}</option>
        )  
        }
    const puty = []
        for(let i = 0; i < nput.length; i++){
        puty.push( 
            <option>{nput[i]}</option>
        )  
        }

    return (
        <div className='divsep'>
         <table className = "table2">
            <caption>Расписание</caption>
            <thead>
            <tr className='trtab'>
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
                {items}{items}{items}
            </tbody>
        </table>
    
        <form className='formsep'>
            <fieldset>
                <legend>Добавить запись</legend>
                <label id = "firstlab">Выберите платформу<select className = "addsep">
                        {platforms}
                    </select></label><br/>
                <label>Выберите путь<select className = "addsep">
                        {puty}
                    </select></label><br/>
                <label>Введите номер поезда<input className = "addsep text-center"  type = "text" minLength = "1" maxLength = "6"></input></label>
                <br/>
                <label>Время прибытия
                    <span id = "tpr">
                    <select className = "tim">
                        {hours}
                    </select>
                    <text>:</text>
                    <select id ="ti" className = "tim">
                        {min}
                    </select>
                    </span>
                </label> <br/>
                <label>Время отравления
                <span id='totpr'>
                    <select className = "tim">
                        {hours}
                    </select>
                    <text>:</text>
                    <select className = "tim">
                        {min}
                    </select>
                    </span>
                </label>
                <br/><br/>
                <label>Город отправления<input className = "addsep" placeholder='Введите город...' list='list'/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>Город прибытия<input className = "addsep" placeholder='Введите город...' list='list'/>
                    <datalist id = 'list'>
                        {sitys}
                    </datalist>
                </label><br/>
                <label>Выберите тип поезда<select className = "addsep">
                        {types}
                    </select></label><br/>
                <button id = "bb" className='cent'>Добавить</button>
            </fieldset>
        </form>
        <button  className='ex2'>Выход</button>
        </div>
    );
}
export default ScheduleEditorPage; 