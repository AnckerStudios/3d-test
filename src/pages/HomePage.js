import '../pagesStyle/HomePage.css';
import React from "react";


function HomePage() {
    
    
    return (
    
        <div>
            
            <form className='form1'>
                <h1 className = "text-[400%]">Авторизация</h1>
                <label class = "lab">Логин<br/><input className ="in"type = "text" minLength = "4" maxLength = "12"></input></label><br/>
                <label class = "lab">Пароль<br/><input className ="in" type = "password" minLength = "3" maxLength = "12"></input></label> <br/>
                
                <button className='but'>Войти</button>
            </form>
        
        </div>
        
    );
}


export default HomePage; 