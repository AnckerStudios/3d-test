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
import { setCell } from "../logic/EditorLogic";

function Editor({setMtrx, view=true, tool='cursor'}) {
  const [selectType, setSelectType] = useState('none');
  const [clickedCell, setClickedCell] = useState({first: undefined, second: undefined});
  const [selectedCell, setSelectedCell] = useState({x: undefined, y: undefined, scroll: true});
  const [scroll, setScroll] = useState(0);
  let objSettings = {x:50, y:50}
  const [changeArr, setChangeArr] = useState([]);
  const [fieldMtrx, setFieldMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [previewMtrx, setPreviewMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [trainGo, setTrainGo] = useState(false);
  const [placeErr, setPlaceErr] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(()=>{setMtrx(fieldMtrx)},[fieldMtrx])

 

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
    
    if(isFirstClick()){
      setClickedCell({first: selectedCell});
    }
    else{
      setClickedCell({first: clickedCell.first, second: selectedCell});
      
    }
    console.log('click');
  }
  useEffect(()=>{
    console.log(clickedCell.second);
    if(!tool.doubleClick){
      if(clickedCell.first != undefined && placeErr === false){
        setFieldMtrx(joinMtrx(fieldMtrx, previewMtrx));
        clearPreview();
      }
      setClickedCell({first: undefined, second: undefined});
        
    }else{
      if(clickedCell.second != undefined && placeErr === false){
        setFieldMtrx(joinMtrx(fieldMtrx, previewMtrx))
        clearPreview()
      }
    }},[clickedCell])

  function сellSelection(x,y){
    setSelectedCell({...selectedCell, x:x, y:y});

  }
  useEffect(()=>{
    if(selectedCell.x != undefined && selectedCell.y != undefined){
      let cellPrev = setCell(selectedCell, fieldMtrx, tool, clickedCell);
      setPreviewMtrx(cellPrev.arr);
      setPlaceErr(cellPrev.err);
    }
    else{
      clearPreview();
    }
    },[selectedCell])


  function isFirstClick(){
    return (clickedCell.second != undefined || clickedCell.first == undefined);
  }
  function clearPreview(){
    let arr = createMtrx(objSettings.x,objSettings.y);
    setPreviewMtrx(arr);
  }
  function joinMtrx(first, second){
    let copy = Object.assign([], first);
    for(let row of copy){
      for(let item of row){
        copy[item.x][item.y].state = Object.assign(copy[item.x][item.y].state, second[item.x][item.y].state); //!
        copy[item.x][item.y].type = copy[item.x][item.y].type !== 'none' ? copy[item.x][item.y].type : second[item.x][item.y].type ;
      }
    }
    return copy;
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
          <Canvas orthographic camera={{position: view ? [50+25,-50+25,50] : [50+8,-50+8,50], zoom: 20, rotation: view ? [Math.PI/4, Math.PI/5, Math.PI/6] : [Math.PI/4, Math.PI/5, 0]}} 
                  onWheel={(e) => setScroll(e)} onClick={()=>cellClicking()} onContextMenu={()=>contextFunk()}>
            <Stats/>
            <CameraControl view = {view}/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10,15,10]}/>
            <pointLight position={[-3,0,2]}/>
            <Preview mtrx={previewMtrx} objSet={objSettings} prev={true} err={placeErr}/>
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
