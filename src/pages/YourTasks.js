import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import './stylesheets/YourTasks.css'
import apiRequest from './apiRequest';

const YourTasks = () => {
  const url = "http://localhost:4000/users/2d50"
  const [todayTasks, setTodayTasks] = useState([]);
  const [AddTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", time: "", date: "", content: "", completed: false });
  // const todayDate = new Date().toISOString().slice(0, 10);

  useEffect(()=>{
    const getTodaysTasks= async ()=>{
      try{
      const result = await fetch(url)
      const data = await result.json()
      setTodayTasks(data.tasks)
      console.log(data)
      } catch(err){
        console.log("error in loading api data")
      }
    }

    getTodaysTasks()
  },[])

  const addNewTaskinDB = async () => {
    setNewTask({ ...newTask, date: new Date().toISOString().slice(0, 10) });
    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    }

    try{
      const data = await apiRequest(url,options)
      console.log(data)
    } catch(err){
      console.log("error in posting data")
    } finally{
      setAddTask(false)
      setNewTask({ title: "", time: "", date: "", content: "", completed: false })
    }
  }

  const updateNewTask = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setNewTask((prev) => ({ ...prev, title: value }));
        break;
      case "time":
        setNewTask((prev) => ({ ...prev, time: value }));
        break;
      case "content":
        setNewTask((prev) => ({ ...prev, content: value }));
        break;
      default:
        break;
    }
  }


  return (
    <div>
      <div id="TasksHeading">Your Tasks</div>
      <ul id="todayTasks">
        {todayTasks.map((task, index) => (
          <li key={index}>
            <div className="task-title">{task.title}</div>
            <div className="task-time">{task.time}</div>
            <div className="task-content">{task.content}</div>
          </li>
        ))}
      </ul>
        <button onClick={() => setAddTask(prev => !(prev))}>Add Task</button>
      {AddTask && (
        <form onSubmit={addNewTaskinDB} >
          <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={(e) => updateNewTask(e)}/>
          <input type="time" name="time" placeholder="Time" value={newTask.time} onChange={(e) => updateNewTask(e)}/>
          <input type="text" name="content" placeholder="Content" value={newTask.content} onChange={(e) => updateNewTask(e)}/>
          <button type='submit'>Add</button>
        </form>
)}
      
      <div id="DateHeading">{new Date().toLocaleDateString('en-US', {weekday: 'long',day: 'numeric',month: 'short'})}</div>
      <div>
        <Link to="/yourcalendar" className="link-style">View Calendar</Link>
      </div>
    </div>
  )
}

export default YourTasks
