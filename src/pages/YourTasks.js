import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/YourTasks.css';
import apiRequest from './apiRequest';
import NavbarTwo from './NavbarTwo';
import AllContext from '../context/AllContext';

const YourTasks = () => {
  const url = "http://localhost:8080/api/users";
  const { userDetails, getUserData } = useContext(AllContext)
  const [todayTasks, setTodayTasks] = useState([]);
  const [AddTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", time: "", date: "", content: "", completed: false });
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    console.log("Effect running");
    console.log("Dependencies: ", {
      username: userDetails?.username,
      tasks: userDetails?.tasks,
      tasksLength: userDetails?.tasks?.length,
      todayDate,
    });

    const getTodaysTasks = () => {
      if (userDetails?.username) {
        console.log("Fetching user data...");
        getUserData(userDetails.username);
        if (Array.isArray(userDetails.tasks)) {
          const newTodayTasks = userDetails.tasks.filter(task => task.date === todayDate);
          setTodayTasks(newTodayTasks);
          console.log("Today's tasks: ", newTodayTasks);
        }
      }
    };

    getTodaysTasks();
  }, [userDetails.username, todayDate, userDetails.tasks?.length, getUserData]);



  const addNewTaskinDB = async (event) => {
    event.preventDefault();

    if (newTask.date === todayDate) {
      setTodayTasks(prev => [...prev, newTask])
    }
    console.log(newTask);
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    };

    try {
      const data = await apiRequest(`${url}/${userDetails.username}`, options);
      console.log(data);
    } catch (err) {
      console.log("error in posting data");
    } finally {
      setAddTask(false);
      setNewTask({ title: "", time: "", date: "", content: "", completed: false });
    }
  };

  const deleteTaskinDB = async (title) => {
    const newtodayTasks = todayTasks.filter(task => task.title !== title);
    setTodayTasks(newtodayTasks);
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

  return (
    <div className="your-tasks-container">
      <NavbarTwo />
      <div className="your-tasks-section">
        <div className="your-tasks-list">
          <div className='your-tasks-list-heading'>Your Tasks</div>
          <ul>
            {todayTasks.map((task, index) => (
              <li key={index} className="your-task-item">
                <div className="your-task-info">
                  <span className="your-task-firstline">
                  <span className="your-task-title">{task.title}</span>
                  <span className="your-task-time">{task.time}</span>
                  </span>
                  <span className="your-task-content">{task.content}</span>
                </div>
                <button onClick={() => deleteTaskinDB(task.title)} className="your-task-complete-button">Complete</button>
              </li>
            ))}
          </ul>

          <button onClick={() => setAddTask(prev => !prev)} className="add-task-button">Add Task</button>
          {AddTask && (
            <form onSubmit={addNewTaskinDB} className="add-task-form">
              <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={updateNewTask} required />
              <input type="time" name="time" placeholder="Time" value={newTask.time} onChange={updateNewTask} required />
              <input type="date" name="date" placeholder="Date" value={newTask.date} onChange={updateNewTask} required />
              <input type="text" name="content" placeholder="Content" value={newTask.content} onChange={updateNewTask} required />
              <button type="submit">Add</button>
            </form>
          )}
        </div>
        <div className="date-section">
          <div className='date-section-heading'>{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
          <img src='/flower.png' alt="Flower Illustration" className="flower-illustration" />
          <div><Link to="/yourcalendar" className="calendar-link">View Calendar</Link></div>
        </div>
      </div>
    </div>
  );
};

export default YourTasks;
