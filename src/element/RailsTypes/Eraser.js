import React, { useEffect, useRef, useState } from "react";
import { Box, useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { Matrix4, Object3D } from "three";

function Eraser({ arr = [], color = 'red'}) {
    const { nodes, materials } = useGLTF("/eraser.glb");
    const [plateArr, setPlateArr] = useState([]);
    useEffect(()=>{

        let testArr = [];
        for(let item of arr){

            testArr.push(
                <mesh
                position={[item.x,item.y,0]}
                rotation={[0,0,0]}
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


useGLTF.preload("/eraser.glb");

export default Eraser;