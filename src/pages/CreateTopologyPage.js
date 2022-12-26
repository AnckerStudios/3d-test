import '../pagesStyle/HomePage.css';
import React, { useState } from "react";
import TopologyEditor from '../element/TopologyEditor';
import TopologyModal from '../components/topologyComponents/TopologyModal';
import { useParams } from 'react-router-dom';
import { createMtrx } from '../logic/EditorLogic';
import { data } from 'autoprefixer';
import axios from 'axios';


function CreateTopologyPage() {
    const {cityname} = useParams();
    const [mtrx, setMtrx] = useState();
    const [flag, setFlag] = useState(false);
    const [name, setName] = useState()
    function save(){
        axios.post('http://localhost:8080/api/topology/create', {
            title: name,
            body: mtrx
          },{
            params: {
                topologyName: name,
                accountName: "ilya",
                city: cityname
            }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(mtrx[0][0])
            console.log(mtrx[1][0])
            console.log(error);
          });
      }
    function submin(data){
        setMtrx(createMtrx(data.x,data.y));
        setName(data.name)
        setFlag(true);
    }
    return (
        <>
        {!flag && <TopologyModal submin={submin}/>}
        {flag && <TopologyEditor mtrx={mtrx} setMtrx={setMtrx} saveFunk={save}/> }
        </>
    );
}


export default CreateTopologyPage; 