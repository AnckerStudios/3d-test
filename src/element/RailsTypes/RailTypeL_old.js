import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from "three";

function RailTypeL_old({ arrChanges = [], objSettings = {x: 16, y:16},arrPrew = []}) {
    const ref = useRef();
    const {nodes, materials} = useGLTF("/rail_type_l.glb");
   
    const temp = new Object3D();
    useEffect(()=>{
        for(let item of arrChanges){
            temp.position.set(item.x,item.y,0);
            let rot = getRotation(item.state);
            temp.rotation.set(rot.x,rot.y,rot.z)
            temp.updateMatrix();
            ref.current.setMatrixAt(getIndex(item), temp.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
    },[arrChanges])

    useEffect(()=>{
        for(let item of arrPrew){
            temp.position.set(item.x,item.y,0);
            temp.scale.set(1.01,1.01,1.01);
            let rot = getRotation(item.state);
            temp.rotation.set(rot.x,rot.y,rot.z);
            temp.updateMatrix();
            ref.current.setMatrixAt((item.x * objSettings.x + item.y) * 3, temp.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
    },[arrPrew])

    function getIndex(item){
        let index = (item.x * objSettings.x + item.y) * 3
        switch(item.state){
            case 'x':
                index += 1;
                break;
            case 'y':
                index += 2;
                break;
            default:
                break;
        }
        return index;
    }
    function getRotation(state){
        switch(state){
            case 'x':
                return {x: 0, y: 0, z: 0}
            case 'y':
                return {x: 0, y: 0, z: Math.PI/2}
            default:
                return {x: 0, y: 0, z: 0}
        }
    }
    return (
        <instancedMesh ref={ref} args={[null, null,  objSettings.x * objSettings.y * 3]} geometry={nodes.Cube008.geometry} >
            <meshPhongMaterial />
        </instancedMesh>
        
    );
}

useGLTF.preload("/rail_type_l.glb");

export default RailTypeL_old;