import React, { useEffect, useRef, useState } from "react";
import { Box, useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { Matrix4, Object3D } from "three";

function Plate({ arr = [], color = 'white'}) {
    const { nodes, materials } = useGLTF("/plate.glb");
    const [plateArr, setPlateArr] = useState([]);
    useEffect(()=>{

        let testArr = [];
        for(let item of arr){

            testArr.push(
                <mesh
                position={[item.x,item.y,0]}
                geometry={nodes.Model.geometry}>
                    <meshStandardMaterial color={color} />
                </mesh>
            );

        }
        setPlateArr(testArr);
    },[arr])

   
    return (
        <>
        {plateArr}
        </>
    );
}


useGLTF.preload("/plate.glb");

export default Plate;