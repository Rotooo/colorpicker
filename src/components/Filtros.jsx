import React, {useContext} from 'react';
import { ColorContext } from '../context/Color';
import { useTranslation } from 'react-i18next';
import Slider from '@mui/material/Slider';

export default function Filtros() {
    const example = useContext(ColorContext);
    const { t } = useTranslation();

    const clearFilters = () => {
        example.setBrightness(100);
        example.setContrastValue(100);
        example.setOpacity(100);
        example.setSaturate(100);
        example.setGrayscale(0);
        example.setInvert(0);
        example.setHue(0);
        example.setSepia(0);
    };

  return (
    <div className='tabone'>
        <button className='buttonw2' onClick={clearFilters}>
            {t('clearfilters')}
        </button>
        <div className='spacing10' />
        <label>{t('brightness')}</label>
        <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => example.setBrightness(e.target.value)}
        value={example.brightness}
        sx={{color: `${example.color}`}}
        max={500}
        min={10}
      />
      <label>{t('contrast')}</label>
        <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => example.setContrastValue(e.target.value)}
        value={example.contrastValue}
        sx={{color: `${example.color}`}}
        max={500}
        min={10}
      />
      <label>{t('saturate')}</label>
        <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => example.setSaturate(e.target.value)}
        value={example.saturate}
        sx={{color: `${example.color}`}}
        max={500}
      />
      <label>HUE</label>
        <Slider
        aria-label="Default"
        onChange={(e) => example.setHue(e.target.value)}
        value={example.hue}
        sx={{color: `${example.color}`}}
        max={360}
      />
      <label>{t('invertColor')}</label>
        <Slider
        aria-label="Default"
        onChange={(e) => example.setInvert(e.target.value)}
        value={example.invert}
        sx={{color: `${example.color}`}}
      />
      <label>{t('grayscale')}</label>
        <Slider
        aria-label="Default"
        onChange={(e) => example.setGrayscale(e.target.value)}
        value={example.grayscale}
        sx={{color: `${example.color}`}}
      />
      <label>Sepia</label>
        <Slider
        aria-label="Default"
        onChange={(e) => example.setSepia(e.target.value)}
        value={example.sepia}
        sx={{color: `${example.color}`}}
      />
       <label>{t('opacity')}</label>
        <Slider
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={(e) => example.setOpacity(e.target.value)}
        value={example.opacity}
        sx={{color: `${example.color}`}}
      />
    </div>
  )
}
