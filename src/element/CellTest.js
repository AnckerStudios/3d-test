import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function CellTest(props) {
    const {nodes, materials} = useGLTF("/rail2.glb");
    const {cellPos, cellRot, selectionType} = props;
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={nodes.Cube008.material}
          position = {cellPos}
          rotation = {[0,0,cellRot]}
        >
          <meshLambertMaterial attach="material" color={selectionType}/>
        </mesh>
      </group>
    );
}

useGLTF.preload("/rail2.glb");

export default CellTest;