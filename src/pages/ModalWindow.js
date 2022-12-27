import '../pagesStyle/ModalWindow.css';
import React, { useState } from "react";


const ModalWindow = ({ active, setActive }) => {

    const nplat = ['1', '2', '3', '4']
    const nput = ['1', '2', '3', '4']
    const type = ['Пассаж.', 'Груз.', 'Электричка']
    const sity = [{ city: "Самара" }, { city: "Москва" }, { city: "Санкт-Петербург" }, { city: "Оренбург" },]
    const sitys = []
    for (let i = 0; i < sity.length; i++) {
        sitys.push(<option>{sity[i].city}</option>)
    }
    const types = []
    for (let i = 0; i < type.length; i++) {
        types.push(<option>{type[i]}</option>)
    }
    const platforms = []
    for (let i = 0; i < nplat.length; i++) {
        platforms.push(
            <option>{nplat[i]}</option>
        )
    }
    const puty = []
    for (let i = 0; i < nput.length; i++) {
        puty.push(
            <option>{nput[i]}</option>
        )
    }
    return (
        <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
            <div className='popupBody' onClick={e => e.stopPropagation()}>
                <div className='popupContent'>
                    <form className='formsep'>
                        <fieldset>
                            <legend>Добавить запись</legend>
                            <label id="firstlab">Выберите платформу<select className="addsep cursor-pointer">
                                {platforms}
                            </select></label><br />
                            <label>Выберите путь<select className="addsep cursor-pointer">
                                {puty}
                            </select></label><br />
                            <label>Введите номер поезда<input className="addsep text-center" type="text" minLength="1" maxLength="6"></input></label>
                            <br />
                            <label>Время прибытия
                                <span id="tpr">
                                    <input className="addtime" type="time"></input>
                                </span>
                            </label> <br />
                            <label>Время отравления
                                <span id='totpr'>
                                    <input className="addtime" type="time"></input>
                                </span>
                            </label>
                            <br />
                            <label>Город отправления<input className="addsep" placeholder='Введите город...' list='list' />
                                <datalist id='list'>
                                    {sitys}
                                </datalist>
                            </label><br />
                            <label>Город прибытия<input className="addsep" placeholder='Введите город...' list='list' />
                                <datalist id='list'>
                                    {sitys}
                                </datalist>
                            </label><br />
                            <label>Выберите тип поезда<select className="addsep cursor-pointer">
                                {types}
                            </select></label><br />
                            <button id="bb" className='centr'>Добавить</button>
                        </fieldset>
                    </form>
                </div>
                <div className='popupClose' onClick={() => setActive(false)}>x</div>
            </div>
        </div>

    );
}


export default ModalWindow; 