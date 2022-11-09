import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BufferGeometry, DoubleSide, Matrix4, Object3D } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function CameraControl({view, zoom, pos}) {
    const { camera } = useThree()
    
    useEffect(()=>{
        camera.position.x = view ? 50 : 0
        camera.position.y = view ? -50 : 10
        camera.position.z = view ? 50 : 50
        camera.rotation.x = view ? Math.PI/4 : 0
        camera.rotation.y = view ? Math.PI/5 : 0
        camera.rotation.z = view ? Math.PI/6 : 0
      
      },[view])
    useEffect(()=>{
        //camera.zoom
        
    },[zoom])
    return (
        <></>
    );
}


export default CameraControl;