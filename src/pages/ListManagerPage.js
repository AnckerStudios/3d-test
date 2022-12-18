import '../pagesStyle/ListManagerPage.css';
import React from "react";


function ListManagerPage() {

    const data = [
        { name: "Вася", login: "vasya", password: "3333" },
        { name: "Артём", login: "geller", password: "4444" },
        { name: "Тори", login: "tort", password: "5555" },
        { name: "Илья", login: "anker", password: "6666" },
        { name: "Румия", login: "akirovarm", password: "7777" }
    ]
    const items = []
    for (let i = 0; i < data.length; i++) {
        items.push(<tr>
            <td>{i + 1}</td>
            <td>{data[i].name}</td>
            <td>{data[i].login}</td>
            <td>{data[i].password}</td>
        </tr>)
    }
    return (

        <div className='div'>
            <div className='managlist'>
                <table className="table" cellPadding="10">
                    <caption>Список менеджеров</caption>
                    <thead>
                        <tr>
                            <th>N#</th>
                            <th>Имя</th>
                            <th>Логин</th>
                            <th>Пароль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>


            </div>
            <div className='Myform'>
                <fieldset>
                    <legend>Добавить менеджера</legend>
                    <label id='name' className='lbl'>Имя <input className="add" type="text" maxLength="15"/></label>
                    <label id='login' className='lbl'>Логин <input className="add" type="text" minLength="4" maxLength="12"/></label>
                    <label id='password' className='lbl'>Пароль <input className="add" type="text" minLength="4" maxLength="12"/></label>
                    <button className='cent'>Добавить</button>
                </fieldset>
            </div>
            <a href='http://localhost:3000/admin-menu' className='ex'>x</a>
        </div>
    );
}
export default ListManagerPage; 