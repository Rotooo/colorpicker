import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/styles/styles.css';

export default function ColorSearch() {
  const { t } = useTranslation();
  const [scolor, setSColor] = useState('');

  const handleColorChange = (e) => {
    const inputColor = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputColor)) {
      setSColor(inputColor);
    } else {
      setSColor('');
    }
  };

  const handleCopyColor = async () => {
    await navigator.clipboard.writeText(scolor);
    toast(`${t('colorCopied')}: ${scolor}`, {
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
      <input 
        type="text"
        className='colorText' 
        onChange={handleColorChange} 
        placeholder={`${t('wColorHex')}`}
      />
      <div className='spacing10' />
      <div
          id="FilColor" 
          style={{ 
            background: `${scolor}`, 
            borderRadius: 10,
            width: '100%', 
            height: 100,
            border: '2px solid rgba(50, 50, 50, 0.5)', 
          }}
          onClick={handleCopyColor} 
        />
    </>
  )
}
