import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SettingIcon from '../assets/img/settings.png';
import { toast } from 'react-toastify';
import '../assets/styles/styles.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function calclocalstorage(){
  if('localStorage' in window && window['localStorage'] !== null){
      var size = JSON.stringify(localStorage).length;
      var totalSpace = 5 * 1024 * 1024;
      var freeSpace = totalSpace - size;

      var sizeKB = (size / 1024).toFixed(1) + ' KB';
      var totalSpaceKB = (totalSpace / 1024).toFixed(1) + ' KB';
      var freeSpaceKB = (freeSpace / 1024).toFixed(1) + ' KB';

      return{
          size: sizeKB,
          totalSpace: totalSpaceKB,
          freeSpace: freeSpaceKB
      };
  } else{
      return 'El localStorage no esta disponible en este navegador';
  }
}

export default function CustomizedDialogs() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const company = `©Black Shark Studios ${new Date().getFullYear()}`;
  var spaceLocal = calclocalstorage();

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.clear();
  };

  const handleClearData = () => {
    localStorage.clear();
    toast.success(`${t('historyDelete')}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    localStorage.setItem("colorHistory", '["#ffffff"]');
    localStorage.setItem("i18nextLng", 'en');
};

  return (
    <div>
        <button className='iconbutton' onClick={handleClickOpen}>
            <img src={SettingIcon} alt="Gallery Icon"/>
        </button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle 
          id="customized-dialog-title" 
          onClose={handleClose}
          sx={{ bgcolor: '#100F10', color: '#fff' }}
        >
          {t('settings')}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#1D1B1D', color: '#fff' }}>
          <label>{t('language')}: </label>
          <select 
            name="select" 
            className='translator'
            onChange={handleLanguage} 
            value={i18n.language}
          >
            <option value="en">{t('english')}</option>
            <option value="es">{t('spanish')}</option>
          </select>
          <div className='spacing10' />
          <label>{t('deleteHistory')}: </label>
          <button className='buttonclear' onClick={handleClearData}>
            {t('deleteData')}
          </button>
          <div className='spacing10' />
          <table className='spaceTable'>
            <thead>
              <td>{t('storage')}</td>
              <td>{t('quota')}</td>
            </thead>
            <tbody>
              <tr>
                <td>{t('storageUse')}</td>
                <td>{`${spaceLocal.size}`}</td>
              </tr>
              <tr>
                <td>{t('storageTotal')}</td>
                <td>{`${spaceLocal.totalSpace}`}</td>
              </tr>
              <tr>
                <td>{t('storageFree')}</td>
                <td>{`${spaceLocal.freeSpace}`}</td>
              </tr>
            </tbody>
          </table>

          <center>
            <p>{company}</p>
            <p className='inertext'>{t('version')}: Beta-1.33</p>
          </center>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
