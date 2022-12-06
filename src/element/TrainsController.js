import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

function TrainsController({pos = [0,0,0], mtrx=[]}) {
  useFrame((state, delta) => {
    if(!isStopped){
      console.log('gooo')
      if(iteration === 0){
        console.log('1')

        curCell.x = nextCell.x;
        curCell.y = nextCell.y;

        getNextDir(curCell.x, curCell.y);

        newX = curCell.x + dir.x;
        newY = curCell.y + dir.y;
        console.log("newXY "+ newX + ' '+ newY)
        if(newX < 0 || newX > mtrx.length-1 || newY < 0 || newY > mtrx[0].length-1){
          console.log('aaaaaaaaaaaaaaaaaa')
          isStopped = true;
        }else{
          console.log('2')
          nextCell = {x:newX, y:newY};
          iteration = 20;
        }
        
      }else{
        ref.current.position.x += speed * dir.x;
        ref.current.position.y += speed * dir.y;
        ref.current.rotation.z += speed * dir.y
        iteration--;
      }
    }
    })

//   function getVector(x,y){
//     let vector = new Vector3(mtrx[x][y].x,mtrx[x][y].y,0)
//     console.log(vector);
//     return vector;
//   }
  function getNextDir(x,y){
    console.log('mtrx[x][y].state')
    let state;
    console.log(mtrx[x][y])
    for(let s in mtrx[x][y].state){
      state = s;
    }
    switch(state){
      case 'x':
        dir = {x: dir.x === 1 ? 1 : -1,y: 0}
        break;
      case 'y':
        dir = {x: 0,y: dir.y === 1 ? 1 : -1}
        break;
      case 'dx':
      case 'dy':
          break;
      case 'rx_top':
        dir = {x: 1,y: 1}
        break;
      case 'rx_down':
        dir = {x: 1,y: -1}
        break;
      case 'rx_left':
        dir = {x: -1,y: -1}
        break;
      case 'rx_right':
        dir = {x: 1,y: 1}
        break;
      case 'ry_top':
        dir = {x: 1,y: -1}
        break;
      case 'ry_down':
        dir = {x: 1,y: -1}
        break;
      case 'ry_left':
        dir = {x: 0,y: 1}
        break;
      case 'ry_right':
        dir = {x: 1,y: -1}
        break;
      default:
        dir = {x:0,y:0}
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

export default TrainsController;