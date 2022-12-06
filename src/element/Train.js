import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, createTrain, dirSwich } from "../logic/ModelingLogic";
import Wagon from "./Wagon";

function Train({way=[], timer=0}) {
  const speed = 25;
  const [curPart,setCurPart] = useState(0);
  let arrDir = [];
  for(let i = 0; i < way.way.length; i++){
    if(i !== 0){
      let coord = centerCell(way.way[i-1],way.way[i]);
      let dir = centerDir(way.way[i-1].dir,way.way[i].dir);
      arrDir.push({x: coord.x, y: coord.y, dir: dir});
    }else{
      arrDir.push({x: way.way[i].x, y: way.way[i].y, dir: dirSwich(way.way[i].dir )});
    }
  }
  const [arrWagons, setArrWagons] = useState(createTrain(way.wagons));

  let wagons = [];
  for(let i = 0; i < way.wagons; i++){
    wagons.push(<Wagon step={arrWagons[i]}/>);
  }

  const [opacity, setOpacity] = useState(0);
  const [cur,setCur] = useState(0);
  useEffect(()=>{
    if(timer >= way.time){
      if(cur+1 < way.way.length){
        if(opacity < 1 && cur === 0){
          setOpacity((opacity) => opacity+0.05)
        }
        let arrW = [];
        for(let i = 0; i < way.wagons; i++){
          let curW;
          if(cur-3*i < 0){
            curW = 0;
          }else{
            curW = cur-3*i
          }
          let pos = {x:arrDir[curW].x, y:arrDir[curW].y};
          let dPos = {x: (arrDir[curW+1].x - pos.x)/speed, y: (arrDir[curW+1].y - pos.y)/speed};

          let r1 = arrDir[curW].dir;
          let dr = (arrDir[curW+1].dir - r1)/speed;
          if(cur-3*i < 0){
            arrW.push({pos:{x: pos.x,y: pos.y}, rot: r1});
          }else{
            arrW.push({pos:{x: pos.x+(dPos.x*curPart),y: pos.y+(dPos.y*curPart)}, rot: r1+(dr*curPart)});
          }
          
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