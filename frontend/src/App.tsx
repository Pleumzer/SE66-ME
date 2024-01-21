import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutAnimalCreate from "./layout/animal/create";
import LayoutAnimalEdit from "./layout/animal/edit";
import LayoutAnimalInfo from "./layout/animal/dashboard";
import LayoutAbnormalCreate from "./layout/abnormal/create";
import LayoutAbnormalReport from "./layout/abnormal/dashboard";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/DashboardAnimal" element={<LayoutAnimalInfo />} />
        <Route path="/CreateAnimal" element={<LayoutAnimalCreate />} />
        <Route path="/DashboardAnimal/AnimalEdit/:id" element={<LayoutAnimalEdit />} />
        <Route path="/DashboardAbnormal" element={<LayoutAbnormalReport />} />
        <Route path="/CreateAbnormalReport" element={<LayoutAbnormalCreate />} />
      </Routes>
    </Router>
  );
};

export default App;