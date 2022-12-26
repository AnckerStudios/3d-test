import '../pagesStyle/AdminMenuPage.css';
import React from "react";
import { Link } from 'react-router-dom';


function HomePage() {


    return (

        <div className='divbig'>
            <div className='div2'>

                <h1 className='txtadmin'>Администратор</h1>
                <Link to={'/list-manager'}>
                    <button className='buttonam' >Работа со списком пользователей</button>
                </Link>
                <br />
                <form action=''>
                    <button className='buttonam'>Работа с топологиями</button>
                </form>
                <br />
                <form action='http://localhost:3000/home'>
                    <button className='buttonam'>Выйти из аккаунта</button>
                </form>
            </div>
        </div>

    );
}


export default HomePage; 