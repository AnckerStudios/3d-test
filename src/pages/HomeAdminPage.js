import '../pagesStyle/AdminMenuPage.css';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthService, { getCurRole } from '../services/auth.service';
import authService from '../services/auth.service';


function HomeAdminPage() {

    const navigate = useNavigate();
    function logout(){
        AuthService.logout()
        navigate("/login");
          
    }
    
    return (

        <div className='divbig'>
            <div className='div2'>

                <h1 className='txtadmin'>{getCurRole() ?  'Администратор' : 'Менеджер'}</h1>
                <Link to={'/city'}>
                    <button className='buttonam'>{getCurRole() ?  'Работа с топологиями' : 'Моделирование'}</button>
                </Link>
                <br />
                {getCurRole() && <>
                <Link to={'/list-manager'}>
                    <button className='buttonam' >Работа со списком пользователей</button>
                </Link>
                <br />
                
                <Link to={'/trains'}>
                    <button className='buttonam'>Поезда</button>
                </Link>
                <br />
                </> }
                

                <div onClick={()=>logout()}>
                    <button className='buttonam'>Выйти из аккаунта</button>
                </div>
            </div>
        </div>

    );
}


export default HomeAdminPage; 