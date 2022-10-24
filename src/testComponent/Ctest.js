import React, { useEffect, useRef, useState } from "react";
import RailTypeL_old from "../element/RailsTypes/RailTypeL_old";
import RailTypeR_old from "../element/RailsTypes/RailTypeR_old";
import RailTypeD_old from "../element/RailsTypes/RailTypeD_old";

function Ctest({ mtrx = [], objSettings = {x: 16, y:16}, prevMtrx = []}) {
    const [changesTypeL, setChangesTypeL] = useState([]);
    const [changesTypeD, setChangesTypeD] = useState([]);
    const [changesTypeR, setChangesTypeR] = useState([]);
    const [prevTypeL, setPrevTypeL] = useState([]);
    const [prevTypeD, setPrevTypeD] = useState([]);
    const [prevTypeR, setPrevTypeR] = useState([]);

    useEffect(()=>{
      console.log("start");
      let changesL = [];
      let changesD = [];
      let changesR = [];
      for(let item of mtrx){
        switch(item.state){
          case 'x':
          case 'y':
            changesL.push(item);
            break;
          case 'dx':
          case 'dy':
            changesD.push(item);
            break;
          case 'rx_top':
          case 'rx_down':
          case 'rx_left':
          case 'rx_right':
          case 'ry_top':
          case 'ry_down':
          case 'ry_left':
          case 'ry_right':
            changesR.push(item);
            break;
        }
      }
      setChangesTypeL(changesL);
      setChangesTypeD(changesD);
      setChangesTypeR(changesR);
    },[mtrx])

    useEffect(() => {
      console.log('ssssssssss')
      let changesL = [];
      let changesD = [];
      let changesR = [];
      for(let row of prevMtrx){
        for(let item of row){
        console.log(item)
        for(let key in item.state){
          console.log('key - '+key)
          switch(key){
            case 'x':
            case 'y':
              changesL.push(item);
              break;
            case 'dx':
            case 'dy':
              changesD.push(item);
              break;
            case 'rx_top':
            case 'rx_down':
            case 'rx_left':
            case 'rx_right':
            case 'ry_top':
            case 'ry_down':
            case 'ry_left':
            case 'ry_right':
              changesR.push(item);
              break;
          }
        }
        }
        
      }
      setPrevTypeL(changesL);
      setPrevTypeD(changesD);
      setPrevTypeR(changesR);
    }, [prevMtrx])

    return (
      <>
        <RailTypeL_old arrChanges={changesTypeL} objSettings={objSettings} arrPrew={prevTypeL}/>
        <RailTypeD_old arrChanges={changesTypeD} objSettings={objSettings} arrPrew={prevTypeD}/>
        <RailTypeR_old arrChanges={changesTypeR} objSettings={objSettings} arrPrew={prevTypeR}/>
      </>
    )
  }

export default Ctest;