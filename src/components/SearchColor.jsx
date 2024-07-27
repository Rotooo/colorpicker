import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SearchIcon  from '../assets/img/search.png';
import { styled } from '@mui/material/styles';
import { ColorContext } from '../context/Color';
import { addColor } from '../services/id';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';

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
  const [scolor, setSColor] = useState('');
  const example = useContext(ColorContext);
  const { t } = useTranslation();

  const handleColorChange = (e) => {
    const inputColor = e.target.value;
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputColor)) {
      setSColor(inputColor);
    } else {
      setSColor('');
    }
  };

  const handleUseColor = () => {
    if (scolor === null || scolor === ''){
      toast.error(`No se encontro un color`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      example.setColor(scolor);
      setOpen(false);
    }
  };

  const handleSaveColor = () => {
    if (scolor === null || scolor === ''){
      toast.error(`No se encontro un color`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      addColor(scolor);
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setSColor('');
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <div>
            <button className='iconbutton' onClick={handleClickOpen}>
                <img src={SearchIcon} alt="New Icon"/>
            </button>
        </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
          🔍 {t('searchColor')}
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
        <DialogContent dividers>
          <input 
            type="text"
            className='colorText'
            onChange={handleColorChange} 
            placeholder={`${t('wColorHex')}`}
          />
          <div className='spacing5' />
          <input type='color' 
            className='colorinput'
            value={scolor}
            onChange={(e) => setSColor(e.target.value)}
          />
          <p>❕<i>{t('message1')}</i></p>
        </DialogContent>
        <DialogActions>
          <button 
            className='buttonw' 
            onClick={handleUseColor}
          >
            {t('useColor')}
          </button>
          <button 
            className='buttonw'
            onClick={handleSaveColor}
          >
            {t('saveHistory')}
          </button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}