import '../pagesStyle/ManagerMenuPage.css';
import React from "react";


function HomeModerPage() {


    return (
        <div className='divbig'>
            <div className='div2'>
                <h1 className="txtadmin">Менеджер</h1>
                <button className='buttonmm'>Перейти к моделированию</button>
                <br />
                <form action='http://localhost:3000/home'>
                    <button className='buttonmm'>Выйти из аккаунта</button>
                </form>
            </div>
        </div>
    );
}


export default HomeModerPage; 