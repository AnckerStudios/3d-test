import { Canvas } from "@react-three/fiber";

import { useEffect, useState } from "react";
import Cell from "./Cell";
import Editor from "./Editor";


import Preview from "./Preview";
import ToolListElement from "./ToolListElement";
import Train from "./Train";
import ViewSwitcher from "./ViewSwitcher";

function ToolList({setTool}) {
    const [selectedTool, setSelectedTool] = useState(0);

    
    let toolList = [
        {id: 0, name: 'cursor', doubleClick: false},
        {id: 1, name: 'rail', doubleClick: true},
        {id: 2, name: 'plate', doubleClick: true},
        {id: 3, name: 'traffic lights', doubleClick: false},
        {id: 4, name: 'eraser', doubleClick: false}];
    let tools = [];
    useEffect(()=>{setTool(toolList[selectedTool])},[selectedTool])
    
    for(let i = 0; i < toolList.length; i++){
        tools.push(<ToolListElement tool={toolList[i]} setTool={setSelectedTool} selectedTool={selectedTool}/>);
    }

    return (
        <div className=" w-1/12 h-full absolute  left-4 top-4 flex flex-col gap-y-4">
            {tools}   
        </div>
    );
}

export default ToolList;
