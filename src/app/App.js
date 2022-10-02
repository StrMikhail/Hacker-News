import Header from "./components/Header";
import MainField from "./components/MainField";
import { Routes, Route } from "react-router-dom";
import Story from "./components/Story";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <MainField/> }/>
        <Route path="/:storyId" element={ <Story/> }/>    
      </Routes>
    </div>
  );
}

export default App;
