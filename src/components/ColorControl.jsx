import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ColorContext } from '../context/Color';
import ColorContrast from './ColorContrast';
import SaveColor from '../containers/SaveColor/SaveColor';
import hexToCMYK from '../services/hextocmyk';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';

export default function ColorControl() {
  const example = useContext(ColorContext);
  const { t } = useTranslation();
  var hexToHsl = require('hex-to-hsl');
  const randomColor = getRandomHexColor();

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(example.color);
    toast(`${t('colorCopied')}: ${example.color}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const hexToRGB = hex => 
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
  const colorRGB = hexToRGB(example.color);
  const colorCMYK = hexToCMYK(example.color);
  const colorHSL = hexToHsl(example.color);
  
  function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  const handleRandom = () => {
    example.setColor(randomColor);
  };
  
  return (
    <div className='tabone'>
      <Box sx={{ flexGrow: 1 }}>
        <div
          id="FilColor" 
          style={{ 
            background: `${example.color}`, 
            borderRadius: 10,
            width: '100%', 
            height: 100,
            border: '1px solid rgba(0, 0, 0, 0.2)', 
          }} 
          onClick={handleCopyColor}
        />
        <br />
        <button className='buttonw' onClick={handleRandom}>{t('generateColor')}</button>
        <SaveColor />
        <div className='gridColmun'>
          <div className='gC1'>
            <label>HEX: </label>
              <input 
                type='text' 
                className='colorText' 
                value={example.color} 
                readOnly 
                placeholder='HEX Code' 
              />
          </div>
          <div className='gC1'>
            <label>RGB: </label>
              <input 
                type='text' 
                className='colorText' 
                value={colorRGB}
                readOnly 
                placeholder='RGB Code'
              />
          </div>
        </div>
        <div className='gridColmun'>
          <div className='gC1'>
            <label>HSL: </label>
              <input 
                type='text' 
                className='colorText' 
                value={colorHSL}
                readOnly 
                placeholder='HSL Code'
              />
          </div>
          <div className='gC1'>
            <label>CMYK: </label>
              <input 
                type='text' 
                className='colorText' 
                value={colorCMYK}
                readOnly 
                placeholder='CMYK Code'
              />
          </div>
        </div>
        <br />
        <ColorContrast />
      </Box>
    </div>
  )
}
