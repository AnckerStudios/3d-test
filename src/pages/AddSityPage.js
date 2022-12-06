import '../pagesStyle/AddSityPage.css';
import React from "react";


function AddSityPage() {
    const data = [{city:"Самара"}, {city:"Москва"},{city:"Санкт-Петербург"},{city:"Оренбург"}, ]
        const items = []
            for(let i = 0; i < data.length; i++){
                 items.push(<option>{data[i].city}</option>)  
            }
    return (
        
        <div>  
            <header className='head'>
            <a href='http://localhost:3000/admin-menu' id = "t1">назад</a>
            <a href='http://localhost:3000/admin-menu' id = 't2'>домой</a>         
            </header>    
            <form className='form2'>
                <legend className='lgsity'>Введите город</legend>
                <input className = "NewSity" placeholder='Введите город...' list='list'/>
                    <datalist id = 'list'>
                        {items}
                    </datalist>
                <br/>
                <button className='button2'>Создать</button>
                
            </form>
            
        </div>
        
    );
}
export default AddSityPage; 