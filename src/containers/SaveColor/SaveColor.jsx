import React, {useContext, useState, useRef} from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import html2canvas from 'html2canvas';
import { ColorSVG } from '../../components/ColorSVG';
import { useTranslation } from 'react-i18next';
import { ColorContext } from '../../context/Color';
import hexToCMYK from '../../services/hextocmyk';
import Grid from '@mui/material/Grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = useState(false);
  const [colorName, setColorName] = useState('Color');
  const company = `©Black Shark Studios ${new Date().getFullYear()}`;
  const divRef = useRef(null);
  const { t } = useTranslation();
  const example = useContext(ColorContext);
  var hexToHsl = require('hex-to-hsl');
  const colorHSL = hexToHsl(example.color);
  const colorCMYK = hexToCMYK(example.color);

  const hexToRGB = hex => 
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
  const colorRGB = hexToRGB(example.color);

  const cssContent = `
  /*${colorName} - ${company}*/
    .colorpicker{
      color: ${example.color};
      color: rgb(${colorRGB});
      color: hsl(${colorHSL});
    }
  `;

  const handleClickOpen = () => {
    setOpen(true);
    setColorName('Color');
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleColorImage = (e) => {
    const eTarget = e.target.value;
    if(eTarget === ''){
      setColorName('Color');
    } else {
      setColorName(e.target.value);
    }
  };

  const handleExportImg = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = `${colorName}.png`;
      link.click();
    }
  };

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
      const nombreArchivo = `${colorName}.css`;
      descargarTxt(cssContent, nombreArchivo);
  }

  return (
    <React.Fragment>
      <button className='buttonw' onClick={handleClickOpen}>
        {t('saveColor')}
      </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='md'
        PaperProps={{
            style: {
              backgroundColor: '#101010',
              color: '#fff',
              boxShadow: 'none',
              width: '50%',
            },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          💾 {t('saveColor')}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogActions>  
              <input 
                type='text' 
                className='colorText' 
                placeholder={t('writeName')}
                onChange={handleColorImage}
              />
              <button 
                className='buttonw'  
                onClick={handleExportImg}
              >
                {t('exportIMG')}
              </button>
              <button 
                className='buttonw'
                onClick={descargarArchivo}
              >
                {t('exportCSS')}
              </button>
          </DialogActions>
        <DialogContent dividers>
          <div ref={divRef} style={{ border: '5px solid #101010', backgroundColor: '#101010', fontWeight: 'bold' }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                    <center>
                      <div className='colorquad'>
                        <ColorSVG color={example.color} width='150px' height='150px' />
                      </div>
                    </center>
                </Grid>
                <Grid item xs={6} md={8}>
                  <p className='titleName'>{colorName}</p>
                    <label>HEX:</label>
                    <input 
                        type='text' 
                        className='colorText' 
                        value={example.color} 
                        readOnly 
                        placeholder='HEX Code' 
                    />
                    <div className='spacing10' />
                    <label>RGB: </label>
                    <input 
                        type='text' 
                        className='colorText' 
                        value={colorRGB}
                        readOnly 
                        placeholder='RGB Code'
                    />
                    <div className='spacing10' />
                    <label>HSL: </label>
                    <input 
                        type='text' 
                        className='colorText' 
                        value={colorHSL}
                        readOnly 
                        placeholder='HSL Code'
                    />
                    <div className='spacing10' />
                    <label>CMYK: </label>
                    <input 
                        type='text' 
                        className='colorText' 
                        value={colorCMYK}
                        readOnly 
                        placeholder='CMYK Code'
                    />
                </Grid>
            </Grid>
            <center>
              <p className='inertext'>{company}</p>
            </center>
        </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
