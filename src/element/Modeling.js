import { ArcballControls, DeviceOrientationControls, FirstPersonControls, FlyControls, MapControls, PointerLockControls, PresentationControls, ScrollControls, Stats, TrackballControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

import { useEffect, useState } from "react";
import Preview from "./Preview";
import Ground from "./Ground";
import Train from "./Train";
import TrainsController from "./TrainsController";


function Modeling({mtrx=[], ways=[], timer=0, setErr}) {
  let objSettings = {x:mtrx.length, y:mtrx[0].length}
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouse = (event) => {
    const mouse = {};
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    setMousePos(mouse);
  };
  function сellSelection(x,y){
    

  }
  // let trains = [];
  // for(let i = 0; i < ways.length; i++){
  //   trains.push(<Train pos={[0,i,0]} train={ways[i]} timer={timer}/>)
  // }
  useEffect(() => {
    document.addEventListener("mousemove", handleMouse);
    return () => {
      document.removeEventListener("mousemove", handleMouse);
    };
  }, []);
  
  return (
          <Canvas orthographic camera={{position: [16+8, -16+8, 16], zoom: 20, rotation: [Math.PI/4, Math.PI/5, Math.PI/6]}}>
            <Stats/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10,15,10]}/>
            <pointLight position={[-3,0,2]}/>
            <Preview mtrx={mtrx} objSet={objSettings} prev={false}/>
            <Ground mousePos={mousePos} objSet={objSettings} enterFunk={сellSelection}/>
            {/* {trains} */}
            <TrainsController trains={ways} timer={timer} mtrx={mtrx} setErr={setErr}/>
            {/* {trainGo && <Train mtrx={mtrx} >} */}
          </Canvas>
    );
}

export default Modeling;
