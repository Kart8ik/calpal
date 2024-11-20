import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../stylesheets/GroupCalender.css';
import NavbarTwo from './NavbarTwo';
import AllContext from '../context/AllContext';
import apiRequest from './apiRequest';

const GroupCalendar = () => {
  const { selectedGroup } = useContext(AllContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const url = "http://localhost:8080/api/groups";

  useEffect(() => {
    console.log(selectedGroup)
    if (!selectedGroup || !selectedGroup.groupTasks) {
      console.log('there is no selected group')
      return;
    }

    const formattedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    const newSelectedTasks = selectedGroup.groupTasks.filter((task) => task.date === formattedDate);
    setSelectedTasks(newSelectedTasks);
  }, [selectedDate, selectedGroup]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const isHighlighted = (date) => {
    return selectedGroup?.groupTasks?.some((task) => {
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
      const data = await apiRequest(`${url}/${selectedGroup.groupName}/title/${title}`, options);
      console.log(data);
    } catch (err) {
      console.log("error in deleting data");
    } finally {
      console.log('done');
    }
  };

  return (
    <div className="group-your-calender-container">
      <NavbarTwo />
      <div className="group-main-content">
        <div className='group-left-section'>
          <div className='group-calendar-section-heading'>Group Calendar</div>
          <div className="group-calendar-section">
            <Calendar
              tileClassName={({ date }) => isHighlighted(date) ? 'react-calendar__tile--highlighted' : null}
              onClickDay={handleDateClick} value={selectedDate}
            />
          </div>
          <div className='group-calendar-tasks-section-heading'>Group Tasks</div>
          <div className="group-calendar-tasks-section">
            <ul className="group-calendar-tasks-list">
              {selectedTasks.map((task, index) => (
                <li key={index} className="group-calendar-task-item">
                  <span className='group-calendar-tasks-firstline'>
                    <span className="group-calendar-task-title">{task.title}</span>
                    <span className="group-calendar-task-time">{task.time}</span>
                  </span>
                  <span className='group-calendar-tasks-secondline'>
                    <span className="group-calendar-task-content">{task.content}</span>
                    <button onClick={() => deleteTaskinDB(task.title)} className="group-calendar-task-complete-button">Complete</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="group-sidebar">
          <div className='group-calendar-tasks-section-heading'>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
          <div>
            <h2 className="members-title">Members</h2>
            <ul className="members-list">
              {selectedGroup.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
            <h2>Group Description</h2>
            <p>{selectedGroup.groupDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCalendar;