import '../pagesStyle/HomePage.css';
import React, { useState } from "react";
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  function handleLogin() {
    AuthService.login(login, password).then(
      () => {
        navigate("/home");
      },
      error => {
        navigate("/home");
        console.log(error);
      }
    );
  }

  return (

    <div className='divhome'>

      <div className='form1'>
        <h1 className="text-[500%]">Авторизация</h1>
        <label class="lab">Логин<br /><input className="in" type="text" minLength="4" maxLength="12" value={login} onChange={e => setLogin(e.target.value)}></input></label><br />
        <label class="lab">Пароль<br /><input className="in" type="password" minLength="4" maxLength="12" value={password} onChange={e => setPassword(e.target.value)}></input></label> <br />

        <button className='but' onClick={() => handleLogin()}>Войти</button>
      </div>

    </div>

  );
}


export default LoginPage; 