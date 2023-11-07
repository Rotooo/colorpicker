import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ColorContext } from '../context/Color';
import ColorContrast from './ColorContrast';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';

function hexToCMYK (hex) {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;
 
  hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;
 
  if (hex.length != 6) {
   alert ('Invalid length of the input hex value!');   
   return; 
  }
  if (/[0-9a-f]{6}/i.test(hex) != true) {
   alert ('Invalid digits in the input hex value!');
   return; 
  }
 
  var r = parseInt(hex.substring(0,2),16); 
  var g = parseInt(hex.substring(2,4),16); 
  var b = parseInt(hex.substring(4,6),16); 
 
  // BLACK
  if (r==0 && g==0 && b==0) {
   computedK = 1;
   return [0,0,0,1];
  }
 
  computedC = 1 - (r/255);
  computedM = 1 - (g/255);
  computedY = 1 - (b/255);
 
  var minCMY = Math.min(computedC,Math.min(computedM,computedY));
 
  computedC = (computedC - minCMY) / (1 - minCMY) ;
  computedM = (computedM - minCMY) / (1 - minCMY) ;
  computedY = (computedY - minCMY) / (1 - minCMY) ;
  computedK = minCMY;
 
  return [
    computedC.toFixed(2)* 100 + '% ',
    computedM.toFixed(2)* 100 + '% ',
    computedY.toFixed(2)* 100 + '% ',
    computedK.toFixed(2)* 100 + '% ',
  ];
}

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
