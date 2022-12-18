import '../pagesStyle/NewMacketPage.css';
import React from "react";


function NewMacketPage() {
        return (
        
        <div className='bigdivnmp'>  
            <header className='head'>
            <a href='http://localhost:3000/admin-menu' id = "t3">назад</a>
            <a href='http://localhost:3000/admin-menu' id = 't4'>домой</a>
            </header>    
            <form className='form3'>
                <legend className='NewMacket'>Настройка макета</legend>
                <div className='diiv1' ><label>Длина<br/><input className='numbin' type="number" maxLength='3' min = "10" max = "100" placeholder='10'></input></label></div>
                <div className='diiv2'><label>Ширина<br/><input className='numbin' type="number" maxLength='3' min = "10" max = "100" placeholder='10'></input></label><br/></div>
                <div className='diiv3'><label>Название<br/><input className='namein'></input></label></div>
                <br/>
                <button className='button4'>Создать</button>
                
            </form>
            
        </div>
        
    );
}
export default NewMacketPage; 