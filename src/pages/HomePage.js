import '../pagesStyle/HomePage.css';
import React, { useState } from "react";


function HomePage() {
    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    
    return (
    
        <div className='divhome'>
            
            <form className='form1'>
                <h1 className = "text-[500%]">Авторизация</h1>
                <label class = "lab">Логин<br/><input className ="in"type = "text" minLength = "4" maxLength = "12" value={login} onChange={e => setLogin(e.target.value)}></input></label><br/>
                <label class = "lab">Пароль<br/><input className ="in" type = "password" minLength = "4" maxLength = "12" value={password} onChange={e => setPassword(e.target.value)}></input></label> <br/>
                
                <button className='but'>Войти</button>
            </form>
        
        </div>
        
    );
}


export default HomePage; 