import { Canvas } from "@react-three/fiber";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createMtrx } from "../logic/EditorLogic";
import Cell from "./Cell";
import Editor from "./Editor";


import Preview from "./Preview";
import ToolList from "./ToolList";
import ToolListElement from "./ToolListElement";
import Train from "./Train";
import ViewSwitcher from "./ViewSwitcher";

function TopologyEditor() {
    const {id} = useParams();
    const [view, setView] = useState();
    const [tool, setTool] = useState();
    const [mtrx, setMtrx] = useState(createMtrx(50,50));

  useState(()=> {
    axios.get('http://localhost:8080/api/topology', {
        params: {
          id: id
        }
        })
        .then(function (response) {
            setMtrx(response.data)
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  },[])
  function save(){
    axios.post('http://localhost:8080/api/topology', {
        title: 'lox',
        body: mtrx
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="w-full h-screen flex p-4">
        <div className=" w-full h-full rounded-xl bg-slate-300 shadow-md relative">
            <Editor mtrx={mtrx} setMtrx={setMtrx} view={view} tool={tool}/>
            <ToolList setTool={setTool}/>
            <ViewSwitcher setView={setView}/>
            <button className=" w-24 h-15 absolute  rounded-xl bottom-4 right-4 bg-slate-200 flex shadow-md justify-center font-bold p-1 hover:bg-slate-400" onClick={() => save()}>
                Save
            </button>
        </div>
    </div>
    );
}

export default TopologyEditor;
