import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, createNextArr, createTrain, createTrainWay, createWagonInfo, dirSwich } from "../logic/ModelingLogic";
import Wagon from "./Wagon";

function Train({train=[]}) {
  // const speed = 25;
  // const [step, setStep] = useState(0.1);
  // const [curPart,setCurPart] = useState(0);
  // let arrDir = createTrainWay(train);
  // console.log("arrdir",arrDir);
  // //const [arrWagons, setArrWagons] = useState(createTrain(train.wagons));
  
  
  // const [rot, setRot] = useState(dirSwich(train.way[0].dir));
  // const [pos, setPos] = useState(train.way[0]);
  // const [next, setNext] = useState(createNextArr(train.wagons));
  // const [wagInfo, setWagInfo] = useState(createWagonInfo(train.wagons, arrDir));
  // const [cur,setCur] = useState(0);
  let wagons = [];
  for(let i = 0; i < train.wagons.length; i++){
    wagons.push(<Wagon key={i} wagInfo={train.wagons[i]}/>);
  }
  // useEffect(()=>{
    
  //     let move = Move();
  //     setWagInfo(move.pos);
  //     setNext(move.next);
    
  // },[timer])
  
  // function distance(c,n){
  //   return Math.sqrt(Math.pow(c.x-n.x,2)+Math.pow(c.y-n.y,2));
  // }
  
  // function Move(){
  //   let dTime = timer-train.time;
  //   let intPos = createWagonInfo(train.wagons, arrDir);//Object.assign([],wagInfo);
  //   let intNext = createNextArr(train.wagons);
  //   let intStep = step;
  //   for(let t=0; t<dTime; t++){
  //     for(let i = 0; i < train.wagons; i++){
  //       let n = intNext[i];
  //       let dist = distance(intPos[i],arrDir[n]);
  //       if(dist > step){
  //         intPos[i] = newPoint(intPos[i],arrDir[n],dist);
  //       }else{
  //         intPos[i] = arrDir[n];
  //         if(intNext[i]<arrDir.length-1)
  //         intNext[i]++;
  //       }
  //     }
  //   }
  //   return {pos: intPos, next: intNext};
  // }
  // function newPoint(c,n,dist,st){
  //   return {x: c.x+(((n.x-c.x)*st)/dist), y: c.y+(((n.y-c.y)*st)/dist), dir: c.dir+((n.dir-c.dir)*st)};
  // }
  return (
    <>
      {wagons}
    </>
  );
}

useGLTF.preload("/train.glb");

export default Train;