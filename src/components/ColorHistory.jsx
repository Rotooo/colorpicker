import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import GalleyIcon from '../assets/img/history.png';
import '../assets/styles/styles.css';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  var a = [];
  let objColor = JSON.parse(localStorage.getItem("colorHistory"))|| ["#ffffff"];

  const handleClickOpen = () => {
    setOpen(true);
    a = JSON.parse(localStorage.getItem('colorHistory')) || [];
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='iconbutton' onClick={handleClickOpen}>
        <img src={GalleyIcon} alt="Gallery Icon"/>
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#100F10', color: '#fff' }} color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t('history')}
            </Typography>
          </Toolbar>
        </AppBar>

        <List sx={{ bgcolor: '#1D1B1D', color: '#fff' }}>
        {objColor.map((e) => (
          <ListItem key={e}>
            <div 
              style={{
                    backgroundColor: `${e}`,
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    marginRight: 10,
                  }}
            />
            <ListItemText sx={{ color: '#fff' }} primary={e} />
          </ListItem>
        ))}
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
