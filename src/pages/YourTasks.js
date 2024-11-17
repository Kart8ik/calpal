import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import './stylesheets/YourTasks.css';
import apiRequest from './apiRequest';
import AllContext from '../context/AllContext';

const YourTasks = () => {
  const url = "http://localhost:8080/api/users";
  const { userDetails,getUserData }=useContext(AllContext)
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

    if(newTask.date===todayDate){
      setTodayTasks(prev => [...prev,newTask])
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
    <div>
      <div id="TasksHeading">Your Tasks</div>
      <ul id="todayTasks">
        {todayTasks.map((task, index) => (
          <li key={index}>
            <div className="task-title">{task.title}</div>
            <div className="task-time">{task.time}</div>
            <div className="task-content">{task.content}</div>
            <button onClick={() => deleteTaskinDB(task.title)}>delete Task</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setAddTask(prev => !(prev))}>Add Task</button>
      {AddTask && (
        <form onSubmit={addNewTaskinDB}>
          <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={(e) => updateNewTask(e)} required/>
          <input type="time" name="time" placeholder="Time" value={newTask.time} onChange={(e) => updateNewTask(e)} required/>
          <input type="date" name="date" placeholder="Date" value={newTask.date} onChange={(e) => updateNewTask(e)} required/>
          <input type="text" name="content" placeholder="Content" value={newTask.content} onChange={(e) => updateNewTask(e)} required/>
          <button type='submit'>Add</button>
        </form>
      )}

      <div id="DateHeading">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
      <div>
        <Link to="/yourcalendar" className="link-style">View Calendar</Link>
      </div>
    </div>
  );
};

export default YourTasks;
