import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../stylesheets/GroupCalender.css';
import NavbarTwo from './NavbarTwo';
import AllContext from '../context/AllContext';
import apiRequest from './apiRequest';

const GroupCalendar = () => {
  const { selectedGroup, getGroup, setSelectedGroup } = useContext(AllContext);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [AddTask, setAddTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: "", time: "", date: "", content: "", completed: false });
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
  }, [selectedDate, selectedGroup, getGroup, AddTask, deleteTask]);

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


  const updateNewTask = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setNewTask((prev) => ({ ...prev, title: value }));
        break;
      case "time":
        setNewTask((prev) => ({ ...prev, time: value }));
        break;
      case "date":
        setNewTask((prev) => ({ ...prev, date: value }));
        break;
      case "content":
        setNewTask((prev) => ({ ...prev, content: value }));
        break;
      default:
        break;
    }
  };

  const addNewTaskinDB = async (event) => {
      event.preventDefault();
      setSelectedTasks(prev => [...prev, newTask])
  
      console.log(newTask);
      const options = {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask)
      };
  
      try {
        const data = await apiRequest(`${url}/${selectedGroup.groupName}`, options);
        const updatedGroup = await getGroup(selectedGroup.groupName)
        console.log(`updatedGroup:${updatedGroup}`)
        setSelectedGroup(updatedGroup)
        console.log(data);
      } catch (err) {
        console.log("error in posting data");
      } finally {
        setAddTask(false);
        setNewTask({ title: "", time: "", date: "", content: "", completed: false });
      }
    };
  
    const deleteTaskinDB = async (title) => {
      setDeleteTask(prev => !(prev))
      const newSelectedTasks = selectedTasks.filter(task => task.title !== title);
      setSelectedTasks(newSelectedTasks);
      const options = {
        method: 'DELETE'
      };
      try {
        const data = await apiRequest(`${url}/${selectedGroup.groupName}/title/${title}`, options);
        const updatedGroup = await getGroup(selectedGroup.groupName)
        console.log(`updatedGroup:${updatedGroup}`)
        setSelectedGroup(updatedGroup)
        console.log(data);
      } catch (err) {
        console.log("error in deleting data");
      } finally {
        console.log('done');
        setDeleteTask(prev => !(prev))
      }
    };

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
  }, [selectedDate, selectedGroup, getGroup, AddTask, deleteTaskinDB]);

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
            <button onClick={() => setAddTask(prev => !prev)} className="add-task-button">Add Task</button>
            {AddTask && (
              <form onSubmit={addNewTaskinDB} className="add-task-form">
                <div className='form-add-task'>
                  <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={updateNewTask} required />
                  <input type="time" name="time" placeholder="Time" value={newTask.time} onChange={updateNewTask} required />
                  <input type="date" name="date" placeholder="Date" value={newTask.date} onChange={updateNewTask} required />
                  <input type="text" name="content" placeholder="Content" value={newTask.content} onChange={updateNewTask} required />
                  <button type="submit">Add</button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="group-sidebar">
          <div className='group-calendar-tasks-section-heading'>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
          <div>
            <h2 className="members-title">Members</h2>
            <ul className="members-list">
              {selectedGroup?.members?.map((member, index) => (
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