import { Canvas } from "@react-three/fiber";

import { useEffect, useState } from "react";
import Cell from "./Cell";
import Editor from "./Editor";


import Preview from "./Preview";
import ToolListElement from "./ToolListElement";
import Train from "./Train";
import ViewSwitcher from "./ViewSwitcher";

function TopologyEditor() {
  const [view, setView] = useState();
  const [tool, setTool] = useState();
  return (
    <div className="w-full h-screen flex p-4">
        <div className=" w-full h-full rounded-xl bg-slate-300 shadow-md relative">
            <Editor view={view} tool={tool}/>
            <div className=" w-40 h-full absolute  left-4 top-4 flex flex-col  gap-y-4">
                <ToolListElement toolName={'rail'} setTool={setTool}/>
                <ToolListElement toolName={'plate'} setTool={setTool}/>
                <ToolListElement/>
                <ToolListElement/>
                <ToolListElement/>
            </div>
            <ViewSwitcher setView={setView}/>
            <div className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1">
                Save
            </div>
        </div>
    </div>
    );
}

export default TopologyEditor;
