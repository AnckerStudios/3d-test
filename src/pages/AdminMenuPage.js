import '../pagesStyle/AdminMenuPage.css';
import React from "react";


function AdminMenuPage() {


    return (

        <div className='divbig'>
            <div className='div2'>

                <h1 className='txtadmin'>Администратор</h1>
                <form action='http://localhost:3000/list-manager'>
                    <button className='buttonam' >Работа со списком пользователей</button>
                </form>
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


export default AdminMenuPage; 