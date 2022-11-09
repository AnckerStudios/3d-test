import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Matrix4, Object3D } from "three";

function Plate({ arr = [], count = 16, color = 'white'}) {
    const ref = useRef();


    const temp = new Object3D();
    const empty = new Matrix4();
    empty.set( 
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0 );
    useEffect(()=>{
        //console.log("ss")
        clear();
        for(let item of arr){
            //console.log("========")
            //console.log(item)
            temp.position.set(item.x,item.y,0);
            temp.rotation.set(item.rot.x,item.rot.y, item.rot.z);
            temp.updateMatrix();
            //console.log(temp)
            ref.current.setMatrixAt(item.index, temp.matrix);
            
        }
        //console.log(ref.current)
        ref.current.instanceMatrix.needsUpdate = true;
    },[arr])

    function clear(){
        for(let i = 0; i < ref.current.count; i++){
            ref.current.setMatrixAt(i, empty);
        }
    }
    return (
        <instancedMesh ref={ref} args={[null, null, count]} >
            <boxBufferGeometry/>
            <meshPhongMaterial color={color}/>
        </instancedMesh>
    );
}

useGLTF.preload("/rail_type_l.glb");

export default Plate;