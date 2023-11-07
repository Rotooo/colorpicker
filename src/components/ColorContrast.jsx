import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { ColorContext } from '../context/Color';
import '../assets/styles/styles.css';

export default function ColorContrast() {
  const example = useContext(ColorContext);
  const { t } = useTranslation();
  return (
    <>
        <label>{t('colortoWhite')}:</label>
        <div id='colorbar' style={{ background: `linear-gradient(0.25turn, ${example.color}, #ffffff)` }} />
        <div className='spacing10' />
        <label>{t('colortoBlack')}:</label>
        <div id='colorbar2' style={{ background: `linear-gradient(0.25turn, ${example.color}, #000000)` }} />
        <div className='spacing10' />
        <label>{t('colortoRed')}:</label>
        <div id='colorbar2' style={{ background: `linear-gradient(0.25turn, ${example.color}, #FF0000)` }} />
        <div className='spacing10' />
        <label>{t('colortoGreen')}:</label>
        <div id='colorbar2' style={{ background: `linear-gradient(0.25turn, ${example.color}, #00FF00)` }} />
        <div className='spacing10' />
        <label>{t('colortoBlue')}:</label>
        <div id='colorbar2' style={{ background: `linear-gradient(0.25turn, ${example.color}, #0000FF)` }} />
    </>
  )
}
