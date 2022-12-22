import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { centerCell, centerDir, dirSwich } from "../logic/ModelingLogic";

function Wagon({wagInfo}) {
  const { nodes, materials } = useGLTF("/train.glb");
  const ref = useRef();
  const [opacity, setOpacity] = useState(0);

  return (
    <group dispose={null}>
      <mesh
        ref={ref}
        position={[wagInfo.pos.x,wagInfo.pos.y, 0]}
        rotation={[0,0,wagInfo.pos.dir]}
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        
      >
        <meshStandardMaterial color={wagInfo.err ? 'red' : 'white'} opacity={wagInfo.opacity} transparent={true}/>
      </mesh>
    </group>
  );
}

useGLTF.preload("/train.glb");

export default Wagon;