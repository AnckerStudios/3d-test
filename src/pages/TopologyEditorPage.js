import '../pagesStyle/HomePage.css';
import React, { useEffect, useState } from "react";
import TopologyEditor from '../element/TopologyEditor';
import TopologyModal from '../components/topologyComponents/TopologyModal';
import { useParams } from 'react-router-dom';
import { createMtrx } from '../logic/EditorLogic';
import { data } from 'autoprefixer';
import axios from 'axios';


function TopologyEditorPage() {
    const {id,name} = useParams();
    const [mtrx, setMtrx] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        setLoading(true);
          axios.get('http://localhost:8080/api/topology', {
              params: {
                idTopology: id
              }
              })
              .then(function (response) {
                  setMtrx(response.data.body);
                  console.log(response);
                  setLoading(false);
              })
              .catch(function (error) {
                  let arr = [[{"id":0,"x":0,"y":0,"type":"rail","state":{x: true}},{"id":1,"x":0,"y":1,"type":"rail","state":{y: true}},{"id":2,"x":0,"y":2,"type":"rail","state":{dx: true}},{"id":3,"x":0,"y":3,"type":"none","state":{dy: true}},{"id":4,"x":0,"y":4,"type":"rail","state":{rx_top: true}},{"id":5,"x":0,"y":5,"type":"rail","state":{rx_down: true}},{"id":6,"x":0,"y":6,"type":"rail","state":{rx_left: true}},{"id":7,"x":0,"y":7,"type":"rail","state":{rx_right: true}},{"id":8,"x":0,"y":8,"type":"rail","state":{ry_top: true}},{"id":9,"x":0,"y":9,"type":"rail","state":{ry_down: true}},{"id":10,"x":0,"y":10,"type":"rail","state":{ry_left: true}},{"id":11,"x":0,"y":11,"type":"rail","state":{ry_right: true}},{"id":12,"x":0,"y":12,"type":"none","state":{}},{"id":13,"x":0,"y":13,"type":"none","state":{}},{"id":14,"x":0,"y":14,"type":"none","state":{}},{"id":15,"x":0,"y":15,"type":"none","state":{}}],[{"id":16,"x":1,"y":0,"type":"rail","state":{}},{"id":17,"x":1,"y":1,"type":"none","state":{}},{"id":18,"x":1,"y":2,"type":"none","state":{}},{"id":19,"x":1,"y":3,"type":"none","state":{}},{"id":20,"x":1,"y":4,"type":"none","state":{}},{"id":21,"x":1,"y":5,"type":"none","state":{}},{"id":22,"x":1,"y":6,"type":"none","state":{}},{"id":23,"x":1,"y":7,"type":"none","state":{}},{"id":24,"x":1,"y":8,"type":"none","state":{}},{"id":25,"x":1,"y":9,"type":"none","state":{}},{"id":26,"x":1,"y":10,"type":"none","state":{}},{"id":27,"x":1,"y":11,"type":"none","state":{}},{"id":28,"x":1,"y":12,"type":"none","state":{}},{"id":29,"x":1,"y":13,"type":"none","state":{}},{"id":30,"x":1,"y":14,"type":"none","state":{}},{"id":31,"x":1,"y":15,"type":"none","state":{}}],[{"id":32,"x":2,"y":0,"type":"rail","state":{}},{"id":33,"x":2,"y":1,"type":"none","state":{}},{"id":34,"x":2,"y":2,"type":"none","state":{}},{"id":35,"x":2,"y":3,"type":"none","state":{}},{"id":36,"x":2,"y":4,"type":"none","state":{}},{"id":37,"x":2,"y":5,"type":"none","state":{}},{"id":38,"x":2,"y":6,"type":"none","state":{}},{"id":39,"x":2,"y":7,"type":"none","state":{}},{"id":40,"x":2,"y":8,"type":"none","state":{}},{"id":41,"x":2,"y":9,"type":"none","state":{}},{"id":42,"x":2,"y":10,"type":"none","state":{}},{"id":43,"x":2,"y":11,"type":"none","state":{}},{"id":44,"x":2,"y":12,"type":"none","state":{}},{"id":45,"x":2,"y":13,"type":"none","state":{}},{"id":46,"x":2,"y":14,"type":"none","state":{}},{"id":47,"x":2,"y":15,"type":"none","state":{}}],[{"id":48,"x":3,"y":0,"type":"rail","state":{}},{"id":49,"x":3,"y":1,"type":"none","state":{}},{"id":50,"x":3,"y":2,"type":"none","state":{}},{"id":51,"x":3,"y":3,"type":"none","state":{}},{"id":52,"x":3,"y":4,"type":"none","state":{}},{"id":53,"x":3,"y":5,"type":"none","state":{}},{"id":54,"x":3,"y":6,"type":"none","state":{}},{"id":55,"x":3,"y":7,"type":"none","state":{}},{"id":56,"x":3,"y":8,"type":"none","state":{}},{"id":57,"x":3,"y":9,"type":"none","state":{}},{"id":58,"x":3,"y":10,"type":"none","state":{}},{"id":59,"x":3,"y":11,"type":"none","state":{}},{"id":60,"x":3,"y":12,"type":"none","state":{}},{"id":61,"x":3,"y":13,"type":"none","state":{}},{"id":62,"x":3,"y":14,"type":"none","state":{}},{"id":63,"x":3,"y":15,"type":"none","state":{}}],[{"id":64,"x":4,"y":0,"type":"rail","state":{}},{"id":65,"x":4,"y":1,"type":"none","state":{}},{"id":66,"x":4,"y":2,"type":"none","state":{}},{"id":67,"x":4,"y":3,"type":"none","state":{}},{"id":68,"x":4,"y":4,"type":"none","state":{}},{"id":69,"x":4,"y":5,"type":"none","state":{}},{"id":70,"x":4,"y":6,"type":"none","state":{}},{"id":71,"x":4,"y":7,"type":"none","state":{}},{"id":72,"x":4,"y":8,"type":"none","state":{}},{"id":73,"x":4,"y":9,"type":"none","state":{}},{"id":74,"x":4,"y":10,"type":"none","state":{}},{"id":75,"x":4,"y":11,"type":"none","state":{}},{"id":76,"x":4,"y":12,"type":"none","state":{}},{"id":77,"x":4,"y":13,"type":"none","state":{}},{"id":78,"x":4,"y":14,"type":"none","state":{}},{"id":79,"x":4,"y":15,"type":"none","state":{}}],[{"id":80,"x":5,"y":0,"type":"rail","state":{}},{"id":81,"x":5,"y":1,"type":"none","state":{}},{"id":82,"x":5,"y":2,"type":"none","state":{}},{"id":83,"x":5,"y":3,"type":"none","state":{}},{"id":84,"x":5,"y":4,"type":"rail","state":{x: true,y: true, dx: true, dy: true, ry_left: true, ry_right: true, ry_up: true, ry_down: true, rx_left: true, rx_right: true, rx_up: true, rx_down: true}},{"id":85,"x":5,"y":5,"type":"none","state":{}},
                  {"id":86,"x":5,"y":6,"type":"none","state":{}},{"id":87,"x":5,"y":7,"type":"none","state":{}},{"id":88,"x":5,"y":8,"type":"none","state":{}},{"id":89,"x":5,"y":9,"type":"none","state":{}},{"id":90,"x":5,"y":10,"type":"none","state":{}},{"id":91,"x":5,"y":11,"type":"none","state":{}},{"id":92,"x":5,"y":12,"type":"none","state":{}},{"id":93,"x":5,"y":13,"type":"none","state":{}},{"id":94,"x":5,"y":14,"type":"none","state":{}},{"id":95,"x":5,"y":15,"type":"none","state":{}}],[{"id":96,"x":6,"y":0,"type":"rail","state":{}},{"id":97,"x":6,"y":1,"type":"none","state":{}},{"id":98,"x":6,"y":2,"type":"none","state":{}},{"id":99,"x":6,"y":3,"type":"none","state":{}},{"id":100,"x":6,"y":4,"type":"none","state":{}},{"id":101,"x":6,"y":5,"type":"none","state":{}},{"id":102,"x":6,"y":6,"type":"none","state":{}},{"id":103,"x":6,"y":7,"type":"none","state":{}},{"id":104,"x":6,"y":8,"type":"none","state":{}},{"id":105,"x":6,"y":9,"type":"none","state":{}},{"id":106,"x":6,"y":10,"type":"none","state":{}},{"id":107,"x":6,"y":11,"type":"none","state":{}},{"id":108,"x":6,"y":12,"type":"none","state":{}},{"id":109,"x":6,"y":13,"type":"none","state":{}},{"id":110,"x":6,"y":14,"type":"none","state":{}},{"id":111,"x":6,"y":15,"type":"none","state":{}}],[{"id":112,"x":7,"y":0,"type":"none","state":{}},{"id":113,"x":7,"y":1,"type":"none","state":{}},{"id":114,"x":7,"y":2,"type":"none","state":{}},{"id":115,"x":7,"y":3,"type":"none","state":{}},{"id":116,"x":7,"y":4,"type":"none","state":{}},{"id":117,"x":7,"y":5,"type":"none","state":{}},{"id":118,"x":7,"y":6,"type":"none","state":{}},{"id":119,"x":7,"y":7,"type":"none","state":{}},{"id":120,"x":7,"y":8,"type":"none","state":{}},{"id":121,"x":7,"y":9,"type":"none","state":{}},{"id":122,"x":7,"y":10,"type":"none","state":{}},{"id":123,"x":7,"y":11,"type":"none","state":{}},{"id":124,"x":7,"y":12,"type":"none","state":{}},{"id":125,"x":7,"y":13,"type":"none","state":{}},{"id":126,"x":7,"y":14,"type":"none","state":{}},{"id":127,"x":7,"y":15,"type":"none","state":{}}],[{"id":128,"x":8,"y":0,"type":"none","state":{}},{"id":129,"x":8,"y":1,"type":"none","state":{}},{"id":130,"x":8,"y":2,"type":"none","state":{}},{"id":131,"x":8,"y":3,"type":"none","state":{}},{"id":132,"x":8,"y":4,"type":"none","state":{}},{"id":133,"x":8,"y":5,"type":"none","state":{}},{"id":134,"x":8,"y":6,"type":"none","state":{}},{"id":135,"x":8,"y":7,"type":"none","state":{}},{"id":136,"x":8,"y":8,"type":"none","state":{}},{"id":137,"x":8,"y":9,"type":"none","state":{}},{"id":138,"x":8,"y":10,"type":"none","state":{}},{"id":139,"x":8,"y":11,"type":"none","state":{}},{"id":140,"x":8,"y":12,"type":"none","state":{}},{"id":141,"x":8,"y":13,"type":"none","state":{}},{"id":142,"x":8,"y":14,"type":"none","state":{}},{"id":143,"x":8,"y":15,"type":"none","state":{}}],[{"id":144,"x":9,"y":0,"type":"none","state":{}},{"id":145,"x":9,"y":1,"type":"none","state":{}},{"id":146,"x":9,"y":2,"type":"none","state":{}},{"id":147,"x":9,"y":3,"type":"none","state":{}},{"id":148,"x":9,"y":4,"type":"none","state":{}},{"id":149,"x":9,"y":5,"type":"none","state":{}},{"id":150,"x":9,"y":6,"type":"none","state":{}},{"id":151,"x":9,"y":7,"type":"none","state":{}},{"id":152,"x":9,"y":8,"type":"none","state":{}},{"id":153,"x":9,"y":9,"type":"none","state":{}},{"id":154,"x":9,"y":10,"type":"none","state":{}},{"id":155,"x":9,"y":11,"type":"none","state":{}},{"id":156,"x":9,"y":12,"type":"none","state":{}},{"id":157,"x":9,"y":13,"type":"none","state":{}},{"id":158,"x":9,"y":14,"type":"none","state":{}},{"id":159,"x":9,"y":15,"type":"none","state":{}}],[{"id":160,"x":10,"y":0,"type":"none","state":{}},{"id":161,"x":10,"y":1,"type":"none","state":{}},{"id":162,"x":10,"y":2,"type":"none","state":{}},{"id":163,"x":10,"y":3,"type":"none","state":{}},{"id":164,"x":10,"y":4,"type":"none","state":{}},{"id":165,"x":10,"y":5,"type":"none","state":{}},{"id":166,"x":10,"y":6,"type":"none","state":{}},{"id":167,"x":10,"y":7,"type":"none","state":{}},{"id":168,"x":10,"y":8,"type":"none","state":{}},{"id":169,"x":10,"y":9,"type":"none","state":{}},{"id":170,"x":10,"y":10,"type":"none","state":{}},{"id":171,"x":10,"y":11,"type":"none","state":{}},
                  {"id":172,"x":10,"y":12,"type":"none","state":{}},{"id":173,"x":10,"y":13,"type":"none","state":{}},{"id":174,"x":10,"y":14,"type":"none","state":{}},{"id":175,"x":10,"y":15,"type":"none","state":{}}],[{"id":176,"x":11,"y":0,"type":"none","state":{}},{"id":177,"x":11,"y":1,"type":"none","state":{}},{"id":178,"x":11,"y":2,"type":"none","state":{}},{"id":179,"x":11,"y":3,"type":"none","state":{}},{"id":180,"x":11,"y":4,"type":"none","state":{}},{"id":181,"x":11,"y":5,"type":"none","state":{}},{"id":182,"x":11,"y":6,"type":"none","state":{}},{"id":183,"x":11,"y":7,"type":"none","state":{}},{"id":184,"x":11,"y":8,"type":"none","state":{}},{"id":185,"x":11,"y":9,"type":"none","state":{}},{"id":186,"x":11,"y":10,"type":"none","state":{}},{"id":187,"x":11,"y":11,"type":"none","state":{}},{"id":188,"x":11,"y":12,"type":"none","state":{}},{"id":189,"x":11,"y":13,"type":"none","state":{}},{"id":190,"x":11,"y":14,"type":"none","state":{}},{"id":191,"x":11,"y":15,"type":"none","state":{}}],[{"id":192,"x":12,"y":0,"type":"none","state":{}},{"id":193,"x":12,"y":1,"type":"none","state":{}},{"id":194,"x":12,"y":2,"type":"none","state":{}},{"id":195,"x":12,"y":3,"type":"none","state":{}},{"id":196,"x":12,"y":4,"type":"none","state":{}},{"id":197,"x":12,"y":5,"type":"none","state":{}},{"id":198,"x":12,"y":6,"type":"none","state":{}},{"id":199,"x":12,"y":7,"type":"none","state":{}},{"id":200,"x":12,"y":8,"type":"none","state":{}},{"id":201,"x":12,"y":9,"type":"none","state":{}},{"id":202,"x":12,"y":10,"type":"none","state":{}},{"id":203,"x":12,"y":11,"type":"none","state":{}},{"id":204,"x":12,"y":12,"type":"none","state":{}},{"id":205,"x":12,"y":13,"type":"none","state":{}},{"id":206,"x":12,"y":14,"type":"none","state":{}},{"id":207,"x":12,"y":15,"type":"none","state":{}}],[{"id":208,"x":13,"y":0,"type":"none","state":{}},{"id":209,"x":13,"y":1,"type":"none","state":{}},{"id":210,"x":13,"y":2,"type":"none","state":{}},{"id":211,"x":13,"y":3,"type":"none","state":{}},{"id":212,"x":13,"y":4,"type":"none","state":{}},{"id":213,"x":13,"y":5,"type":"none","state":{}},{"id":214,"x":13,"y":6,"type":"none","state":{}},{"id":215,"x":13,"y":7,"type":"none","state":{}},{"id":216,"x":13,"y":8,"type":"none","state":{}},{"id":217,"x":13,"y":9,"type":"none","state":{}},{"id":218,"x":13,"y":10,"type":"none","state":{}},{"id":219,"x":13,"y":11,"type":"none","state":{}},{"id":220,"x":13,"y":12,"type":"none","state":{}},{"id":221,"x":13,"y":13,"type":"none","state":{}},{"id":222,"x":13,"y":14,"type":"none","state":{}},{"id":223,"x":13,"y":15,"type":"none","state":{}}],[{"id":224,"x":14,"y":0,"type":"none","state":{}},{"id":225,"x":14,"y":1,"type":"none","state":{}},{"id":226,"x":14,"y":2,"type":"none","state":{}},{"id":227,"x":14,"y":3,"type":"none","state":{}},{"id":228,"x":14,"y":4,"type":"none","state":{}},{"id":229,"x":14,"y":5,"type":"none","state":{}},{"id":230,"x":14,"y":6,"type":"none","state":{}},{"id":231,"x":14,"y":7,"type":"none","state":{}},{"id":232,"x":14,"y":8,"type":"none","state":{}},{"id":233,"x":14,"y":9,"type":"none","state":{}},{"id":234,"x":14,"y":10,"type":"none","state":{}},{"id":235,"x":14,"y":11,"type":"none","state":{}},{"id":236,"x":14,"y":12,"type":"none","state":{}},{"id":237,"x":14,"y":13,"type":"none","state":{}},{"id":238,"x":14,"y":14,"type":"none","state":{}},{"id":239,"x":14,"y":15,"type":"none","state":{}}],[{"id":240,"x":15,"y":0,"type":"none","state":{}},{"id":241,"x":15,"y":1,"type":"none","state":{}},{"id":242,"x":15,"y":2,"type":"none","state":{}},{"id":243,"x":15,"y":3,"type":"none","state":{}},{"id":244,"x":15,"y":4,"type":"none","state":{}},{"id":245,"x":15,"y":5,"type":"none","state":{}},{"id":246,"x":15,"y":6,"type":"none","state":{}},{"id":247,"x":15,"y":7,"type":"none","state":{}},{"id":248,"x":15,"y":8,"type":"none","state":{}},{"id":249,"x":15,"y":9,"type":"none","state":{}},{"id":250,"x":15,"y":10,"type":"none","state":{}},{"id":251,"x":15,"y":11,"type":"none","state":{}},{"id":252,"x":15,"y":12,"type":"none","state":{}},{"id":253,"x":15,"y":13,"type":"none","state":{}},{"id":254,"x":15,"y":14,"type":"none","state":{}},{"id":255,"x":15,"y":15,"type":"none","state":{}}]]
                  setMtrx(arr);
                  console.log(error);
                  setLoading(false);
              });
        },[])
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
      console.log("copy", mtrx)
      console.log("copy", copy)
            axios.post('http://localhost:8080/api/topology', {
                title: name,
                body: copy
              },{params:{
                idTopology: id
              }})
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(mtrx[0][0])
                console.log(mtrx[1][0])
                console.log(error);
        });
    }
    return (
        <>
        {loading ? <div>Loading...</div>: <TopologyEditor id={id} mtrx={mtrx} setMtrx={setMtrx} saveFunk={save}/> }
        </>
    );
}


export default TopologyEditorPage; 