import '../pagesStyle/ListManagerPage.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';


function ListManagerPage() {
    const [moder, setModer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModer, setAddModer] = useState({id: 0});
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/services/controller/user/allmod')
        .then(function (response) {
            setModer(response.data);
            console.log(response);
            setLoading(false);
        })
        .catch(function (error) {
            setModer([{id: 1, name: "Kolya", email: "hhh@gmail.com", role: "MODER"},{id: 1, name: "Kolya", email: "hhh@gmail.com", role: "MODER"},{id: 1, name: "Kolya", email: "hhh@gmail.com", role: "MODER"}]);
            console.log(error);
            setLoading(false);
        });
    },[])

    function del(index){

        axios.delete('http://localhost:8080/api/schedule', {
            params: {
              //idTopology: id,
              
            }
        })
        .then(function (response) {
            let copy = Object.assign([], moder);
            // let index = copy.findIndex(item => item.idSchedule == idSchedule);
            copy.splice(index,1)
            setModer(copy);
            console.log(response);
        })
        .catch(function (error) {
            let copy = Object.assign([], moder);
            // let index = copy.findIndex(item => item.idSchedule == idSchedule);
            copy.splice(index,1)
            setModer(copy);
            console.log(error);
        }); 
    }

    function add(addItem){
        console.log(addItem)
        axios.post('http://localhost:8080/api/services/controller/user/register', addItem 
        )
        .then(function (response) {
            let copy = Object.assign([], moder);
            copy.push(addItem)
            setModer(copy);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            
        });
    }
    const items = []
    for (let i = 0; i < moder.length; i++) {
        items.push(<tr>
            <td>{i + 1}</td>
            <td>{moder[i].name}</td>
            <td>{moder[i].email}</td>
        
        </tr>)
    }
    return (

        <div className='div'>
            <div className='managlist'>
                <table className="table" cellPadding="10">
                    <caption>Список менеджеров</caption>
                    <thead>
                        <tr>
                            <th>N#</th>
                            <th>Имя</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <div>Loading...</div>: items}
                    </tbody>
                </table>


            </div>
            <div className='Myform'>
                <fieldset>
                    <legend>Добавить менеджера</legend>
                    <label id='name' className='lbl'>Имя <input className="add" type="text" maxLength="15" onChange={(e)=>{setAddModer({...addModer, name: e.target.value})}}/></label>
                    <label id='login' className='lbl'>Email <input className="add" type="text" minLength="4" maxLength="12" onChange={(e)=>{setAddModer({...addModer, email: e.target.value})}}/></label>
                    <label id='password' className='lbl'>Пароль <input className="add" type="text" minLength="4" maxLength="12" onChange={(e)=>{setAddModer({...addModer, password: e.target.value})}}/></label>
                    <button className='cent' onClick={()=>{add(addModer)}}>Добавить</button>
                </fieldset>
            </div>
            <a href='http://localhost:3000/home' className='ex'>x</a>
        </div>
    );
}
export default ListManagerPage; 