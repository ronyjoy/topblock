// src/Header.jsx
import React from 'react';
import './Header.css'

const Header = ({ playerCount }) => {
  return (
    <header className="App-header">
      <h1>League Sign Up Sheet</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">Draw</a>
        <a href="/contact">Results</a>
      </nav>
      {/* Display the player count */}
      <div className="player-count">
        Players Signed Up: {playerCount}
      </div>
    </header>
  );
};

export default Header;
