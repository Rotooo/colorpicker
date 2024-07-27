import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ExportIcon from '../../assets/img/export.png';
import SaveIcon from '../../assets/img/save.png';
import AddIcon from '../../assets/img/add.png';
import GenColorIcon from '../../assets/img/colorpagene.png';
import ColorizedIcon from '../../assets/img/colorize.png';
import DeleteIcon from '../../assets/img/delete2.png';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { addColorP, getColorP, updateColors } from '../../services/id';

export default function Panel2() {
    const { t } = useTranslation();
    const [color, setColor] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [taskText, setTaskText] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const randomColor = getRandomHexColor();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
          const tasksFromDB = await getColorP();
          setTasks(tasksFromDB);
        };

        if (editingTask) {
            setTaskText(editingTask.name);
            setSubtasks(editingTask.subtasks || []);
          } else {
            setTaskText('');
            setSubtasks([]);
          }

        fetchTasks();
      }, [editingTask]);

      function getRandomHexColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const handleAddTask = async (task) => {
        await addColorP(task);
        const tasksFromDB = await getColorP();
        setTasks(tasksFromDB);
      };
    
      const handleUpdateTask = async (updatedTask) => {
        await updateColors(updatedTask);
        const tasksFromDB = await getColorP();
        setTasks(tasksFromDB);
        setEditingTask(null);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
          const task = { ...editingTask, name: taskText, colors: subtasks };
          if (editingTask) {
            handleUpdateTask(task);
          } else {
            handleAddTask(task);
          }
          setTaskText('');
          setSubtasks([]);
        }
      };

      const handleGetColor = async (index) => {
        let eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        const newSub = subtasks.map((subtask, i) => (i === index ? { ...subtask, color: sRGBHex } : subtask));
        setSubtasks(newSub);
        setColor(sRGBHex);
      };

      const DeleteColorP = (index) => {
          setSubtasks(subtask => subtask.filter((_, i) => i !== index));
      };

      const handleRandom = (index) => {
        const newSub = subtasks.map((subtask, i) => (i === index ? { ...subtask, color: randomColor } : subtask));
        setSubtasks(newSub);
        setColor(randomColor);
      };

      const handleAddSubtask = () => {
        setSubtasks([...subtasks, { color: '' }]);
      };
    
      const handleSubtaskChange = (index, value) => {
        const newSubtasks = subtasks.map((subtask, i) => (i === index ? { ...subtask, color: value } : subtask));
        setSubtasks(newSubtasks);
        setColor(value);
      };
      

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='toolbar'>
            <div className="tooltip">
                <span className="tooltiptext">{t('addColor')}</span>
                <button className='iconbutton' type='submit' onClick={handleAddSubtask}>
                <img src={AddIcon} alt="New Icon"/>
                </button>
            </div>
            <div className="tooltip">
            <span className="tooltiptext">{t('savePallete')}</span>
                <button className='iconbutton' type='submit' onClick={handleClickOpen}>
                <img src={SaveIcon} alt="New Icon"/>
                </button>
            </div>
        </div>
        <div className='spacing10' />
        <div className='formPallete'>
          <div className='spacing5' />
            <div className='scrolldivP'>
            {subtasks.map((subtasks, index) => (
              <div className='registerColor' key={index}>
                <div className='colorbutton' style={{ backgroundColor: `${subtasks.color || '#000'}` }} />
                  <input 
                    id={index}
                    key={index} 
                    type='text' 
                    value={subtasks.color} 
                    className='colorPText2'
                    onChange={(e) => {
                      handleSubtaskChange(index, e.target.value);
                    }}
                    placeholder={`Color ${index}`}
                />
                <div className="tooltip">
                  <span className="tooltiptext">{t('generateColor')}</span>
                  <button className='iconbutton' onClick={(e) => {handleRandom(index)}}>
                  <img src={GenColorIcon} alt="New Icon"/>
                  </button>
                </div>
                <div className="tooltip">
                  <span className="tooltiptext">{t('getColor')}</span>
                  <button className='iconbutton' onClick={(e) => {handleGetColor(index)}}>
                  <img src={ColorizedIcon} alt="New Icon"/>
                  </button>
                </div>
                <div className="tooltip">
                  <span className="tooltiptext">{t('deleteColor')}</span>
                  <button className='iconbutton' onClick={(e) => DeleteColorP(index)}>
                  <img src={DeleteIcon} alt="New Icon"/>
                  </button>
                </div>
              </div>
           ))}
           </div>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
          style: {
            backgroundColor: '#101010',
            boxShadow: 'none',
            width: '50%',
          },
        }}
      >
        <DialogTitle style={{color: '#fff'}}>{t('saveAs')}</DialogTitle>
        <DialogContent>
          <div className='spacing5' />
          <input 
            type='text' 
            className='colorPText2' 
            placeholder={t('inputPcolor')}
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <button className='buttonw' onClick={handleClose}>{t('cancel')}</button>
          <button className='buttonimport' type='submit'>{t('save')}</button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  )
}
