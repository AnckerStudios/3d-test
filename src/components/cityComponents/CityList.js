import axios from "axios";
import { useEffect, useState } from "react";
import CityAddModal from "./CityAddModal";
import CityListItem from "./CityListItem";



function CityList() {
    const [citys,setCitys] = useState();
    const [loading, setLoading] = useState(true);
    const [addFlag, setAddFlag] = useState(false);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:8080/api/city/with')
        .then(function (response) {
            setCitys(response.data);
            setLoading(false);
            console.log(response);
        })
        .catch(function (error) {
            setCitys([{cityName:"testCity", countTopology: 2},{cityName:"testCity 2", countTopology: 5}]);
            setLoading(false);
            console.log(error);
        });

    },[])

    return (
        <>
        {loading ? <div>Loading...</div> :
        <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">
            

            {citys?.map((city,index) => {
                return <CityListItem key={index} city={city}/>
            })}
            <div className=" bg-slate-300 rounded-xl aspect-square w-3/12 flex justify-center font-bold items-center hover:bg-orange-300" onClick={()=>setAddFlag(true)}>+</div>
            {addFlag && <CityAddModal/>}
        </div>}
        </>
    );
}

export default CityList;

