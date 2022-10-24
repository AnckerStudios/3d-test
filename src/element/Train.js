import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Train({pos = [0,0,0], mtrx=[]}) {
  const { nodes, materials } = useGLTF("/train.glb");
  const ref = useRef();
  let startPos = new Vector3(0,0,0);
  let curPos = new Vector3(0,0,0);
  let curCell = new Vector3(0,0,0);
  let targetPos = new Vector3(0,0,0);
  let targetCell = new Vector3(0,0,0);
  let direction = [true,true]
  let dis= 0;
  useFrame((state, delta) => {
    //console.log(ref.current.position.x)
    if(curPos.x === targetPos.x && curPos.y === targetPos.y){
      console.log('fff')
      startPos = targetPos;
      targetCell = new Vector3(targetCell.x+1,0);
      targetPos = targetCell;
      dis = 0;
    }
    console.log(curPos)
    // let a = ref.current.position;
    // let b = getVector(curVector.x);
    curPos = startPos.lerp(targetPos,dis);
    curPos.x = +curPos.x.toFixed(2)
    dis += 0.01;
    dis = +dis.toFixed(2);
    ref.current.position.x = curPos.x;
    ref.current.position.y = curPos.y;
    
    })

//   function getVector(x,y){
//     let vector = new Vector3(mtrx[x][y].x,mtrx[x][y].y,0)
//     console.log(vector);
//     return vector;
//   }
//   function getNext(x,y){
//     switch(mtrx[x][y].state){
//       case 'x':
//         return [x+(direction[0] ? 1 : -1),0]
//       case 'y':
//         return [0,y+(direction[1] ? 1 : -1)]
//       case 'dx':
         
//       case 'dy':
          
//       case 'rx_top':
         
//       case 'rx_down':
          
//       case 'rx_left':
          
//       case 'rx_right':
          
//       case 'ry_top':
          
//       case 'ry_down':
          
//       case 'ry_left':
          
//       case 'ry_right':
//           break;
//   }
// }
  return (
    <group dispose={null}>
      <mesh
        ref={ref}
        position={pos}
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
      />
    </group>
  );
}

useGLTF.preload("/train.glb");

export default Train;