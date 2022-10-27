import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


function TestMes() {
    const [fieldMtrx, setFieldMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
    function createMtrx(x, y){
        let arr = [];
        for(let i = 0; i < x; i++){
          arr.push([])
          for(let j = 0; j < y; j++){
            arr[i].push({id: y*i+j, x: i, y: j, state: {}})
          }
        }
        return arr
      }
    function sendMes(){
        axios.post('http://localhost:8080/api/topology', {
            title: "Hi",
            body: fieldMtrx
          })
        .then(response => {
            console.log("response", response.data);
          })
          .catch(error => {
            console.log("error", error);
          });
    }
    return (
        <div className="flex justify-center ">
            <button className="border rounded bg-yellow-300 px-5 py-2 text-lg font-bold m-5 hover:bg-orange-500" onClick={()=>sendMes()}>Общение</button>
            
        </div>
    );
}


export default TestMes;