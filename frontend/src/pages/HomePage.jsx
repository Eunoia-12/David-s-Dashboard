import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id="home-page">
      <div className="home-box">
        <header className="navbar">
          <nav>
            <ul>
              <li><Link to=" ">About</Link></li>
              <li><Link to=" ">Contact</Link></li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Home;
