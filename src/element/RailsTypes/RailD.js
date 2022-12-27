import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Matrix4, Object3D } from "three";

function RailD({ arr = [], count = 16, color = 'white', prev=false}) {
    const ref = useRef();
    const {nodes, materials} = useGLTF("/rail_type_d.glb");
    const positions = nodes.Model.geometry.attributes.position.array;
    const normals = nodes.Model.geometry.attributes.normal.array;
    const colors = nodes.Model.geometry.attributes.uv.array;
    const indices = nodes.Model.geometry.index.array
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
            <bufferGeometry>
            <bufferAttribute
                attach='attributes-position'
                array={positions}
                count={positions.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attach='attributes-color'
                array={colors}
                count={colors.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attach='attributes-normal'
                array={normals}
                count={normals.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attach="index"
                array={indices}
                count={indices.length}
                itemSize={1}
            />
            </bufferGeometry>
            <meshPhongMaterial color={color}/>
        </instancedMesh>
    );
}

useGLTF.preload("/rail_type_d.glb");

export default RailD;