import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
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

  const handleClick = () => {
    //const colorpallete = genColorHexRandom(5);
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
    <div>
      <button className='buttonw2' onClick={handleClick}>{t('gPallete')}</button>
      <div className='spacing10' />
      <button 
        className='buttonw2' 
        onClick={handleCopyCPallete}
        disabled={buttonEnable}
      >
        {t('copyPallete')}
      </button>
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
    </div>
  )
}
