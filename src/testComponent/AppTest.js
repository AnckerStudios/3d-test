import { Route, Routes } from 'react-router-dom';
import AdminMenuPage from '../pages/AdminMenuPage';
import ManagerMenuPage from '../pages/ManagerMenuPage';
import HomePage from '../pages/HomePage';
import ChoicePage from '../pages/ChoicePage';
import ListManagerPage from '../pages/ListManagerPage';
import AddSityPage from '../pages/AddSityPage';
import NewMacketPage from '../pages/NewMacketPage';
import ScheduleEditorPage from '../pages/ScheduleEditorPage';
import SchedulePage from '../pages/SchedulePage';
import ModelirovaniePage from '../pages/ModelirovaniePage';

function AppTest() {
   
    return (
        <div>
          <Routes>
            <Route path="/" element={<ModelirovaniePage/>}/> 
            <Route path="/homepage" element={<HomePage/>}/> 
            <Route path="/admin-menu" element={<AdminMenuPage/>}/>
            <Route path="/manager-menu" element={<ManagerMenuPage/>}/> 
            <Route path="/list-manager" element={<ListManagerPage/>}/> 
            <Route path="/add-sity" element={<AddSityPage/>}/> 
            <Route path="/choicepage" element={<ChoicePage/>}/> 
            <Route path="/new-maket" element={<NewMacketPage/>}/>
            <Route path="/schedule-editor" element={<ScheduleEditorPage/>}/> 
            <Route path="/schedule" element={<SchedulePage/>}/>
            <Route path="/modelirovanie" element={<ModelirovaniePage/>}/>
          </Routes>
        </div>
      );
}


export default AppTest; 