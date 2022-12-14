import { ArcballControls, DeviceOrientationControls, FirstPersonControls, FlyControls, MapControls, PointerLockControls, PresentationControls, ScrollControls, Stats, TrackballControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";


import Preview from "./Preview";
import Ground from "./Ground";
import Train from "./Train";
import TestMes from "../testComponent/TestMes";
import RailTypeL_old from "./RailsTypes/RailTypeL_old";
import CameraControl from "./CameraControl";
import { setCell, updatePlate } from "../logic/EditorLogic";

function Editor({mtrx=[],setMtrx, view=true, tool='cursor', flag}) {
  const ref = useRef();
  const [selectType, setSelectType] = useState('none');
  const [clickedCell, setClickedCell] = useState({first: undefined, second: undefined});
  const [selectedCell, setSelectedCell] = useState({x: undefined, y: undefined, scroll: true});
  const [scroll, setScroll] = useState(false);
  let objSettings = {x:mtrx.length, y:mtrx[0].length}
  const [changeArr, setChangeArr] = useState([]);
  const [fieldMtrx, setFieldMtrx] = useState(mtrx);
  const [zoom, setZoom] = useState(20);
  const [camPos, setCamPos] = useState({x:50, y:-50, z:50});
  const [previewMtrx, setPreviewMtrx] = useState(createMtrx(objSettings.x,objSettings.y));
  const [trainGo, setTrainGo] = useState(false);
  const [placeErr, setPlaceErr] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [plates, setPlates] = useState(0);


  useEffect(()=>{
    
    console.log(ref.current.toDataURL('image/jpg')); 
  },[flag])

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
    if(selectedCell.x != undefined && selectedCell.y != undefined){
    if(isFirstClick()){
      setClickedCell({first: selectedCell});
    }
    else{
      setClickedCell({first: clickedCell.first, second: selectedCell});
      
    }
  }
    console.log('click');
  }

  //useEffect(()=>{setMtrx();},[plates])

  useEffect(()=>{
    console.log(clickedCell.second);
    if(clickedCell.first != undefined){
    if(!tool.doubleClick){
      if(clickedCell.first != undefined && placeErr === false){
        if(tool.name !== "eraser"){
          setMtrx(joinMtrx(mtrx, previewMtrx));
        }else{
          setMtrx(clearMtrx(mtrx, selectedCell));
        }
        clearPreview();
      }
      setClickedCell({first: undefined, second: undefined});
        
    }else{
      if(clickedCell.second != undefined && placeErr === false){
        setMtrx(joinMtrx(mtrx, previewMtrx));
        clearPreview();
        // if(tool.name === 'plate'){
        //   setPlates((plates) => plates+1);
        // }
      }
    }

    }},[clickedCell])

  function ??ellSelection(x,y){
    setSelectedCell({...selectedCell, x:x, y:y});

  }
  function clearMtrx(mtrx, sel){
    let copy = Object.assign([], mtrx);
    if(sel.x >= 0 && sel.y >= 0 && sel.x < mtrx.length && sel.y < mtrx[0].length){
      if(copy[sel.x][sel.y].type === 'plate'){
        console.log("copy[sel.x][sel.y].state.dir",copy[sel.x][sel.y].state.dir)
        copy[sel.x][sel.y].type = "none";
        copy[sel.x][sel.y].state = {};
        if(!copy[sel.x][sel.y].state.dir){
          if(sel.x-1 >= 0){
            copy[sel.x-1][sel.y].type = "none";
          }
          if( sel.x+1 < mtrx.length){
            copy[sel.x+1][sel.y].type = "none";
          }
        }else{
          if(sel.y-1 >= 0){
            copy[sel.x][sel.y-1].type = "none";
          }
          if( sel.y+1 < mtrx.length){
            copy[sel.x][sel.y+1].type = "none";
          }
        }
        
      }else if(copy[sel.x][sel.y].type === 'neplatel'){
        copy[sel.x][sel.y].type = "none";
        copy[sel.x][sel.y].state = {};
        if(sel.x-1 >= 0){
          copy[sel.x-1][sel.y].type = "none";
        }
        if( sel.x+1 < mtrx.length){
          copy[sel.x+1][sel.y].type = "none";
        }
      }else if(copy[sel.x][sel.y].type === 'neplater'){
        copy[sel.x][sel.y].type = "none";
        copy[sel.x][sel.y].state = {};
        if(sel.y-1 >= 0){
          copy[sel.x][sel.y-1].type = "none";
        }
        if( sel.y+1 < mtrx.length){
          copy[sel.x][sel.y+1].type = "none";
        }
      }else{
        copy[sel.x][sel.y].type = "none";
        copy[sel.x][sel.y].state = {};
      }
    }
    return copy;
  }
  useEffect(()=>{console.log("AAAAAAAAAA",plates)},[plates])
  useEffect(()=>{
    if(selectedCell.x != undefined && selectedCell.y != undefined){
      let cellPrev = setCell(selectedCell, mtrx, tool, clickedCell, plates);
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

  function scrollWheel(e){
   
    if(tool.name !== 'cursor'){
      setScroll(!scroll);
      setSelectedCell({...selectedCell, scroll:!selectedCell.scroll})
    }else{
      if(e.altKey){
        if(e.deltaY === -100){
          setCamPos({...camPos, y: camPos.y+1, x:camPos.x-1});
        }else{
          setCamPos({...camPos, y: camPos.y-1, x:camPos.x+1});
        }
      }else if(e.shiftKey){
        if(e.deltaY === -100){
          setCamPos({...camPos, y: camPos.y-1, x:camPos.x-1});
        }else{
          setCamPos({...camPos, y: camPos.y+1, x:camPos.x+1});
        }
      }else{
        if(e.deltaY === -100){
          if(zoom < 100)
            setZoom(zoom+5);
        }else{
          if(zoom > 5)
            setZoom(zoom-5);
        }
    }
    
    }
    // setSelectedCell({...selectedCell, scroll:!selectedCell.scroll})
  }
  function contextFunk(){
    console.log("context")
  }
  
  return (
          <Canvas ref={ref} orthographic camera={{position: [50+25, -50+25, 50], zoom: 20, rotation: view ? [Math.PI/4, Math.PI/5, Math.PI/6] : [Math.PI/4, Math.PI/5, 0]}} 
                  onWheel={(e) => scrollWheel(e)} onClick={()=>cellClicking()} onContextMenu={()=>contextFunk()}>
            <Stats/>
            <CameraControl view = {view} zoom = {zoom} pos = {camPos}/>
            <ambientLight intensity={0.5}/>
            <pointLight position={[10,15,10]}/>
            <pointLight position={[-3,0,2]}/>
            <Preview mtrx={previewMtrx} objSet={objSettings} prev={true} err={placeErr}/>
            <Preview mtrx={mtrx} objSet={objSettings} prev={false}/>
            <Ground mousePos={mousePos} objSet={objSettings} enterFunk={??ellSelection}/>
            {/* <RailTypeL_old/> */}
            {/* <TestMes/> */}
            {trainGo && <Train mtrx={mtrx} />}
            {/* {<Ctest mtrx={changeArr} objSettings={objSettings} prevMtrx={previewMtrx}/>} */}
            
            {/* {fieldMtrx.map(cx => (cx.map(cy => (
              <Cell key={cy.id} model={cy} enterFunk={??ellSelection}/>
            ))))} */}
          </Canvas>
    );
}

export default Editor;
