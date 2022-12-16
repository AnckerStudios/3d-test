import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, dirSwich } from "../logic/ModelingLogic";

function Wagon({pos}) {
  const { nodes, materials } = useGLTF("/train.glb");
  const ref = useRef();
  const [opacity, setOpacity] = useState(0);
  
  return (
    <group dispose={null}>
      <mesh
        ref={ref}
        position={[pos.x,pos.y, 0]}
        rotation={[0,0,0]}
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        
      >
        <meshStandardMaterial color={'white'} opacity={1} transparent={true}/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/train.glb");

export default Wagon;