import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SearchIcon  from '../assets/img/search.png';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
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
  const { t } = useTranslation();

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

  const handleClickOpen = () => {
    setOpen(true);
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
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}