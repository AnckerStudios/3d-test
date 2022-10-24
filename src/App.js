import { Canvas } from "@react-three/fiber";
import { BoxGeometry, Vector3 } from "three";
import {OrbitControls} from "@react-three/drei"
import { useEffect, useState } from "react";
import Cell from "./element/Cell";
import Row from "./element/Row";
import CellTest from "./element/CellTest";
import { CycleRaycast, useCursor, } from "@react-three/drei";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Ctest from "./testComponent/Ctest";
import Preview from "./element/Preview";
import Train from "./element/Train";

function App() {
  const [selectType, setSelectType] = useState('none');
  const [clickedCell, setClickedCell] = useState({first: undefined, second: undefined});
  const [selectedCell, setSelectedCell] = useState({x: undefined, y: undefined, scroll: true});
  const [scroll, setScroll] = useState(false);
  let objSettings = {x:16, y:16}
  const [changeArr, setChangeArr] = useState([]);
  const [fieldMtrx, setFieldMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [previewMtrx, setPreviewMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [trainGo, setTrainGo] = useState(false);
  

  

  function createMtrx(x, y){
    let arr = [];
    for(let i = 0; i < x; i++){
      arr.push([])
      for(let j = 0; j < y; j++){
        arr[i].push({id: y*i+j, x: i, y: j, state: {}})
      }
    }
    return arr
  }

  function cellClicking(){

    if(clickedCell.second != undefined || clickedCell.first == undefined){
      setClickedCell({first: selectedCell});
    }
    else{
      setClickedCell({first: clickedCell.first, second: selectedCell});
      
    }
    console.log('click');
  }
  useEffect(()=>{
    console.log(clickedCell.second);
    if(clickedCell.second != undefined){
      console.log('dsf');
      setFieldMtrx(joinMtrx(fieldMtrx, previewMtrx))
    }},[clickedCell])

  function сellSelection(e){
    setSelectedCell({...selectedCell, x:e.x, y:e.y});

  }
  useEffect(()=>{
    let arr = createMtrx(objSettings.x,objSettings.y);
    if(selectedCell.x != undefined && selectedCell.y != undefined){
      if(clickedCell.second != undefined || clickedCell.first == undefined){
        //console.log(selectedCell);
        arr[selectedCell.x][selectedCell.y].state = selectedCell.scroll ? {x: true} : {y: true};
        setPreviewMtrx(arr);
      }
      else{
        let change = createWay(clickedCell.first, selectedCell);
        setPreviewMtrx(editMtrx(arr,change));
      
      }
    }
    },[selectedCell])
  function joinMtrx(first, second){
    let copy = Object.assign([], first);
    for(let row of copy){
      for(let item of row){
        copy[item.x][item.y].state = Object.assign(copy[item.x][item.y].state, second[item.x][item.y].state);
      }
    }
    return copy;
  }
  function createWay(first, second){
    let arr = [];
    
    let deltaX = second.x - first.x; //проверки добавь
    let deltaY = second.y - first.y;
    let ix = Math.sign(deltaX);
    let iy = Math.sign(deltaY);
    let curX = first.x;
    let curY = first.y;

    arr.push({x: curX, y: curY, state: !first.scroll ? 'y' : 'x'});

    if(deltaX === 0 ){ 
      //console.log('its x')
      if(!first.scroll && !second.scroll){
        console.log('its ++x')
        while((curY != second.y)){
          //console.log('++++')
          arr.push({x: curX, y: curY, state: 'y'});
          curY = curY + iy;
        }
        arr.push({x: curX, y: curY, state: 'y'});
      }
    }else if(deltaY === 0 ){ 
      //console.log('its y')

      if(first.scroll && second.scroll){
        //console.log('its ++y')
        while((curX != second.x)){
          arr.push({x: curX, y: curY, state: 'x'});
          curX = curX + ix;
        }
        arr.push({x: curX, y: curY, state: 'x'});
      }
    }else{
    curX = first.scroll ? curX + ix : curX;
    curY = first.scroll ? curY : curY + iy;
    arr.push({x: curX, y: curY, state: testSwich(ix, iy, first.scroll)});
    curX = curX + ix;
    curY = curY + iy;

    while((curX != second.x) && (curY != second.y)){
      arr.push({x: curX, y: curY, state: ix === iy ? 'dy' : 'dx'});
      curX = curX + ix;
      curY = curY + iy;
    }
    arr.push({x: curX, y: curY, state: testSwich(-ix, -iy, second.scroll)});
  }
    
    //arr.push({x: second.x, y: second.y, state: !second.scroll ? 'y' : 'x'});
    
    //console.log(arr);
    return arr;
  }

  function testSwich(i, j, dir){
    if(i > 0 && j > 0 ){
      return dir == true ? 'rx_right' : 'ry_right';
    } else if(i < 0 && j < 0 ){
      return dir == true ? 'rx_left' : 'ry_left';
    } else if(i > 0 && j < 0 ){
      return dir == true ? 'rx_down' : 'ry_top';
    } else if(i < 0 && j > 0 ){
      return dir == true ? 'rx_top' : 'ry_down';
    }
  }

  
  function editMtrx(mtrx, change){
    let copy = Object.assign([], mtrx);
    for(let item of change){
      if((item.x>=0 && item.y>=0) && (item.x<objSettings.x && item.y<objSettings.y))
      copy[item.x][item.y].state[item.state] = true;
    }
    //console.log("dsdasdasdasdasdasdada")
    //console.log(copy)
    return copy;
    //setFieldMtrx(copy);
  }
  let dis = 0;
  function clickFunk(){


    setTrainGo(!trainGo);
    //console.log(res);
  }


  function testArrTest(arr){
    let copy = Object.assign([], arr);
    copy[2] = 10;
    return copy;
  }
  function contextFunk(){
    console.log("context")
  }
  return (
    <div class="h-screen flex">
      <div class="w-fit flex-grow">
        <div class="flex flex-col items-center">
            <button class="border rounded bg-slate-500 px-5 py-2 text-lg font-bold m-5 hover:bg-violet-400" onClick={() => setSelectType('rail')}>rail</button>
            <button class="border rounded bg-slate-500 px-5 py-2 text-lg font-bold m-5 hover:bg-violet-400" onClick={() => setSelectType('plate')}>plate</button>
            <button class="border rounded bg-slate-500 px-5 py-2 text-lg font-bold m-5 hover:bg-violet-400" onClick={() => clickFunk()}>{trainGo ? 'true' : 'false'}</button>
            
            

             
          </div>
          
        </div>
        <div class="w-fit flex-grow">
        <div class=" h-full rounded-lg border-4 border-dashed border-gray-200 bg-slate-700 ">
          <Canvas orthographic camera={{position: [50+8,-50+8,50], zoom: 70, rotation: [Math.PI/4, Math.PI/5, Math.PI/6]}} 
                  onWheel={()=>setSelectedCell({...selectedCell, scroll:!selectedCell.scroll})} onClick={()=>cellClicking()} onContextMenu={()=>contextFunk()}>
            
            <ambientLight intensity={0.5}/>
            <pointLight position={[10,15,10]}/>
            <pointLight position={[-3,0,2]}/>
            <Preview mtrx={previewMtrx} objSet={objSettings} prev={true}/>
            <Preview mtrx={fieldMtrx} objSet={objSettings} prev={false}/>
            {trainGo && <Train />}
            {/* {<Ctest mtrx={changeArr} objSettings={objSettings} prevMtrx={previewMtrx}/>} */}
            
            {fieldMtrx.map(cx => (cx.map(cy => (
              <Cell key={cy.id} model={cy} enterFunk={сellSelection}/>
            ))))}
          </Canvas>
        </div>
        </div>
      </div>
    );
}

export default App;
