import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, createTrain, createTrainWay, dirSwich } from "../logic/ModelingLogic";
import Wagon from "./Wagon";

function Train({way=[], timer=0}) {
  const speed = 25;
  const [curPart,setCurPart] = useState(0);
  let arrDir = createTrainWay(way);
  const [arrWagons, setArrWagons] = useState(createTrain(way.wagons));

  let wagons = [];
  for(let i = 0; i < way.wagons; i++){
    wagons.push(<Wagon step={arrWagons[i]}/>);
  }

  const [cur,setCur] = useState(0);
  useEffect(()=>{
    if(timer >= way.time){
      
      if(cur-way.wagons*3 < arrDir.length){
        let arrW = [];
        for(let i = 0; i < way.wagons; i++){
          let curW, nextW;
          let dOpacity = 1/speed;
          let opacity;
          if(cur-3*i < 0){ //вынести
            curW = 0;
            nextW = 0;
          }else if(cur-3*i >= arrDir.length-1){
            curW = arrDir.length-1;
            nextW = arrDir.length-1;
            opacity = cur-3*i === arrDir.length-1 ? 1 - (dOpacity*curPart) : 0;
          }else{
            curW = cur-3*i;
            nextW = curW+1;
            opacity = curW === 0 ? 0 + (dOpacity*curPart) : 1;
          }

          let pos = {x:arrDir[curW].x, y:arrDir[curW].y};
          let dPos = {x:(arrDir[nextW].x - pos.x)/speed, y:(arrDir[nextW].y - pos.y)/speed};

          let rot = arrDir[curW].dir;
          let dRot = (arrDir[nextW].dir - rot)/speed;

          arrW.push({pos:{x: pos.x+(dPos.x*curPart),y: pos.y+(dPos.y*curPart)}, rot: rot+(dRot*curPart), opacity: opacity });

          
        }
        setArrWagons(()=>arrW);

        if(curPart < speed-1){
          setCurPart((curPart) => curPart+1);
        }else{
          setCur((cur) => cur+1);
          setCurPart(0);
        }
      }
    }
  },[timer])
  
  return (
    <>
      {wagons}
    </>
  );
}

useGLTF.preload("/train.glb");

export default Train;