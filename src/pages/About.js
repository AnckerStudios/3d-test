import '../pagesStyle/About.css';
import React from "react";
import { Route, Routes, Link } from 'react-router-dom';


function About() {


    return (
        <div className='divbigabout'>
            <div className='divAbout'>
                <h1 className="headAbout">В главных ролях:</h1>
                <span className='namePhoto'>
                    <img className='img2' src='./picture/photo_ilya.jpg' /><Link to={'//vk.com/id154159881'} target="_blank">Главный фронтендер - Илья</Link>
                </span>
                <span className='namePhoto'>
                    <img className='img2' src='./picture/photo_tori.jpg' /><Link to={'//vk.com/tori_tih'} target="_blank">Бэкендер на пол ставки - Тори</Link>
                </span>
                <span className='namePhoto'>
                    <img className='img2' src='./picture/photo_vasya.jpg' /><Link to={'//vk.com/v.koscheeva'} target="_blank">Просто Вася</Link>
                </span>
                <span className='namePhoto'>
                    <img className='img2' src='./picture/photo_rumia.jpg' /><Link to={'//vk.com/akirova_rm'} target="_blank">Редактор - Румия</Link>
                </span>
                <span className='namePhoto'>
                    <img className='img2' src='./picture/photo_artyom.jpg' /><Link to={'//vk.com/id112438205'} target="_blank">Главный по папочкам - Артём</Link>
                </span>
            </div>
            <div className='divAboutSystem'>
                <h1>Система моделирования работы железной дороги</h1><br />
                <h2>Во время лабораторного практикума разработаны алгоритмы и соответствующая им программа, позволяющая<br /> создавать топологии ЖД станций, составлять расписание поездов и моделировать работу ЖД станции.<br /> Топологии хранятся в бинарном файле и могут редактироваться внутри программы. <br />Расписание составляется на основе выбранной топологии. <br />Программа позволяет моделировать движение поездов, на основе составленного расписания.<br /> В системе имеется возможность сохранения топологии в файл с целью последующей работы с ней.</h2>
                <br />
                <div className='butsee'>
                    <Link to={'/aboutprogram'} target="_blank">
                    <button>Смотреть инструкцию пользователя</button>
                    </Link>
                    
                </div>

            </div>
           



        </div>
    );
}


export default About; 