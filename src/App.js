
import { Route, Routes } from "react-router-dom";
import TopologyEditor from "./element/TopologyEditor";
import Manul from './pages/Manul';
import ModelingPage from "./pages/ModelingPage";
import HomePage from './pages/HomePage';
import ManagerMenuPage from './pages/ManagerMenuPage';
import LoginPage from './pages/LoginPage';
import ChoicePage from './pages/ChoicePage';
import ListManagerPage from './pages/ListManagerPage';
import AddSityPage from './pages/AddSityPage';
import NewMacketPage from './pages/NewMacketPage';
import ScheduleEditorPage from './pages/ScheduleEditorPage';
import SchedulePage from './pages/SchedulePage';
import TopologyPage from './pages/TopologyPage';
import ModelirovaniePage from './pages/ModelirovaniePage';
import ScheduleCreatePage from "./pages/ScheduleCreatePage";
import ModelingListPage from "./pages/ModelingListPage";
import CreateTopologyPage from "./pages/CreateTopologyPage";
import TopologyEditorPage from "./pages/TopologyEditorPage";
import TrainsPage from "./pages/TrainsPage";
import CitysPage from "./pages/CitysPage";
import { useEffect } from "react";
import authHeader from "./services/auth-header";


function App() {
  
  useEffect(()=>{
    console.log("token",authHeader());
    console.log("netoken",getCurrentUser());
    axios.get('http://localhost:8080/api/services/controller/user/getUser',
    {
      headers: authHeader(),
      params: getCurrentUser()
    }
    )
    .then(function (response) {
        setCitys(response.data);
        setLoading(false);
        console.log("res",response);
    })
    .catch(function (error) {
        setCitys([{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"},{cityName:"name"}]);
        setLoading(false);
        console.log(error);
    });


  },[])
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>}/> {/*Manul*/}
      <Route path="/city" element={<CitysPage/>}/>
      <Route path="/city/:name" element={<Manul/>}/>

      <Route path="/modeling-list" element={<ModelingListPage/>}/> {/*Manul*/}
      <Route path="/login" element={<LoginPage/>}/> 
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/manager-menu" element={<ManagerMenuPage/>}/> 
      <Route path="/list-manager" element={<ListManagerPage/>}/> 
      <Route path="/add-sity" element={<AddSityPage/>}/> 
      <Route path="/choicepage" element={<ChoicePage/>}/> 
      <Route path="/new-maket" element={<NewMacketPage/>}/>
      <Route path="/schedule-editor/:id/:date/" element={<ScheduleEditorPage/>}>
        <Route path=":isCreate" element={<ScheduleEditorPage/>} />
      </Route>
      <Route path="/schedule" element={<SchedulePage/>}/>
      <Route path="/trains" element={<TrainsPage/>}/>
      {/* <Route path="/modelirovanie" element={<ModelirovaniePage/>}/> */}
      <Route path="/modeling/:id/:date" element={<ModelingPage/>}/> 
      <Route path="/modelirovanie/:id/:date" element={<ModelirovaniePage/>}/> 
      <Route path="/topology/:id/:name" element={<TopologyPage/>}/> 
      <Route path="/create-schedule/:id/:date" element={<ScheduleCreatePage/>}/> 
      <Route path="/topology-editor/:id/:name" element={<TopologyEditorPage/>}/> 
      <Route path="/create-topology/:cityname" element={<CreateTopologyPage/>}/> 
    </Routes>
  );
}

export default App;
