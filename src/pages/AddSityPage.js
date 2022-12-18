import '../pagesStyle/AddSityPage.css';
import React from "react";


function AddSityPage() {
    const data = [{ city: "Самара" }, { city: "Москва" }, { city: "Санкт-Петербург" }, { city: "Оренбург" },]
    const items = []
    for (let i = 0; i < data.length; i++) {
        items.push(<option>{data[i].city}</option>)
    }
    return (

        <div className='divbigaddsity'>
            <header className='head'>
                <a href='http://localhost:3000/' id="t3">назад</a>
                <a href='http://localhost:3000/admin-menu' id='t4'>домой</a>
            </header>
            <div className='divch'>
                <div className='form2'>
                    <legend className='lgsity'>Введите город</legend>
                    <input className="NewSity" placeholder='Введите город...' list='list' />
                    <datalist id='list'>
                        {items}
                    </datalist>
                    <br />
                    
                    <form action=''>
                            <button className='button2'>Создать</button>
                        </form>
                </div>
            </div>


        </div>

    );
}
export default AddSityPage; 