import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BufferGeometry, DoubleSide, Matrix4, Object3D } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function TestMes({ view}) {
    const { camera } = useThree()
  
    useEffect(()=>{
      camera.position.x = view ? 10 : 50
      },[view])

    return (
        <></>
       
    );
}


export default TestMes;