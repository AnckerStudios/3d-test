import { useEffect, useState } from "react";
import Cell from "./Cell";
import RailD from "./RailsTypes/RailD";
import RailL from "./RailsTypes/RailL";
import RailR from "./RailsTypes/RailR";
import RailType from "./RailsTypes/RailType";

function Preview({mtrx = [], objSet = {x: 16, y:16}, prev = true}) {
    const [changesTypeL, setChangesTypeL] = useState([]);
    const [changesTypeD, setChangesTypeD] = useState([]);
    const [changesTypeR, setChangesTypeR] = useState([]);
    useEffect(()=>{
        let changesL = [];
        let changesD = [];
        let changesR = [];
        for(let row of mtrx){
            for(let item of row){
                for(let state in item.state){
                    switch(state){
                        case 'x':
                            changesL.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: 0}, index: ((item.x * row.length + item.y) * (prev ? 1 : 2))});
                            break;
                        case 'y':
                            changesL.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 2) + (prev ? 0 : 1))});
                            break;
                        case 'dx':
                            changesD.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: 0}, index: ((item.x * row.length + item.y) * (prev ? 1 : 2))});
                            break;
                        case 'dy':
                            changesD.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 2) + (prev ? 0 : 1))});
                            break;
                        case 'rx_top':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: Math.PI}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8))});
                            break;
                        case 'rx_down':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: 0}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 1))});
                            break;
                        case 'rx_left':
                            changesR.push({x:item.x, y:item.y, rot: {x: Math.PI, y: 0, z: Math.PI}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 2))});
                            break;
                        case 'rx_right':
                            changesR.push({x:item.x, y:item.y, rot: {x: Math.PI, y: 0, z: 0}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 3))});
                            break;
                        case 'ry_top':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: Math.PI, z: -Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 4))});
                            break;
                        case 'ry_down':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: Math.PI, z: Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 5))});
                            break;
                        case 'ry_left':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: -Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 6))});
                            break;
                        case 'ry_right':
                            changesR.push({x:item.x, y:item.y, rot: {x: 0, y: 0, z: Math.PI/2}, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 7))});
                            break;
                      }
                }
            }
        }
        setChangesTypeL(changesL);
        setChangesTypeD(changesD);
        setChangesTypeR(changesR);
    },[mtrx])

    return (
        <>
            
            <RailL arr={changesTypeL} count={objSet.x * objSet.y * (prev ? 1 : 2)} color={prev ? 'lime' : 'white'}/>
            <RailR arr={changesTypeR} count={objSet.x * objSet.y * (prev ? 1 : 8)} color={prev ? 'lime' : 'white'}/>
            <RailD arr={changesTypeD} count={objSet.x * objSet.y * (prev ? 1 : 2)} color={prev ? 'lime' : 'white'}/>
        </>
    );
}
  
export default Preview;