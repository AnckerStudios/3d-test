import '../pagesStyle/ScheduleEditorPage.css';
import React, {useState} from "react";
import ModalWindow from './ModalWindow';


function ScheduleEditorPage() {

    const [modalActive, setModalActive] = useState(false);
    const data = [
        { nplat: "1", nputi: "2", npoezd: "D500A", timepr: "8:00", timeotp: "8:30", marshrut: "Санкт-Петербург-Екатеринбург", type: "п" },
        { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
        { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
        { nplat: "1", nputi: "2", npoezd: "333", timepr: "8:00", timeotp: "8:30", marshrut: "город-город2", type: "п" },
    ]
    
    const items = []
    for (let i = 0; i < data.length; i++) {
        items.push(<tr>
            <td>{data[i].nplat}</td>
            <td>{data[i].nputi}</td>
            <td>{data[i].npoezd}</td>
            <td>{data[i].timeotp}</td>
            <td>{data[i].timepr}</td>
            <td>{data[i].marshrut}</td>
            <td>{data[i].type}</td>
        </tr>)
    }


    return (
        <div className='divsep'>
            <div className='divwithtable'>
                <table className="table2">
                    <caption>Расписание</caption>
                    <thead>
                        <tr className='trtab'>
                            <th>№ платф.</th>
                            <th>№ пути</th>
                            <th>№ поезда</th>
                            <th>время<br />прибытия</th>
                            <th>время<br />отбытия</th>
                            <th>маршрут</th>
                            <th>тип поезда</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}{items}{items}
                    </tbody>
                </table>
                <button className='buttonModal' onClick={() => setModalActive(true)}>кнопка</button>

            </div>



            <a href='http://localhost:3000/admin-menu' className='ex'>x</a>
            <ModalWindow active={modalActive} setActive={setModalActive}/>
            
        </div>
    );
}
export default ScheduleEditorPage; 