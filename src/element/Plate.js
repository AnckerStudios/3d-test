import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Plate(props) {
    const {nodes, materials} = useGLTF("/plate.glb");
    const {cellPos } = props;
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
          position = {cellPos}
        />
      </group>
    );
}

useGLTF.preload("/plate.glb");

export default Plate;