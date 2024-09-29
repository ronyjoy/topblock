// src/App.jsx
import React from 'react';
import './App.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MainContent from './MainContent.jsx';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;
