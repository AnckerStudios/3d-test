import axios from "axios";
import { useEffect, useState } from "react";
import CityAddModal from "./CityAddModal";
import CityListItem from "./CityListItem";
import CityT from "./CityT";



function CityListManagerT() {
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
                return <CityT key={index} city={city}/>
            })}
        </div>}
        </>
    );
}

export default CityListManagerT;

