import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import close from "../../images/closeGray.png"


function CityAddModal({submin, exit}) {
    const [citys, setCitys] = useState({cityName:undefined});
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState({status:false, title:""});
    const type = [1,2,3];
    function getType(type){
        switch(type){
            case 1: return "Пасажирский";
            case 2: return "Грузовой";
            case 3: return "Скоростной";
        }
    }
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/city/without')
        .then(function (response) {
            setCitys(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setCitys([{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"}]);
            setLoading(false);
            console.log(error);
        });

    },[])

    return (
        <>
        <div className=" fixed bg-black/50 top-0 right-0 left-0 bottom-0 z-20">
            <div className="w-[500px] p-5 rounded-xl bg-blue-200 absolute top-10 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center">
                <div className="flex flex-col gap-2 w-full items-center">
                    <div>Выберите город</div>
                    <div className="bg-orange-300 rounded-xl max-h-[500px] w-2/3 relative overflow-auto">
                        <div className=" h-full">
                        {loading ? <div>Loading</div> : citys?.map((city,index)=>{
                            return <Link key={index} className=" flex w-full p-2 relative hover:bg-slate-50 justify-center snap-start " to={`/city/${city?.cityName}`}>
                                {city?.cityName}
                            </Link>
                        })}
                        </div>
                    </div>
                </div>
                <div className=" absolute top-2 right-2 z-30" onClick={()=>exit(false)}>
                <img src={close} className=" w-7 h-7"></img>
                </div>
            </div>
           
            
        </div>
        </>
    );
}

export default CityAddModal;

