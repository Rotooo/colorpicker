import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ColorPalGen from '../assets/img/muestras.png';
import CopyIcon from '../assets/img/copy.png';
import SaveIcon from '../assets/img/save.png';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';

export default function ColorPallete() {
  const { t } = useTranslation();
  const [buttonEnable, setButtonStatus] = useState(true);
  let [dcolorPallete, setColorPallete] = useState([]);

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
            <button className='iconbutton' onClick={descargarArchivo}>
              <img src={SaveIcon} alt="New Icon"/>
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
    </>
  )
}
