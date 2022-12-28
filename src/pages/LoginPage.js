import '../pagesStyle/HomePage.css';
import React, { useState } from "react";
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QG1haWwucnUiLCJleHAiOjE2NzU4NTg3NjJ9.bXfQhicCjcLBK3cGB9Xa2D2F4yiqtZ0cKXP8bQPy8Lv8r4-aBdgJHDl0sJQr9Jb32pAYclv7r849jmygTmnAyA';
  function handleLogin() {
    console.log(atob(token))
    // AuthService.login(login, password).then(
    //   () => {
    //     navigate("/home");
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
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