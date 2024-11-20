import React from 'react';
import NavbarOne from './NavbarOne';
import CalendarImage from '../stylesheets/Calendar-rafiki.png';
import CollabImage from '../stylesheets/Collab-amico.png';
import AnalyticsImage from '../stylesheets/Game analytics-pana.png';
import '../stylesheets/FrontPage.css'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate()

  const registerNav = () => {
    navigate('/register')
  }
  return (
    <div>
      <NavbarOne />
      <div className="front-page">
        <header className="intro-section">
          <h1>Welcome to CalPal</h1>
          <p>Organize your tasks and track your progress effortlessly!</p>
          <button className="cta-button" onClick={registerNav}>Get Started</button>
        </header>

        <section className="feature-section">
          <div className="feature">
            <img src={CalendarImage} alt="Calendar" className="feature-image" />
            <h2>Easy Task Management</h2>
            <p>One place to track all your tasks, always stay on schedule and on point</p>
          </div>
          <div className="feature">
            <img src={CollabImage} alt="Collaboration" className="feature-image" />
            <h2>Collaborate Seamlessly</h2>
            <p>Add your friends and Join groups where you can reach your true potential.</p>
          </div>
          <div className="feature">
            <img src={AnalyticsImage} alt="Analytics" className="feature-image" />
            <h2>Track Your Growth</h2>
            <p>Earn points and watch your virtual plant flourish as you complete tasks.</p>
          </div>
        </section>

        <footer className="footer">
          <p>© 2024 CalPal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default FrontPage;
