
import './App.css';
import Nevbar from './Component/Nevbar';
import propstypes from 'prop-types';
import TextForm from './Component/TextForm';
import React, {useState} from 'react';
import About from './Component/About';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); // 'light' or 'dark'
  const togleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='#2b4062'; // dark mode background
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white'; // light mode background
    }
  }
  return (
    
    <>
     <BrowserRouter>
    <Nevbar title="Nevbar" home="Home" about="About" mode={mode} togleMode={togleMode}/>
    <div className="container my-2">
    {/* <TextForm  heading="Please enter your text" mode={mode}/> */}
    </div>
   
    <Routes>
      
      <Route exact path="/" element={<TextForm  heading="Please enter your text"/>}/>
       <Route exact path="/about" element={<About/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

Nevbar.propstypes = {
  title: propstypes.string  
};
Nevbar.defaultProps = {
  title: "set your title here"};
export default App;
