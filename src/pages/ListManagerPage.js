import '../pagesStyle/ListManagerPage.css';
import React from "react";


function ListManagerPage() {
 
    const data = [
    {name: "Вася", login: "vasya", password : "333"},
    {name: "Артём", login: "geller", password : "444"},
    {name: "Тори", login: "tort", password : "555"},
    {name: "Илья", login: "anker", password : "666"},
    {name: "Румия", login: "akirovarm", password : "777"}
    ]
    const items = []
        for(let i = 0; i < data.length; i++){
             items.push( <tr>
                <td>{i+1}</td>
                <td>{data[i].name}</td>
                <td>{data[i].login}</td>
                <td>{data[i].password}</td>
            </tr>)  
        }
    return (
        <div className='div'>
         <table className = "table" cellPadding="10">
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
    
        <form className='Myform'>
            <fieldset>
                <legend>Добавить менеджера</legend>
                <label className='lbl'>Имя <input className = "add" type = "text" maxLength = "15"></input></label>
                <label className='lbl'>Логин <input className = "add" type = "text" minLength = "4" maxLength = "12"></input></label>
                <label className='lbl'>Пароль <input className = "add" type = "text" minLength = "4" maxLength = "12"></input></label>
                <button className='cent'>Добавить</button>
            </fieldset>
        </form>
        <button className='ex'>Выход</button>
        </div>
    );
}
export default ListManagerPage; 