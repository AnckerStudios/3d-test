import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BufferAttribute, BufferGeometry, Matrix4, Mesh, Object3D, Vector3 } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";

function RailTypeL_old({ arr = [], count = 16, color = 'white'}) {
    const ref = useRef();
    const {nodes, materials} = useGLTF("/rail_type_l.glb");

    const [positions,setPos] = useState([]);
    const [normals ,setNor] = useState([]);
    const [colors ,setCol] = useState([]);
    const [indices ,setInd] = useState([]);

    const temp = new Object3D();

    useEffect(()=>{
        for(let i = 0; i < count; i++){
            for(let j = 0; j < count; j++){
                
            }
          }
          let pos = Array.from(nodes.Model.geometry.attributes.position.array);
                let norm = Array.from(nodes.Model.geometry.attributes.normal.array);
                let col = Array.from(nodes.Model.geometry.attributes.uv.array);
                let indx = Array.from(nodes.Model.geometry.index.array);
                let geom = new BufferGeometry();
                geom.setAttribute('position', new THREE.BufferAttribute( pos, 3 ) )
                geom.setAttribute('normal', new THREE.BufferAttribute( norm, 3 ) )
                geom.setAttribute('color', new THREE.BufferAttribute( col, 3 ) )
                geom.setIndex(new THREE.BufferAttribute( indx, 1 ) )
       
        

        
        console.log(geom)
        
        const geo = [];

        geo.push(geom);
        geo.push(geom);
        const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geo, false);
        // setPos(mergedGeometry.attributes.position.array)
        // setNor(mergedGeometry.attributes.normal.array)
        // setCol(mergedGeometry.attributes.uv.array)
        // setInd(mergedGeometry.index.array)
        console.log(mergedGeometry)
        
    },[])

    return (
        <mesh ref={ref} >
            {/* <bufferGeometry>
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
            <meshPhongMaterial color={color}/> */}
        </mesh>
    );
}

useGLTF.preload("/rail_type_l.glb");

export default RailTypeL_old;