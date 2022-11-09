import { ArcballControls, DeviceOrientationControls, FirstPersonControls, FlyControls, MapControls, PointerLockControls, PresentationControls, ScrollControls, Stats, TrackballControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

import { useEffect, useState } from "react";
import Cell from "./Cell";


import Preview from "./Preview";
import Ground from "./Ground";
import Train from "./Train";
import TestMes from "../testComponent/TestMes";
import RailTypeL_old from "./RailsTypes/RailTypeL_old";
import CameraControl from "./CameraControl";

function Editor({view=true, tool='rail'}) {
  const [selectType, setSelectType] = useState('none');
  const [clickedCell, setClickedCell] = useState({first: undefined, second: undefined});
  const [selectedCell, setSelectedCell] = useState({x: undefined, y: undefined, scroll: true});
  const [scroll, setScroll] = useState(0);
  let objSettings = {x:50, y:50}
  const [changeArr, setChangeArr] = useState([]);
  const [fieldMtrx, setFieldMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [previewMtrx, setPreviewMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [trainGo, setTrainGo] = useState(false);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });



 

  function createMtrx(x, y){
    let arr = [];
    for(let i = 0; i < x; i++){
      arr.push([])
      for(let j = 0; j < y; j++){
        arr[i].push({id: y*i+j, x: i, y: j, type: 'none',state: {}})
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

  function сellSelection(x,y){
    setSelectedCell({...selectedCell, x:x, y:y});

  }
  useEffect(()=>{
    let arr = createMtrx(objSettings.x,objSettings.y);
    if(selectedCell.x != undefined && selectedCell.y != undefined){
      if(clickedCell.second != undefined || clickedCell.first == undefined){
        arr[selectedCell.x][selectedCell.y].type = tool;
        switch(tool){
          case 'rail':
            arr[selectedCell.x][selectedCell.y].state = selectedCell.scroll ? {x: true} : {y: true};
            break;
          case 'plate':
            // arr[selectedCell.x][selectedCell.y].state
        }
        arr[selectedCell.x][selectedCell.y].state = selectedCell.scroll ? {x: true} : {y: true};
        setPreviewMtrx(arr);
      }
      else{
        let change = createWay(clickedCell.first, selectedCell);
        setPreviewMtrx(editMtrx(arr,change));
      
      }
    }
    else{
      setPreviewMtrx(arr);
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

  function setCells(first, second){
    switch(tool){
      case 'rail':

        break;
      case 'plate':
        return createWay(first, second);
    }
  }
  function setPlate(first, second){

  }
  function checkRail(){

  }
  function createWay(first, second){
    let arr = [];
    
    let deltaX = second.x - first.x; //проверки добавь
    let deltaY = second.y - first.y;
    let ix = Math.sign(deltaX);
    let iy = Math.sign(deltaY);
    let curX = first.x;
    let curY = first.y;

    if(deltaX === 0){
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
    }else if(deltaY === 0){
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
  const handleMouse = (event) => {
    const mouse = {};
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    setMousePos(mouse);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouse);
    return () => {
      document.removeEventListener("mousemove", handleMouse);
    };
  }, []);
  useEffect(() => {
    console.log(scroll);
  }, [scroll]);
  function scrollWheel(){
    if(scroll < 4)
      setScroll(()=>scroll+1);
    else{
      setScroll(0);
    }
    setSelectedCell({...selectedCell, scroll:!selectedCell.scroll})
  }
  function contextFunk(){
    console.log("context")
  }
  
  return (
          <Canvas orthographic camera={{position: view ? [50+25,-50+25,50] : [50+8,-50+8,50], zoom: 10, rotation: view ? [Math.PI/4, Math.PI/5, Math.PI/6] : [Math.PI/4, Math.PI/5, 0]}} 
                  onWheel={(e) => setScroll(e)} onClick={()=>cellClicking()} onContextMenu={()=>contextFunk()}>
            <Stats/>
            <CameraControl view = {view}/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10,15,10]}/>
            <pointLight position={[-3,0,2]}/>
            <Preview mtrx={previewMtrx} objSet={objSettings} prev={true}/>
            <Preview mtrx={fieldMtrx} objSet={objSettings} prev={false}/>
            <Ground mousePos={mousePos} objSet={objSettings} enterFunk={сellSelection}/>
            {/* <RailTypeL_old/> */}
            {/* <TestMes/> */}
            {trainGo && <Train mtrx={fieldMtrx} />}
            {/* {<Ctest mtrx={changeArr} objSettings={objSettings} prevMtrx={previewMtrx}/>} */}
            
            {/* {fieldMtrx.map(cx => (cx.map(cy => (
              <Cell key={cy.id} model={cy} enterFunk={сellSelection}/>
            ))))} */}
          </Canvas>
    );
}

export default Editor;
