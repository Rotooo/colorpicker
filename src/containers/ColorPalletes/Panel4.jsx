import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExportIcon from '../../assets/img/export.png';
import DeleteIcon from '../../assets/img/delete2.png';
import CopuIcon from '../../assets/img/copy.png';
import { getColorP, deleteColorP } from '../../services/id';
import 'react-toastify/dist/ReactToastify.css';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #181818`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#131313',
  color: '#fff',
  height: '20px',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: '#181818',
  color: '#fff',
}));

export default function CustomizedAccordions() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState();
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handledeleteColorP = async (id) => {
    await deleteColorP(id);
    const tasksFromDB = await getColorP();
    setTasks(tasksFromDB);
  };

  const handleCopyCPallete = async (items) => {
    await navigator.clipboard.writeText(items);
    toast(`Colores Copiados`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  function getcopy(item) {
    return [item.color];
  }

  return (
    <div className='scrolldiv'>
      {tasks.map((task) => (
      <Accordion key={task.id} onChange={handleChange(task.name)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <div className='gridColmun'>
          <div className='acorTitle'>
            <p>{task.name}</p>
          </div>
          <div className='divoptions'>
          <div className="tooltip">
              <span className="tooltiptext">{t('copiedColors')}</span>
              <button className='iconbutton' onClick={() => handleCopyCPallete(task.colors.map(getcopy))}>
                <img src={CopuIcon} alt="New Icon"/>
              </button>
            </div>
            {/*<div className="tooltip">
              <span className="tooltiptext">Exportar</span>
              <button className='iconbutton'>
                <img src={ExportIcon} alt="New Icon"/>
              </button>
            </div>*/}
            <div className="tooltip">
              <span className="tooltiptext">{t('deletePallete')}</span>
              <button className='iconbutton' onClick={() => handledeleteColorP(task.id)}>
                <img src={DeleteIcon} alt="New Icon"/>
              </button>
            </div>
          </div>
        </div>
        </AccordionSummary>

        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}
