import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../stylesheets/YourCalender.css';
import 'react-calendar/dist/Calendar.css';
import NavbarTwo from './NavbarTwo';
import AllContext from '../context/AllContext';

const YourCalender = () => {
  const { userDetails } = useContext(AllContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!userDetails || !userDetails.tasks) return;
    const formattedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const newSelectedTasks = userDetails.tasks.filter((task) => task.date === formattedDate);
    setSelectedTasks(newSelectedTasks);
    console.log(newSelectedTasks)
  }, [selectedDate, userDetails]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    const newSelectedTasks = userDetails?.tasks?.filter((task) => task.date === formattedDate) || [];
    setSelectedTasks(newSelectedTasks);
    console.log("Clicked Date:", formattedDate);
  };

  const isHighlighted = (date) => {
    return userDetails?.tasks?.some((task) => {
      const taskDate = new Date(task.date);
      return (
        date.getFullYear() === taskDate.getFullYear() &&
        date.getMonth() === taskDate.getMonth() &&
        date.getDate() === taskDate.getDate()
      );
    });
  };

  return (
    <div className="YourCalender">
      <NavbarTwo />
      <main>
        <div className="calendar-container">
          <Calendar
            tileClassName={({ date, view }) =>
              view === 'month' && isHighlighted(date) ? 'highlighted' : null
            }
            onClickDay={handleDateClick}
            value={selectedDate}
          />
        </div>
        <div className="tasks-list">
          <h2>Tasks for {selectedDate.toDateString()}</h2>
          {/* <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>{task.title}</li>
            ))}
          </ul> */}
          <ul id="selected-Task-list">
        {selectedTasks.map((task, index) => (
          <li key={index}>
            <div className="task-title">{task.title}</div>
            <div className="task-time">{task.time}</div>
            <div className="task-content">{task.content}</div>
          </li>
        ))}
      </ul>
        </div>
        <div className="sidebar">
          <button className="home-button">Home</button>
        </div>
      </main>
    </div>
  );
};

export default YourCalender;
