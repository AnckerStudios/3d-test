import '../pagesStyle/AdminMenuPage.css';
import React from "react";


function AdminMenuPage() {
    
    
    return (
    
        <div className='div2'>      
            <h1 className = "text-[400%]">Администратор</h1>
            <button className='button3'>Работа со списком пользователей</button>
            <br/>
            <button className='button3'>Работа с топологиями</button> 
            <br/>
            <button className='button3'>Выйти из аккаунта</button>
        </div>
        
    );
}


export default AdminMenuPage; 