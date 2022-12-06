
import { Route, Routes } from "react-router-dom";
import TopologyEditor from "./element/TopologyEditor";
import Manul from './pages/Manul';
import ModelingPage from "./pages/ModelingPage";
import AdminMenuPage from './pages/AdminMenuPage';
import ManagerMenuPage from './pages/ManagerMenuPage';
import HomePage from './pages/HomePage';
import ChoicePage from './pages/ChoicePage';
import ListManagerPage from './pages/ListManagerPage';
import AddSityPage from './pages/AddSityPage';
import NewMacketPage from './pages/NewMacketPage';
import ScheduleEditorPage from './pages/ScheduleEditorPage';
import SchedulePage from './pages/SchedulePage';
import TopologyPage from './pages/TopologyPage';
import ModelirovaniePage from './pages/ModelirovaniePage';
import ScheduleCreatePage from "./pages/ScheduleCreatePage";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<TopologyEditor/>}/> 
      <Route path="/home" element={<HomePage/>}/> 
      <Route path="/admin-menu" element={<AdminMenuPage/>}/>
      <Route path="/manager-menu" element={<ManagerMenuPage/>}/> 
      <Route path="/list-manager" element={<ListManagerPage/>}/> 
      <Route path="/add-sity" element={<AddSityPage/>}/> 
      <Route path="/choicepage" element={<ChoicePage/>}/> 
      <Route path="/new-maket" element={<NewMacketPage/>}/>
      <Route path="/schedule-editor" element={<ScheduleEditorPage/>}/> 
      <Route path="/schedule" element={<SchedulePage/>}/>
      {/* <Route path="/modelirovanie" element={<ModelirovaniePage/>}/> */}
      <Route path="/modeling" element={<ModelingPage/>}/> 
      <Route path="/topology/:id" element={<TopologyPage/>}/> 
      <Route path="/create-schedule" element={<ScheduleCreatePage/>}/> 
    </Routes>
  );
}

export default App;
