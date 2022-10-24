import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

function Train({pos = [0,0,0], mtrx=[]}) {
  const { nodes, materials } = useGLTF("/train.glb");
  const ref = useRef();
  let speed = 0.05;
  let startCell = {x:0,y:0};
  let startPos = new Vector3(0,0,0);
  let curPos = new Vector2(0,0);
  let curCell = new Vector3(0,0,0);
  let targetPos = new Vector3(0,0,0);
  let targetCell = {x:0,y:0};
  let dir = {x:0,y:0}
  let iteration = 0;
  let isStopped = false;
  useFrame((state, delta) => {
    if(!isStopped){
      if(iteration === 0){

      }else{
        
      }
      ref.current.position.x += speed * dir.x;
      ref.current.position.y += speed * dir.y;
    }
    })

//   function getVector(x,y){
//     let vector = new Vector3(mtrx[x][y].x,mtrx[x][y].y,0)
//     console.log(vector);
//     return vector;
//   }
  function getNextCell(x,y){
    let newX = x+(direction[0] ? 1 : -1);
    let newY = y+(direction[1] ? 1 : -1);

    if(newX < 0 || newX > mtrx.length || newY < 0 || newY > mtrx[0].length){
      isStopped = true;
      return mtrx[x][y];
    }
    return mtrx[newX][y];
    switch(mtrx[x][y].state){
      case 'x':
        return [x+(direction[0] ? 1 : -1),0]
      case 'y':
        return [0,y+(direction[1] ? 1 : -1)]
      case 'dx':
         
      case 'dy':
          
      case 'rx_top':
         
      case 'rx_down':
          
      case 'rx_left':
          
      case 'rx_right':
          
      case 'ry_top':
          
      case 'ry_down':
          
      case 'ry_left':
          
      case 'ry_right':
          break;
  }
}
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