import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './Components/TaskForm/TaskForm';
import TaskList from './Components/TaskList/TaskList';
import Loader from './Components/Loader/Loader';
import './App.css';

const API_URL = process.env.REACT_APP_PUBLIC_API;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); 
    axios.get(API_URL)
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const addTask = (title) => {
    axios.post(API_URL, { title })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error(error));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className='main'>
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
    
      {isLoading ? ( 
        <Loader />
      ) : ( 
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      )}
    </div>
  );
};

export default App;


