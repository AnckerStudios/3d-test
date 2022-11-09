import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BoxGeometry } from "three";
import { BufferAttribute } from "three";
import { DoubleSide, Object3D, PlaneGeometry } from "three";
import BufferGeometryUtils from "three-buffer-geometry-utils";
import Cell from "./Cell";
import RailD from "./RailsTypes/RailD";
import RailL from "./RailsTypes/RailL";
import RailR from "./RailsTypes/RailR";
import RailType from "./RailsTypes/RailType";

function Ground({mousePos, objSet = {x: 16, y:16}, enterFunk = true}) {
    const ref = useRef();
    const ref2 = useRef();
    const ts = useThree();
    const white = new THREE.Color().setHex(0xffffff);
    const color = new THREE.Color();
    const temp = new Object3D();
    const plane = new PlaneGeometry();
    const mesh = THREE.PlaneBufferGeometry
    

    useEffect(()=>{
      let box = new BoxGeometry();
      console.log(box);
      for(let i = 0; i < objSet.x; i++){
          for(let j = 0; j < objSet.y; j++){
            temp.position.set(i,j,0);
            temp.updateMatrix();
            ref.current.setMatrixAt(i*objSet.y+j, temp.matrix);
          }
        }
        ref.current.instanceMatrix.needsUpdate = true;
    },[])

    const [instanceId, setInstanceId] = useState();
    useEffect(() => {
        let mouse = new THREE.Vector2(mousePos.x, mousePos.y);
        ts.raycaster.setFromCamera(mouse, ts.camera);
        
        const intersection = ts.raycaster.intersectObject(ref.current);
        
        if (intersection.length > 0) {
          const newInstanceId = intersection[0].instanceId;
          
          if(newInstanceId !== instanceId){
            console.log(newInstanceId % objSet.x, Math.floor(newInstanceId/objSet.x))
            setInstanceId(newInstanceId);
            enterFunk(Math.floor(newInstanceId/objSet.x),newInstanceId % objSet.x);
          } 
        }else{
          enterFunk(undefined,undefined);
        }
      }, [mousePos]);
  
    
    return (

        
            <instancedMesh ref={ref} args={[null, null, objSet.x * objSet.y]}>
                <planeBufferGeometry  attach="geometry"/>
                <meshBasicMaterial attach="material" color='#678dbf'/>
            </instancedMesh>
    );
}
  
export default Ground;