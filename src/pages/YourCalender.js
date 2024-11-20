import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../stylesheets/YourCalender.css';
import NavbarTwo from './NavbarTwo';
import AllContext from '../context/AllContext';
import apiRequest from './apiRequest';

const YourCalender = () => {
  const { userDetails } = useContext(AllContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const url = "http://localhost:8080/api/users";

  useEffect(() => {
    if (!userDetails || !userDetails.tasks) return;
    const formattedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    const newSelectedTasks = userDetails.tasks.filter((task) => task.date === formattedDate);
    setSelectedTasks(newSelectedTasks);
  }, [selectedDate, userDetails]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
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

  const deleteTaskinDB = async (title) => {
    const newSelectedTasks = selectedTasks.filter(task => task.title !== title);
    setSelectedTasks(newSelectedTasks);
    const options = {
      method: 'DELETE'
    };
    try {
      const data = await apiRequest(`${url}/tasks/${userDetails.username}/title/${title}`, options);
      console.log(data);
    } catch (err) {
      console.log("error in deleting data");
    } finally {
      console.log('done');
    }
  };

  return (
    <div className="your-calender-container">
      <NavbarTwo />
      <div className="main-content">
        <div className='left-section'>
          <div className='calendar-section-heading'>Your Calendar</div>
          <div className="calendar-section">
            <Calendar
              tileClassName={({ date }) => isHighlighted(date) ? 'react-calendar__tile--highlighted' : null}
              onClickDay={handleDateClick} value={selectedDate}
            />
          </div>
          <div className='calendar-tasks-section-heading'>Your Tasks</div>
          <div className="calendar-tasks-section">
            <ul className="calendar-tasks-list">
              {selectedTasks.map((task, index) => (
                <li key={index} className="calendar-task-item">
                  <span className='calendar-tasks-firstline'>
                    <span className="calendar-task-title">{task.title}</span>
                    <span className="calendar-task-time">{task.time}</span>
                  </span>
                  <span className='calendar-tasks-secondline'>
                  <span className="calendar-task-content">{task.content}</span>
                  <button onClick={() => deleteTaskinDB(task.title)} className="calendar-task-complete-button">Complete</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar">
          <div className='calendar-tasks-section-heading'>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
          <img
            src="./flower-illustration.png"
            alt="Flower Illustration"
            className="flower-illustration"
          />
          {/* <button className="your-tasks-button">Your Tasks</button> */}
        </div>
      </div>
    </div>
  );
};

export default YourCalender;
