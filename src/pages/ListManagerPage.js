import '../pagesStyle/ListManagerPage.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';


function ListManagerPage() {
    const [moder, setModer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModer, setAddModer] = useState({id: null});
    const [errAdd,setErrAdd] = useState({flag: false, mes: ""});
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/services/controller/user/allmod')
        .then(function (response) {
            setModer(response.data);
            console.log(response);
            setLoading(false);
        })
        .catch(function (error) {
            setModer([{id: 1, name: "ы", email: "hhh@gmail.com", role: "MODER"},{id: 1, name: "Kolya", email: "hhh@gmail.com", role: "MODER"},{id: 1, name: "лох", email: "hhh@gmail.com", role: "MODER"}]);
            console.log(error);
            setLoading(false);
        });
    },[])

    function del(index){

        axios.delete('http://localhost:8080/api/services/controller/user', {
            params: {
              idAccount: moder[index].id,
              
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
            console.log(error.data);
        }); 
    }

    function add(addItem){
        axios.post('http://localhost:8080/api/services/controller/user/register', addItem 
        )
        .then(function (response) {
            let copy = Object.assign([], moder);
            copy.push(addItem)
            setModer(copy);
            console.log(response);
        })
        .catch(function (error) {
            console.log("sdadsadsada",errAdd);
            setErrAdd({flag: true, mes: error.response.data?.message || "Неполучилось добавить"});
        });
    }
    const items = []
    for (let i = 0; i < moder.length; i++) {
        items.push(<tr>
            <td>{i + 1}</td>
            <td>{moder[i].name}</td>
            <td ><div className=' flex justify-around items-center'> <div>{moder[i].email}</div><button className=' px-2 bg-blue-300 rounded-xl shadow-xl hover:bg-red-500' onClick={()=>del(i)}>X</button></div></td>
        
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
                    <label id='login' className='lbl'>Email <input className="add" type="text" minLength="4" maxLength="50" onChange={(e)=>{setAddModer({...addModer, email: e.target.value})}}/></label>
                    <label id='password' className='lbl'>Пароль <input className="add" type="text" minLength="4" maxLength="12" onChange={(e)=>{setAddModer({...addModer, password: e.target.value})}}/></label>
                    <button className='cent' onClick={()=>{add(addModer)}}>Добавить</button>
                    
                </fieldset>
                {errAdd.flag && <div className='lbl'>{errAdd.mes}</div>}
            </div>
        </div>
    );
}
export default ListManagerPage; 