import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

import { createPaths, dirSwich } from "../logic/ModelingLogic";
import Train from "./Train";

function TrainsController({trains=[], timer=0, mtrx=[]}) {

  
  
  const paths = createPaths(trains);
  const [err,setErr] = useState(false);
  const [trainInfo, setTrainInfo] = useState(createTrains(trains));
  const [trainLight, setTrainLight] = useState(createLights(mtrx));

  function createTrains(trains){
    let arr = [];
    for(let i = 0; i < trains.length; i++){
      arr.push({wagons:creareWagons(trains[i],paths[i]), step:0.1, isMoving:true, isStop:false});
    }
    return arr;
  }
  function createLights(mtrx){
    let lights = {};
    for(let i = 0; i < mtrx.length; i++){
      for(let j = 0; j < mtrx[i].length; j++){
        if(mtrx[i][j]?.state?.light === true){
          lights[i+j*mtrx.length] = {busy: false, owner: false};
        }
      }
    }
    return lights;
  }
  function creareWagons(trains,paths){
    let arrWagons = [];
    for(let w = 0; w < 3; w++){ //wagons
      arrWagons.push({next:1,pos:{x: paths[0].x-(3*w*1), y: paths[0].y-(3*w*0), dir: dirSwich(trains.way[0].dir)}})
    }
    return arrWagons;
  }
  let arrTrains = [];
  for(let i = 0; i < trainInfo.length; i++){
    arrTrains.push(<Train key={i} train={trainInfo[i]}/>);
  }
  useEffect(()=>{
    MoveTrains();
    setCurTimer(timer);
  },[timer])

  
  const [curTimer, setCurTimer] = useState(0);
  function MoveTrains(){
    
    let arr;
    let lights;
    let timeCount;
    if(timer >= curTimer){
      arr = Object.assign([],trainInfo);
      lights = Object.assign([],trainLight);
      timeCount = curTimer;
    }else{
      arr = createTrains(trains);
      lights = createLights(mtrx);
      timeCount = 0;
    }
    
    for(let t=timeCount; t<timer; t++){
      for(let tr=0; tr<trainInfo.length; tr++){
        let tarr =  trains[tr].record.arrivalTime;
        tarr = tarr.split(':');
        let h = tarr[0];
        let m = tarr[1];
    
        let trainTime = ((h*60+(+m))*100);
        if(t >= trainTime ){
            if(test2(arr, tr, lights)){
            
              arr[tr].step = 0;
              
            }else{
                arr[tr].step = 0.1;
            }
            
            // if(arr[tr].isStop && t >= trains[tr].timeOtb){
            //   arr[tr].step = 0.1;
            //   arr[tr].isStop = false;
            // }
            for(let w = 0; w < trainInfo[tr].wagons.length; w++){
              let n = arr[tr].wagons[w].next;
              let pos = arr[tr].wagons[w].pos;
              let dist = distance(pos,paths[tr][n]);
              let step = arr[tr].step;
              if(dist > step){
                arr[tr].wagons[w].pos = newPoint(pos,paths[tr][n],dist,step);
              }else{
                arr[tr].wagons[w].pos = paths[tr][n];
                if(n<paths[tr].length-1)
                arr[tr].wagons[w].next++;
              }
            }
          
        }
      }
    }
    
    setTrainInfo(arr);
    setTrainLight(lights);

    //return arr;
  }
  function test(arr, tr){
    let stopWay = arr[tr].wagons[0].next-1
    if(stopWay < paths[tr].length){
      if(paths[tr][stopWay].x === trains[tr].stop.x && paths[tr][stopWay].y === trains[tr].stop.y){
        return true;
      }
    }
    return false;
  }
  function test2(arr, tr, lights){
    let stopWay = arr[tr].wagons[0].next+1
    let lastWag = arr[tr].wagons[arr[tr].wagons.length-1].next-3;
    if(lastWag > 0){
      let index = paths[tr][lastWag].x + paths[tr][lastWag].y * mtrx.length;
      if(lights[index]?.owner === tr){
       
        lights[index].owner = false;
        lights[index].busy = false;
        
      }
    }
    if(stopWay < paths[tr].length){
      let index = paths[tr][stopWay].x + paths[tr][stopWay].y * mtrx.length;
      if(lights[index] !== undefined){
        
        if(lights[index]?.busy === false || lights[index]?.owner === tr){
          lights[index].owner = tr;
          lights[index].busy = true;
          return false;
        }else{
          return true;
        }
      }
    }
    
    return false;
  }
  function collisionDetect(arr,index){
    let collision = false;
    for(let i = 0; i< arr.length; i++){
      if(i != index){
        let wag = arr[index].wagons[0];
        for(let w = 0; w < arr[i].wagons.length; w++){
          if(arr[i].wagons[w].pos.x-0.4 < wag.pos.x+dirSwich(wag.pos.dir).x && arr[i].wagons[w].pos.x+0.4 > wag.pos.x+dirSwich(wag.pos.dir).x){
            if(arr[i].wagons[w].pos.y-0.4 < wag.pos.y+dirSwich(wag.pos.dir).y && arr[i].wagons[w].pos.y+0.4 > wag.pos.y+dirSwich(wag.pos.dir).y){
              collision = true;
            }
          }
        }
      }
    }
    return collision;
  }
  function distance(c,n){
    return Math.sqrt(Math.pow(c.x-n.x,2)+Math.pow(c.y-n.y,2));
  }
  function newPoint(c,n,dist,st){
    return {x: c.x+(((n.x-c.x)*st)/dist), y: c.y+(((n.y-c.y)*st)/dist), dir: c.dir+((n.dir-c.dir)*st)};
  }
  

  return (
    <>
      {arrTrains}
    </>
  );
}

useGLTF.preload("/train.glb");

export default TrainsController;