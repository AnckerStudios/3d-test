import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, createTrain, createTrainWay, dirSwich } from "../logic/ModelingLogic";
import Wagon from "./Wagon";

function Train({train=[], timer=0}) {
  const speed = 25;
  const [step, setStep] = useState(0.1);
  const [curPart,setCurPart] = useState(0);
  //let arrDir = createTrainWay(train);
  //const [arrWagons, setArrWagons] = useState(createTrain(train.wagons));

  // let wagons = [];
  // for(let i = 0; i < train.wagons; i++){
  //   wagons.push(<Wagon step={arrWagons[i]}/>);
  // }
  const [pos, setPos] = useState({x:0,y:0});
  const [next, setNext] = useState(1);
  const [cur,setCur] = useState(0);
  useEffect(()=>{
    console.log(pos);
    if(timer >= train.time){
      let dist = distance(pos,train.way[next]);

      if(dist < step){
        setPos(newPoint(pos,train.way[next],dist));

        if(next < train.way.length){
          setNext((next)=>next+1);
        }
      }else{
        //console.log(newPoint(pos,train.way[next],dist));
        setPos(newPoint(pos,train.way[next],dist));
      }
      
    }
  },[timer])
  
  function distance(c,n){
    return Math.sqrt(Math.pow(c.x-n.x,2)+Math.pow(c.y-n.y,2))
  }
  function newPoint(c,n,dist){
    return {x: (Math.abs(c.x-n.x)*step)/dist, y: (Math.abs(c.y-n.y)*step)/dist}
  }
  return (
    <>
      <Wagon pos={pos}/>
    </>
  );
}

useGLTF.preload("/train.glb");

export default Train;