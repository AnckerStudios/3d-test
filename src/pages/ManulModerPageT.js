import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopologyList from "../components/topologyComponents/TopologyList";


function ManulModerPageT() {
    const { name } = useParams();

    const [topologys, setTopologys] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/api/topology/bycity', {
            params: {
                cityName: name
            }
        })
            .then(function (response) {
                setTopologys(response.data);
                setLoading(false);
                console.log(response);
            })
            .catch(function (error) {
                setTopologys([{ topologyName: "name", idTopology: 1, accountName: "avtor" }]);
                setLoading(false);
                console.log(error);
            });

    }, [])
    return (
        <div className="mx-auto w-full max-w-5xl ">
            <div className="w-full bg-slate-0 flex-col">
                <div className="w-full flex py-10 px-2">
                    <h4 className="font-bold text-4xl text-slate-900">
                        {name}
                    </h4>
                </div>


            </div>
            {loading ? <div>Loading...</div> :
                <div className=" w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 p-2">


                    {topologys?.map((topol, index) => {
                        return <div className=" h-64 w-64 flex relative ">
                            <Link className=" bg-slate-300 rounded-xl flex justify-center font-bold items-center hover:bg-orange-300 w-full h-full shadow-lg text-center relative snap-start " to={`/model/${topol?.idTopology}/${topol?.topologyName}`}>
                                {topol?.topologyName}
                            </Link>
                            <div className=" absolute bottom-1 right-3 flex items-center gap-3 ">
                                <div>{topol?.accountName}</div>
                            </div>

                        </div>
                    })}
                </div>}
        </div>

    );
}


export default ManulModerPageT;