import { useEffect, useState } from "react";
import Cell from "./Cell";
import Eraser from "./RailsTypes/Eraser";
import Light from "./RailsTypes/Light";
import Plate from "./RailsTypes/Plate";

import RailD from "./RailsTypes/RailD";
import RailL from "./RailsTypes/RailL";
import RailR from "./RailsTypes/RailR";
import RailType from "./RailsTypes/RailType";

function Preview({ mtrx = [], objSet = { x: 16, y: 16 }, prev = true, err = false }) {
    //console.log('dd')


    const [changesTypeL, setChangesTypeL] = useState([]);
    const [changesTypeD, setChangesTypeD] = useState([]);
    const [changesTypeR, setChangesTypeR] = useState([]);
    const [changesPlate, setChangesPlate] = useState([]);
    const [changesLight, setChangesLight] = useState([]);
    const [changesEraser, setChangesEraser] = useState([]);


    useEffect(() => {
        let changesL = [];
        let changesD = [];
        let changesR = [];
        let changesP = [];
        let chanLight = [];
        let chanEr = [];
        for (let row of mtrx) {
            for (let item of row) {
                if (item.type === 'plate') {
                    console.log("WWOOORRKK", item)
                    if (item?.state?.dir) {
                        changesP.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 }, state: item.state.plate, number: item.state.number });
                    } else if (!item?.state?.dir) {
                        changesP.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI / 2 }, state: item.state.plate, number: item.state.number });
                    }
                } else if (item.type === 'neplater') {
                    changesP.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI / 2 }});
                }else if(item.type === 'neplatel'){
                    changesP.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 }});
                } else if(item.type === 'eraser'){
                    chanEr.push({ x: item.x, y: item.y});
                }else{
                    for (let state in item.state) {

                        switch (state) {
                            case 'x':
                                if (item.state.x === true)
                                    changesL.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 2)) });
                                break;
                            case 'y':
                                if (item.state.y === true)
                                    changesL.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 2) + (prev ? 0 : 1)) });
                                break;
                            case 'dx':
                                if (item.state.dx === true)
                                    changesD.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 2)) });
                                break;
                            case 'dy':
                                if (item.state.dy === true)
                                    changesD.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 2) + (prev ? 0 : 1)) });
                                break;
                            case 'rx_top':
                                if (item.state.rx_top === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8)) });
                                break;
                            case 'rx_down':
                                if (item.state.rx_down === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 1)) });
                                break;
                            case 'rx_left':
                                if (item.state.rx_left === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: Math.PI, y: 0, z: Math.PI }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 2)) });
                                break;
                            case 'rx_right':
                                if (item.state.rx_right === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: Math.PI, y: 0, z: 0 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 3)) });
                                break;
                            case 'ry_top':
                                if (item.state.ry_top === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: Math.PI, z: -Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 4)) });
                                break;
                            case 'ry_down':
                                if (item.state.ry_down === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: Math.PI, z: Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 5)) });
                                break;
                            case 'ry_left':
                                if (item.state.ry_left === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: -Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 6)) });
                                break;
                            case 'ry_right':
                                if (item.state.ry_right === true)
                                    changesR.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: Math.PI / 2 }, index: ((item.x * row.length + item.y) * (prev ? 1 : 8) + (prev ? 0 : 7)) });
                                break;
                            case 'light':
                                if (item.state.light === true)
                                    chanLight.push({ x: item.x, y: item.y, rot: { x: 0, y: 0, z: 0 } });
                                break;
                        }
                    }
                }
            }
        }
        setChangesTypeL(changesL);
        setChangesTypeD(changesD);
        setChangesTypeR(changesR);
        setChangesPlate(changesP);
        setChangesLight(chanLight);
        setChangesEraser(chanEr);
    }, [mtrx])

    return (
        <>
            <RailL arr={changesTypeL} count={objSet.x * objSet.y * (prev ? 1 : 2)} color={prev ? (err ? 'red' : 'lime') : 'white'} prev={prev} />
            <RailR arr={changesTypeR} count={objSet.x * objSet.y * (prev ? 1 : 8)} color={prev ? (err ? 'red' : 'lime') : 'white'} prev={prev} />
            <Plate arr={changesPlate} color={prev ? (err ? 'red' : 'lime') : 'white'} prev={prev} />
            <Light arr={changesLight} color={prev ? (err ? 'red' : 'lime') : 'white'} prev={prev} />
            <Eraser arr={changesEraser} prev={true} />
            <RailD arr={changesTypeD} count={objSet.x * objSet.y * (prev ? 1 : 2)} color={prev ? (err ? 'red' : 'lime') : 'white'} prev={prev} />
        </>
    );
}

export default Preview;