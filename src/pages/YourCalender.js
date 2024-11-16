import React,{useState} from 'react'
import Calendar from 'react-calendar';
import './stylesheets/YourCalender.css';
import 'react-calendar/dist/Calendar.css';
import NavbarTwo from './NavbarTwo';

const YourCalender = () => {
  const highlightedDates = [
    new Date(2024, 10, 13), // November 13, 2024
    new Date(2024, 10, 20), // November 20, 2024
    new Date(2024, 10, 25),  // November 25, 2024
    new Date(2024, 11, 13), // December 13, 2024
    new Date(2024, 11, 18), // December 18, 2024
    new Date(2024, 11, 25), // December 25, 2024

  ];

  // Function to check if a date is in the highlighted dates
  const isHighlighted = (date) => {
    return highlightedDates.some(
      (highlightedDate) =>
        date.getFullYear() === highlightedDate.getFullYear() &&
        date.getMonth() === highlightedDate.getMonth() &&
        date.getDate() === highlightedDate.getDate()
    );
  };
  return (
    <div className="YourCalender">
    <NavbarTwo />
    <main>
      <div className="calendar-container">
      <Calendar
        tileClassName={({ date, view }) =>
          // Add class to day tiles only (not month/year tiles)
          view === 'month' && isHighlighted(date) ? 'highlighted' : null
        }
      />
      </div>
      <div className="sidebar">
        <button className="home-button">Home</button>
      </div>
    </main>
  </div>
  )
}

export default YourCalender
