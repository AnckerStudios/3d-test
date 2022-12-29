import '../pagesStyle/HomePage.css';
import React, { useState } from "react";
import TopologyEditor from '../element/TopologyEditor';
import TopologyModal from '../components/topologyComponents/TopologyModal';
import { useNavigate, useParams } from 'react-router-dom';
import { createMtrx } from '../logic/EditorLogic';
import { data } from 'autoprefixer';
import axios from 'axios';
import authService from '../services/auth.service';


function CreateTopologyPage() {
    const {cityname} = useParams();
    const [mtrx, setMtrx] = useState();
    const [flag, setFlag] = useState(false);
    const [name, setName] = useState()
    function save(){
      let copy = Object.assign([],mtrx);
      for(let i = 0; i < copy.length; i++){
        for(let j = 0; j < copy[0].length; j++){
          if(copy[i][j]?.type === 'plate'){
            let dir = copy[i][j].state.dir;
            let dx = dir ? 0 : 1;
            let dy = dir ? 1 : 0;
            let arr = []; 
            if(i-dx > 0 && j-dy > 0){
              if(copy[i-dx][j-dy].type === "rail" && copy[i-dx][j-dy].state[dir ? "x" : "y"] === true){
                arr.push({x: i-dx, y: j-dy, number: copy[i][j].state?.number*2});
              }
            }
            if(i+dx < copy.length && j+dy < copy[i].length){
              if(copy[i+dx][j+dy].type === "rail" && copy[i+dx][j+dy].state[dir ? "x" : "y"] === true){
                arr.push({x: i+dx, y: j+dy, number: copy[i][j].state?.number*2+1});
              }
            }
            copy[i][j].state={...copy[i][j].state , lines: arr};
          }
        }
      }
        axios.post('http://localhost:8080/api/topology/create', {
            title: name,
            body: copy
          },{
            params: {
                topologyName: name,
                accountName: authService.getCurrentUser().user,
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