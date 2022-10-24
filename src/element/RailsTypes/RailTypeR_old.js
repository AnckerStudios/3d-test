import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from "three";

function RailTypeR_old({ arrChanges = [], objSettings = {x: 16, y:16},arrPrew = []}) {
    const ref = useRef();
    const {nodes, materials} = useGLTF("/rail_type_r.glb");

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
            ref.current.setMatrixAt((item.x * objSettings.x + item.y) * 9, temp.matrix);
        }
        ref.current.instanceMatrix.needsUpdate = true;
    },[arrPrew])

    function getIndex(item){
        let index = (item.x * objSettings.x + item.y) * 9
        switch(item.state){
            case 'rx_top':
                index += 1;
                break;
            case 'rx_down':
                index += 2;
                break;
            case 'rx_left':
                index += 3;
                break;
            case 'rx_right':
                index += 4;
                break;
            case 'ry_top':
                index += 5;
                break;
            case 'ry_down':
                index += 6;
                break;
            case 'ry_left':
                index += 7;
                break;
            case 'ry_right':
                index += 8;
                break;
            default:
                break;
        }
        return index;
    }
    function getRotation(state){
        switch(state){
            case 'rx_top':
                return {x: 0, y: 0, z: Math.PI}
            case 'rx_down':
                return {x: 0, y: 0, z: 0}
            case 'rx_left':
                return {x: Math.PI, y: 0, z: Math.PI}
            case 'rx_right':
                return {x: Math.PI, y: 0, z: 0}
            case 'ry_top':
                return {x: 0, y: 0, z: Math.PI}
            case 'ry_down':
                return {x: 0, y: 0, z: Math.PI}
            case 'ry_left':
                return {x: 0, y: 0, z: Math.PI}
            case 'ry_right':
                return {x: 0, y: 0, z: Math.PI}
            default:
                return {x: 0, y: 0, z: 0}
        }
    }
    return (
        <instancedMesh ref={ref} args={[null, null,  objSettings.x * objSettings.y * 9]} geometry={nodes.Cube046.geometry} >
            <meshPhongMaterial />
        </instancedMesh>
    );
}

useGLTF.preload("/rail_type_r.glb");

export default RailTypeR_old;