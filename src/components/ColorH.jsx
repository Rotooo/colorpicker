import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { getHistory, deleteHistoy } from '../services/id';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '../assets/img/save.png';
import DeleteIcon from '../assets/img/delete.png';
import '../assets/styles/styles.css';

export default function ColorH() {
  const [names, setNames] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNames = async () => {
        const namesFromDB = await getHistory();
        setNames(namesFromDB);
    };

    fetchNames();
});


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
      const texto = names.map((e) => e.color);
      const nombreArchivo = 'historial.txt';
      descargarTxt(texto, nombreArchivo);
  }

const handleClearHistory = async () => {
  toast.success(`${t('historyDelete')}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  await deleteHistoy();
  const historyC = await getHistory();
  setNames(historyC);
};

  return (
    <>
        <Grid container>
        <div className='toolbar'>
          <div className="tooltip">
            <span className="tooltiptext">{t('saveHistory')}</span>
              <button className='iconbutton' onClick={descargarArchivo}>
                <img src={SaveIcon} alt="New Icon"/>
              </button>
          </div>
          <div className="tooltip">
            <span className="tooltiptext">{t('deleteHistory')}</span>
              <button className='iconbutton' onClick={handleClearHistory}>
                <img src={DeleteIcon} alt="New Icon"/>
              </button>
          </div>
        </div>
        <div className='spacing10' />
        {names.map((e) => (
          <Tooltip title={`${e.color}`} key={e.id}>
            <div 
              className="colorbutton" 
              style={{ backgroundColor: `${e.color}` }} 
            />
          </Tooltip>
        ))}
        </Grid>
    </>
  )
}
