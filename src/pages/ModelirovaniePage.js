import '../pagesStyle/ModelirovaniePage.css';
import React from "react";


function ModelirovaniePage() {
    let time=React.createRef();
    let hour=React.createRef(); 
    let min=React.createRef(); 
    let minEnd=React.createRef(); 
    let hourEnd=React.createRef(); 
    let interval;
    let h,m;
    let speed=1000;
  
    function start() 
    {
      h=hour.current.value;
      m=min.current.value;
      if (m<0 || m>60 || h<0 || h>23 || hourEnd.current.value<0 || hourEnd.current.value>23 || hourEnd.current.value < h)
          {
              hour.current.value=0;
              min.current.value=0;
              hourEnd.current.value = 0;
              minEnd.current.value = 0;
              time.current.innerHTML="Некорректный ввод";
          }
          else{
              clearInterval(interval);
              interval=setInterval(addTime,speed);
            }
    }
  
    function addTime()
    {
           if(((h===hourEnd.current.value) && (m===minEnd.current.value)) || ((h===hourEnd.current.value) && ( m==="0" + minEnd.current.value))|| ((h==="0"+hourEnd.current.value) && ( m==="0" + minEnd.current.value)))
      {
          m = m < 10 ? '0'+ m : m;
          time.current.innerHTML = h + ":" + m;
          clearInterval(interval);
      }
      else 
      {
          if(m !== 59)
          {
              m = m < 10 ? '0'+ m : m;
              time.current.innerHTML = h + ":" + m;
              m++;
          }
          else 
          {
              time.current.innerHTML = h + ":" + m;
              m = 0;
              
              h++;
              h = h < 10 ? '0'+ h : h;
          }
      }
            
    }
  
     function pause () {
          min.current.value = m;
          hour.current.value =  h;
          clearInterval(interval);
    }
  
   function stop () {
          hour.current.value=0;
          min.current.value=0;
          hourEnd.current.value=0;
          minEnd.current.value=0;
          time.current.innerHTML="00:00";
          clearInterval(interval);
    }
    
    function x2(){
      speed=500;
    }
    function x1(){
      speed=1000;
    }
    function x3(){
      speed=250;
    }
  
    return (
      <div >
         
          <section className='form5'>
                  <legend>Введите параметры для запуска моделирования</legend>
                  
                  <section className = 'firstStroka'>
                      <label className ='lbl'>Начало</label>
                      <span>
                          <input type = "number" min ="0" max ="23" className = "tim" ref={hour}/>
                          <input type = "number" min ="0" max ="60" className = "tim" ref={min}/>
                      </span>
                      
                      <label>Скорость:</label>
                      <button onClick={x1} id = 'x1'>1X</button>
                      <button onClick={x2} id = 'x2'>2X</button>
                      <button onClick={x3} id = 'x3'>3X</button>
                  </section>
                  <section className = 'secondStroka'>
                    <label className = 'lbl2'>Конец</label>
                    <span  id = 'end'>
                        <input type = "number" min ="0" max ="23" className = "tim" ref={hourEnd} />
                        <input type = "number" min ="0" max ="60" className = "tim" ref={minEnd}/>
                    </span>
                    
                    <button onClick={start} id = "pusk">Запуск</button>
                  </section>
          </section>
  
              <section >
              <p id = "timer">Время</p>
              <p id = "timer2" ref = {time} >00:00</p>
              </section>
  
              <section className='rec'>
                  <button onClick={stop} id = "sqvare"></button>
                  <button onClick={start} id = "treug"></button>
                  <button onClick={pause} id = 'pause'>
                      <section className='dd'/>
                      <section className='dd2'/>
                  </button>
              </section>
          <button className='ex4'>Выход</button>
          </div>
      
    );
  }
  
  export default ModelirovaniePage; 