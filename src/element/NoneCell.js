import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function NoneCell(props) {
    const {cellPos } = props;
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          position = {cellPos}
        >
            <planeGeometry/>
            <meshLambertMaterial attach="material" color={'hotpink'}/>
        </mesh>
      </group>
    );
}



export default NoneCell;