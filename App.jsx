import React, { useState, useEffect } from 'react';
import M from 'materialize-css'; // Import Materialize JS
import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS

function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('');
  const [tasks, setTasks] = useState([]);

  // Loading tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Saving tasks to localStorage when they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Materialize JS Initialization for Date and Time Pickers
  useEffect(() => {
    const elemsDate = document.querySelectorAll('.datepicker');
    const dateInstances = M.Datepicker.init(elemsDate, {
      autoClose: true,
      onSelect: (date) => {
        setDueDate(date);
      }
    });

    const elemsTime = document.querySelectorAll('.timepicker');
    const timeInstances = M.Timepicker.init(elemsTime, {
      twelveHour: false,
      autoClose: true,
      onSelect: (time) => {
        setDueTime(time);
      }
    });
  }, []);

  // Adding a New Task
  const addTask = () => {
    if (!taskTitle || !description || !dueDate || !dueTime || !priority) {
      M.toast({ html: 'Please fill out all fields' });
      return;
    }
    const newTask = {
      title: taskTitle,
      description,
      dueDate: `${dueDate} ${dueTime}`, // Correct template string with proper variable reference
      priority,
      completed: false,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setPriority('');
  };

  // Marking Task as Complete
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Deleting a Task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h4 className="center-align">Todo App</h4>

      {/* Task Creation Form */}
      <div className="row">
        {/* Task Title Input */}
        <div className="input-field col s12">
          <input
            id="task_title"
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <label htmlFor="task_title">Task Title</label>
        </div>

        {/* Description Input */}
        <div className="input-field col s12">
          <textarea
            id="description"
            className="materialize-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        </div>

        {/* Due Date and Time Picker */}
        <div className="input-field col s12 m6">
          <input
            id="due_date"
            type="text"
            className="datepicker"
            value={dueDate}
            readOnly
          />
          <label htmlFor="due_date">Due Date</label>
        </div>

        <div className="input-field col s12 m6">
          <input
            id="due_time"
            type="text"
            className="timepicker"
            value={dueTime}
            readOnly
          />
          <label htmlFor="due_time">Due Time</label>
        </div>

        {/* Priority Selector */}
        <div className="input-field col s12 m6">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="browser-default"
          >
            <option value="" disabled>Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="col s12">
          <button
            className="btn waves-effect waves-light"
            type="button"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List */}
      <h5 className="center-align">Tasks</h5>
      <ul className="collection">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`collection-item ${task.completed ? 'completed' : ''}`}
          >
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Due: {task.dueDate} | Priority: {task.priority}</p>

              <span
                className={`new badge ${task.completed ? 'green' : 'blue'}`}
                data-badge-caption={task.completed ? 'Completed' : 'Incomplete'}
              />

              <a
                href="#!"
                className="secondary-content"
                onClick={() => toggleComplete(task.id)}
              >
                <i className="material-icons">
                  {task.completed ? 'undo' : 'check_circle'}
                </i>
              </a>

              <a
                href="#!"
                className="secondary-content"
                onClick={() => deleteTask(task.id)}
              >
                <i className="material-icons">delete</i>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
