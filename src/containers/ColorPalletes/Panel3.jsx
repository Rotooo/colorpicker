import React, { useState, useEffect } from 'react';
import { getColorP } from '../../services/id';

export default function Panel3() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskText, setTaskText] = useState('');
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromDB = await getColorP();
      setTasks(tasksFromDB);
    };

    if (editingTask) {
        setTaskText(editingTask.name);
        setSubtasks(editingTask.color || []);
      } else {
        setTaskText('');
        setSubtasks([]);
      }

    fetchTasks();
  }, [editingTask]);

  return (
    <div className='scrolldiv'>
      {tasks.map((task) => (
        <div className='registerColor' key={task.id}>
          <p>{task.name}</p>
          {task.colors.map((subtask, index) => (
            <div className="tooltip" key={index}>
            <span className="tooltiptext">{subtask.color}</span>
            <div className='divcolor'
              style={{ 
              backgroundColor: `${subtask.color}`, 
              }} 
            />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
