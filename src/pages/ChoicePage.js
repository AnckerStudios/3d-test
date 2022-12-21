import '../pagesStyle/ChoicePage.css';
import React from "react";


function ChoicePage() {
    return (
        <div className='divbigchoice'>
            <header className='head'>
                <a href='http://localhost:3000/' id='t3'>назад</a>
                <a href='http://localhost:3000/admin-menu' id='t4'>домой</a>
            </header>

            <span className='divch'>

                <div className='divchoice'>
                    <legend className='legcp'>Выберите действие</legend>
                    <div className='topology'>
                        <form action='http://localhost:3000/add-sity'>
                        <button id='b1'><img className='img1' width='140px' height='140px' alt='' src="./picture/new.png" /><label className='cp'>Создать новую топологию</label></button>
                        </form>
                        <form action=''>
                        <button id='b2'><img className='img1' width='140px' height='140px' alt='' src="./picture/download.png" /><label className='cp'>Загрузить топологию c устройства</label></button>
                        </form>
                        
                    </div>

                </div>

            </span>
        </div>
    );
}
export default ChoicePage; 