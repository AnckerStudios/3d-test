
import { Route, Routes } from "react-router-dom";
import TopologyEditor from "./element/TopologyEditor";
import Manul from './pages/Manul';
import ModelingPage from "./pages/ModelingPage";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<ModelingPage/>}/> 
      <Route path="/topology/:id" element={<TopologyEditor/>}/> 
    </Routes>
  );
}

export default App;
