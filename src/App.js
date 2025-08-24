
import './App.css';
import Nevbar from './Component/Nevbar';
import propstypes from 'prop-types';
import TextForm from './Component/TextForm';
import React, {useState} from 'react';
import About from './Component/About';
import Test from './Component/Test';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Game from './Component/Game';
import SnakeGame from './Component/SnackGame';

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
    <Nevbar title="Nevbar" home="Home" about="About" test="Test" game="Game" snakeGame="SnakeGame" mode={mode} togleMode={togleMode}/>
    <div className="container my-2">
    {/* <TextForm  heading="Please enter your text" mode={mode}/> */}
    </div>
   
    <Routes>
      
      <Route exact path="/" element={<TextForm  heading="Please enter your text"/>}/>
       <Route exact path="/about" element={<About/>}/>
        <Route exact path="/test" element={<Test/>}/>
         <Route exact path="/game" element={<Game/>}/>
         <Route exact path="/snakeGame" element={<SnakeGame/>}/>
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
