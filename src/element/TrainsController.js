import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import Train from "./Train";

function TrainsController({mtrx=[], trains=[], timer=0}) {

  let arr = [];
  for(let i = 0; i < trains.length; i++){
    
  }
  const [pos, setPos] = useState([]);
  useEffect(()=>{
    for(let i = 0; i < ways.length; i++){
      for(let w = 0; w < ways[i].wagons; w++){
        
      }
    }
  },[timer])

  let trains = [];
  for(let i = 0; i < ways.length; i++){
    trains.push(<Train pos={[0,i,0]} way={ways[i]} timer={timer}/>)
  }

  return (
    {trains}
  );
}

useGLTF.preload("/train.glb");

export default TrainsController;