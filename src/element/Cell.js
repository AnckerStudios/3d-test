import { useState , useEffect} from "react";
import { PlaneGeometry } from "three";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CellTest from "./CellTest";
import Plate from "./Plate";


function Cell(props) {

    const {model, enterFunk} = props;
    const [cellRot, setCellRot] = useState('x');
    const [cellColor, setCellColor] = useState(true);
    const [cellApply, setCellApply] = useState(false);
    const [selectionType, setSelectionType] = useState('');
    const [cellType, setCellType] = useState(<></>);
    const [oldCellType, setOldCellType] = useState(<></>);
    
    // function typeSwitch(color){
    //     switch(selectType) {
    //         case 'rail':
    //           return <CellTest cellPos={[id.x,id.y,0]} cellRot={cellRot === 'x' ? 0 : Math.PI/2} selectionType={color}/>;
    //         case 'plate':
    //           return <Plate cellPos={[id.x,id.y,0]}/>;
    //         default:
    //           return <></>;
    //       }
    // }
    function mouseEnter(){
        enterFunk(model)
    //    setCellType(typeSwitch('lime'))
    }
    function mouseLeave(){
        
    //    setCellType(oldCellType)
    }
    
    const wheelSpin = () => {
        // console.log("key "+ id.direction);
        // id.direction = id.direction === 'x' ? 'y' : 'x';
        // setCellRot(cellRot === 'x' ? 'y' : 'x');
        // console.log("wheel spining "+ id.direction)
    }

    return (
        <>
            {cellType}
            {/* <RailCell model={model}/> */}
            {<mesh position={[model.x,model.y,0]}  onPointerEnter={() => mouseEnter()} onPointerLeave={() => mouseLeave()}>
                <planeGeometry/>
                <meshLambertMaterial attach="material" color={model.state ? '#678dbf' : 'orange'}/>
            </mesh>}
        </>
    );
}
  
export default Cell;
  