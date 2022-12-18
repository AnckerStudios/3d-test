import '../pagesStyle/HomePage.css';
import React from "react";


function HomePage() {
    
    
    return (
    
        <div>
            
            <div className='form1'>
                <h1 className = "text-[500%]">Авторизация</h1>
                <label class = "lab">Логин<br/><input className ="in"type = "text" minLength = "4" maxLength = "12"></input></label><br/>
                <label class = "lab">Пароль<br/><input className ="in" type = "password" minLength = "4" maxLength = "12"></input></label> <br/>
                
                <button className='but'>Войти</button>
            </div>
        
        </div>
        
    );
}


export default HomePage; 