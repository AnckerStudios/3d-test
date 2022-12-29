import React, { useEffect, useRef, useState } from "react";
import '../../pagesStyle/AddEntry.css';



function AddEntry({ inOut, platforms, trains, id, addSchedule, active, setActive, schedule }) {

    const [loading, setLoading] = useState(true);

    console.log("plte", platforms[0].lines)

    const [lineIndex, setLineIndex] = useState(0);
    const [planeIndex, setPlaneIndex] = useState(0);

    const type = ['Пассаж.', 'Груз.', 'Электричка'];
    const [entry, setEntry] = useState({ plate: platforms[0].number, plateLine: platforms[0].lines[lineIndex], arrivalTime: "00:00", departureTime: "00:00", in: inOut[0], out: inOut[0], typeTrain: type[0] });

    const sity = [{ city: "Самара" }, { city: "Москва" }, { city: "Санкт-Петербург" }, { city: "Оренбург" },]
    const sitys = []

    const [city, setCity] = useState(''); //значение инпута город отправления
    const [cityDirty, setCityDirty] = useState(false); //состояние "были ли мы в инпуте"
    const [cityError, setCityError] = useState('Введите город');

    const [cityArr, setArrCity] = useState(''); //значение инпута город прибытия
    const [cityArrDirty, setCityArrDirty] = useState(false); //состояние "были ли мы в инпуте"
    const [cityArrError, setCityArrError] = useState('Введите город');

    const [timeArr, setTimeArr] = useState(''); //значение инпута время прибытия
    const [timeArrDirty, setTimeArrDirty] = useState(false); //состояние "были ли мы в инпуте"
    const [timeArrError, setTimeArrError] = useState('Введите время');

    const [timeDep, setTimeDep] = useState(''); //значение инпута время отбытия
    const [timeDepDirty, setTimeDepDirty] = useState(false); //состояние "были ли мы в инпуте"
    const [timeDepError, setTimeDepError] = useState('Введите время');

    const [numberOfTrain, setNumberOfTrain] = useState(''); //значение инпута номер поезда
    const [numberOfTrainDirty, setNumberOfTrainDirty] = useState(false); //состояние "были ли мы в инпуте"
    const [numberOfTrainError, setNumberOfTrainError] = useState('Введите номер поезда');

    const [formValid, setFormValid] = useState(false);
    const[entryError, setEntryError] = useState('');

    
    //если форма не валидна, то запись не добавляется
    useEffect(() => {
        if (cityError || cityArrError || timeArrError || timeDepError || numberOfTrainError) {
            setFormValid(false);
        }
        else { setFormValid(true); }
    }, [cityError, cityArrError, timeArrError, timeDepError])

    //функция при событии ONCHANGE на инпутах
    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'city':

                if (e.target.value.length > 0) {
                    if (e.target.value == cityArr) {
                        setCityError('Города совпадают');
                    }
                    else {
                        setCity(e.target.value);
                        setCityError('');
                        setCityArrError('');
                        setEntry({ ...entry, departureCity: e.target.value });
                    }
                }
                else setCityError('Введите город');
                break;

            case 'cityArr':
                if (e.target.value.length > 0) {
                    if (e.target.value == city) {
                        setCityArrError('Города совпадают');
                    }
                    else {
                        setArrCity(e.target.value);
                        setCityArrError('');
                        setCityError('');
                        setEntry({ ...entry, arrivalCity: e.target.value })
                    }
                }
                else setCityArrError('Введите город');

                break;

            case 'timeArr':
                if (e.target.value.length > 0) {
                    setTimeArr(e.target.value);
                    setTimeArrError('');
                    setEntry({ ...entry, arrivalTime: e.target.value })
                }
                else setTimeArrError('Введите время');
                break;

            case 'timeDep':
                if (e.target.value.length > 0) {
                    if (e.target.value.split(':')[0] < timeArr.split(':')[0] || (e.target.value.split(':')[0] == timeArr.split(':')[0] && e.target.value.split(':')[1] < timeArr.split(':')[1])) {
                        setTimeDepError('Введите корректное время');
                    }
                    else {
                        setTimeDep(e.target.value);
                        setTimeDepError('');
                        setEntry({ ...entry, departureTime: e.target.value })
                    }
                }
                else setTimeDepError('Введите время');
                break;

            case 'numberOfTrain':
                if (e.target.value.length > 0) {
                    setNumberOfTrain(e.target.value);
                    setNumberOfTrainError('');
                    setEntry({ ...entry, trainName: e.target.value })
                }
                else setNumberOfTrainError('Введите время');
                break;

        }

    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'city':
                setCityDirty(true);
                break;
            case 'cityArr':
                setCityArrDirty(true);
                break;
            case 'timeArr':
                setTimeArrDirty(true);
                break;
            case 'timeDep':
                setTimeDepDirty(true);
                break;
            case 'numberOfTrain':
                setNumberOfTrainDirty(true);
                break;

        }
    }


    for (let i = 0; i < sity.length; i++) {
        sitys.push(<option key={i}>{sity[i].city}</option>)
    }

    let flag = true;

    function duplicate(){
        let i =0;
        while(i<schedule.length && flag)
        {
            if((entry.arrivalTime == schedule[i].arrivalTime && entry.plate == schedule[i].plate) || entry.trainName == schedule[i].trainName)
            {
                setEntryError("Запись с данными полями существует");
                flag=false;
            }
            i++;
        }
    }


    function Add(){

        setEntryError('');
        duplicate();

        if(flag)
        {
            addSchedule(entry);
            numberOfTrain.value = '';
        }
        else{

        }

    }
    // const [selectLine,setSelectLine]=useState(0);
    // useEffect(()=>{
    //     if(selectLine < entry.plate.lines.length){
    //         setEntry({...entry, plateLine: entry.plate.lines[selectLine]})}
    //     },[selectLine]);

    function setPlate(i) {
        setPlaneIndex(i);
        console.log(platforms, i)
        if (platforms[i].lines.length - 1 < lineIndex) {
            console.log("gfgsdg", platforms[i].lines.length - 1)
            setEntry({ ...entry, plate: platforms[i].number, plateLine: platforms[i].lines[0] })
            setLineIndex(0);
        } else {
            console.log("ccccc", platforms[i].lines.length)
            setEntry({ ...entry, plate: platforms[i].number, plateLine: platforms[i].lines[lineIndex] })
        }
    }

    return (


        <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
            <div className='popupBody' onClick={e => e.stopPropagation()}>
                <div className='popupContent'>
                    <div className='formsep'>
                        <fieldset>
                            <legend>Добавить запись</legend>
                            <label id="firstlab">Выберите платформу
                                <select className="addsep" onChange={(e) => setPlate(e.target.value)}>
                                    {platforms?.map((platform, index) => {
                                        return <option key={index} value={index}>Платформа №{platform.number}</option>
                                    })}
                                </select>
                            </label>
                            <br />
                            <label>Выберите путь
                                <select className="addsep" onChange={(e) => { setEntry({ ...entry, plateLine: platforms[planeIndex].lines[e.target.value] }); setLineIndex(e.target.value) }}>
                                    {platforms[planeIndex].lines.map((line, index) => {

                                        return <option key={index} value={index}>Путь №{line.number}</option>
                                    })}
                                </select>
                            </label>
                            <br />
                            <label>Введите номер поезда
                                {(numberOfTrainDirty && numberOfTrainError) && <div style={{ color: 'red', height: 5 }}>{numberOfTrainError}</div>}
                                <input onBlur={e => blurHandler(e)} name='numberOfTrain' className="addsep text-center" type="text" minLength="1" maxLength="6" onChange={(e) => changeHandler(e)} />
                            </label>
                            <br />
                            <label>Время прибытия
                                {(timeArrDirty && timeArrError) && <div style={{ color: 'red', height: 5 }}>{timeArrError}</div>}
                                <span id="tpr">
                                    <input onBlur={e => blurHandler(e)} name='timeArr' className="addtime" type="time" onChange={(e) => changeHandler(e)}></input>
                                </span>
                            </label> <br />
                            <label>Время отравления
                                {(timeDepDirty && timeDepError) && <div style={{ color: 'red', height: 5 }}>{timeDepError}</div>}
                                <span id='totpr'>
                                    <input onBlur={e => blurHandler(e)} name='timeDep' className="addtime" type="time" onChange={(e) => changeHandler(e)}></input>
                                </span>
                            </label>
                            <br />
                            <label>Город отправления
                                {(cityDirty && cityError) && <div style={{ color: 'red', height: 5 }}>{cityError}</div>}
                                <input onBlur={e => blurHandler(e)} name='city' className="addsep" placeholder='Введите город...' list='list' onChange={(e) => changeHandler(e)} />
                                <datalist id='list'>
                                    {sitys}
                                </datalist>
                            </label><br />
                            <label>Город прибытия{(cityArrDirty && cityArrError) && <div style={{ color: 'red', height: 5 }}>{cityArrError}</div>}
                                <input onBlur={e => blurHandler(e)} name='cityArr' className="addsep" placeholder='Введите город...' list='list' onChange={(e) => changeHandler(e)} />
                                <datalist id='list'>
                                    {sitys}
                                </datalist>
                            </label><br />
                            <label>In
                                <select className="addsep" onChange={(e) => setEntry({ ...entry, in: inOut[e.target.value] })}>
                                    {inOut?.map((io, index) => {
                                        return <option key={index} value={index}>x: {io.x} y: {io.y}</option>
                                    })}
                                </select>
                            </label><br />
                            <label>Out
                                <select className="addsep" onChange={(e) => setEntry({ ...entry, out: inOut[e.target.value] })}>
                                    {inOut?.map((io, index) => {
                                        return <option key={index} value={index}>x: {io.x} y: {io.y}</option>
                                    })}
                                </select>
                            </label>
                            <div className="eradd" style ={{color: 'red', height: 5}}>{entryError}</div>
                            <br/>
                            <button disabled={!formValid} id="bb" className='centr' onClick={() => Add()}>Добавить</button>
                        </fieldset>
                    </div>
                </div>
                <div className='popupClose' onClick={() => setActive(false)}>x</div>
            </div>

        </div>


    );
}


export default AddEntry;