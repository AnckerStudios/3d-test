import { Route, Routes } from "react-router-dom";
import Manul from "./pages/Manul";
import HomeAdminPage from "./pages/HomeAdminPage";
import HomeModerPage from "./pages/HomeModerPage";
import LoginPage from "./pages/LoginPage";
import ListManagerPage from "./pages/ListManagerPage";
import ScheduleEditorPage from "./pages/ScheduleEditorPage";
import SchedulePage from "./pages/SchedulePage";
import TopologyPage from "./pages/TopologyPage";
import ModelirovaniePage from "./pages/ModelirovaniePage";
import ScheduleCreatePage from "./pages/ScheduleCreatePage";
import ModelingListPage from "./pages/ModelingListPage";
import CreateTopologyPage from "./pages/CreateTopologyPage";
import TopologyEditorPage from "./pages/TopologyEditorPage";
import TrainsPage from "./pages/TrainsPage";
import CitysPage from "./pages/CitysPage";
import CitysModerPageT from "./pages/CitysModerPageT";
import ManulModerPageT from "./pages/ManulModerPageT";
import About from "./pages/About";
import AboutProgram from "./pages/AboutProgram";
import { useEffect, useState } from "react";
import authHeader from "./services/auth-header";
import axios from "axios";
import AuthService from "./services/auth.service";
import { useNavigate } from "react-router-dom";

function App() {
  const [role, setRole] = useState();
  const navigate = useNavigate();
  

  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/aboutprogram" element={<AboutProgram />} />
      <Route path="/list-manager" element={<ListManagerPage />} />
      {role === "ADMIN" ? <Route path="/home" element={<HomeAdminPage />} /> : <Route path="/home" element={<HomeModerPage />} />}
      <Route path="/cityM" element={<CitysModerPageT />} />
      <Route path="/cityM/:name" element={<ManulModerPageT />} />
      
      <Route path="/schedule" element={<SchedulePage />} />

      <Route
        path="/schedule-editor/:id/:date/"
        element={<ScheduleEditorPage />}
      >
        <Route path=":isCreate" element={<ScheduleEditorPage />} />
      </Route>

      <Route path="/trains" element={<TrainsPage />} />
      {/* <Route path="/modelirovanie" element={<ModelirovaniePage/>}/> */}
      <Route path="/modelirovanie/:id/:date" element={<ModelirovaniePage />} />
      <Route path="/topology/:id/:name" element={<TopologyPage />} />
      <Route path="/model/:id/:name" element={<TopologyPage />} />
      <Route
        path="/create-schedule/:id/:date"
        element={<ScheduleCreatePage />}
      />
      <Route
        path="/topology-editor/:id/:name"
        element={<TopologyEditorPage />}
      />
      <Route
        path="/create-topology/:cityname"
        element={<CreateTopologyPage />}
      />
      <Route path="/city" element={<CitysPage />} />
      <Route path="/city/:name" element={<Manul />} />

      <Route path="/modeling-list" element={<ModelingListPage />} />
    </Routes>
  );
}

export default App;
