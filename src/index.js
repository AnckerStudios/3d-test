import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TestMes from './testComponent/TestMes';
import HomePage from './pages/HomePage';
import AppTest from './testComponent/AppTest';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter><AppTest /></BrowserRouter>
);


