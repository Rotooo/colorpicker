import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import '../assets/styles/styles.css';

export default function ColorH() {
  const { t } = useTranslation();
  var a = [];
  let objColor = JSON.parse(localStorage.getItem("colorHistory"))|| ["#ffffff"];
  a = JSON.parse(localStorage.getItem('colorHistory')) || [];
  const miArray = JSON.parse(localStorage.getItem('colorHistory'));

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
    const texto = miArray.join('\n');
    const nombreArchivo = 'historial.txt';
    descargarTxt(texto, nombreArchivo);
}

  return (
    <>
        <Grid container>
        <button className='buttonw2' onClick={descargarArchivo}>{t('saveHistory')}</button>
        {objColor.map((e) => (
          <Tooltip title={`${e}`} key={e}>
            <div 
              className="colorbutton" 
              style={{ backgroundColor: `${e}` }} 
            />
          </Tooltip>
        ))}
        </Grid>
    </>
  )
}
