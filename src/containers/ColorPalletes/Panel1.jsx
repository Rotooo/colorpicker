import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ColorPalGen from '../../assets/img/muestras.png';
import CopyIcon from '../../assets/img/copy.png';
import SaveIcon from '../../assets/img/save.png';
import ExportIcon from '../../assets/img/export.png';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { addColorP, getColorP, updateColors } from '../../services/id';
//import NewColors from '../containers/NewColors';
import 'react-toastify/dist/ReactToastify.css';

export default function ColorPallete() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskText, setTaskText] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [buttonEnable, setButtonStatus] = useState(true);
  let [dcolorPallete, setColorPallete] = useState([]);

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
      const task = { ...editingTask, name: taskText, colors: {dcolorPallete} };
      if (editingTask) {
        handleUpdateTask(task);
      } else {
        handleAddTask(task);
      }
      setTaskText('');
      setSubtasks([]);
    }
    setOpen(false);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { color: '' }]);
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = subtasks.map((subtask, i) => (i === index ? { ...subtask, color: value } : subtask));
    setSubtasks(newSubtasks);
    setColor(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function genColorHexAl() {
    const hexchar = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexchar[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function genColorHexRandom(cantidad) {
    const colores = [];
    for (let i = 0; i < cantidad; i++) {
      colores.push(genColorHexAl());
    }
    return colores;
  }

  function descargarTxt(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function descargarArchivo() {
    const textt = dcolorPallete.join('\n');
    const nombreArchivo = 'ColorPallete.txt';
    descargarTxt(textt, nombreArchivo);
}

  const handleClick = () => {
    setColorPallete(genColorHexRandom(5));
    setButtonStatus(false);
  };


  const handleCopyCPallete = async () => {
    await navigator.clipboard.writeText(dcolorPallete);
    toast(`${t('copiedColors')}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className='toolbar'>
        <div className="tooltip">
          <span className="tooltiptext">{t('gPallete')}</span>
            <button className='iconbutton' onClick={handleClick}>
              <img src={ColorPalGen} alt="New Icon"/>
            </button>
        </div>
        <div className="tooltip">
          <span className="tooltiptext">{t('copyColors')}</span>
            <button className='iconbutton' disabled={buttonEnable} onClick={handleCopyCPallete}>
              <img src={CopyIcon} alt="New Icon"/>
            </button>
        </div>
        <div className="tooltip">
          <span className="tooltiptext">{t('saveColors')}</span>
            <button className='iconbutton' onClick={handleClickOpen}>
              <img src={SaveIcon} alt="New Icon"/>
            </button>
        </div>
        <div className="tooltip">
          <span className="tooltiptext">{t('export')}</span>
            <button className='iconbutton' onClick={descargarArchivo}>
              <img src={ExportIcon} alt="New Icon"/>
            </button>
        </div>
      </div>
      <div className='spacing10' />
      {dcolorPallete.map((e) => (
        <div key={e}>
        <input
          type="text" 
          className='intcolor'
          style={{backgroundColor: `${e}`}} 
          value={e}
          readOnly
        />
        </div>
      ))}
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
          <button className='buttonimport' type='submit' onClick={handleSubmit}>{t('save')}</button>
        </DialogActions>
      </Dialog>
    </>
  )
}
