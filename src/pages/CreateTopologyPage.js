import '../pagesStyle/HomePage.css';
import React, { useState } from "react";
import TopologyEditor from '../element/TopologyEditor';
import TopologyModal from '../components/topologyComponents/TopologyModal';
import { useParams } from 'react-router-dom';
import { createMtrx } from '../logic/EditorLogic';
import { data } from 'autoprefixer';


function CreateTopologyPage() {
    const {id} = useParams();
    const [mtrx, setMtrx] = useState();
    const [flag, setFlag] = useState(false);

    
    function submin(data){
        setMtrx(createMtrx(data.x,data.y));
        setFlag(true);
    }
    return (
        <>
        {!flag && <TopologyModal submin={submin}/>}
        {flag && <TopologyEditor id={id} mtrx={mtrx} setMtrx={setMtrx} name={data.name}/> }
        </>
    );
}


export default CreateTopologyPage; 