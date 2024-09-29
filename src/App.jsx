// src/App.jsx
import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MainContent from './MainContent.jsx';
import React, { useState } from 'react';

const App = () => {

  const [playerCount, setPlayerCount] = useState(0);
  return (
    <div className="App">
      <Header playerCount={playerCount}/>
      <MainContent setPlayerCount={setPlayerCount}/>
      <Footer />
    </div>
  );
};

export default App;
