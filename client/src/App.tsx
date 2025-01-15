import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { FormPage } from "./views/FormPage";
import ClassPage from "./views/ClassPage";
import Navbar from "./components/navbar/navbar";

const App: React.FC<any> = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/class" element={<ClassPage />} />
      </Routes>
    </div>
  );
};

export default App;
