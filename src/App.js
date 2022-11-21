
import { Route, Routes } from "react-router-dom";
import TopologyEditor from "./element/TopologyEditor";
import Manul from './pages/Manul';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Manul/>}/> 
      <Route path="/topology/:id" element={<TopologyEditor/>}/> 
    </Routes>
  );
}

export default App;
