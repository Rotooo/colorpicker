/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import React, {useState, useRef, useContext} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { ColorContext } from '../context/Color'; 
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NewIcon from '../assets/img/new.png';
import OpenIcon from '../assets/img/open.png';
import ColorizeIcon from '../assets/img/colorize.png';
import ZoomIn from '../assets/img/zoomin.png';
import ZoomOut from '../assets/img/zoomout.png';
import ColorizeHistory from '../assets/img/addcolorize.png';
import imageNull from '../assets/img/imagenull.png';
import SettingsWindow from '../components/Settings';
import Accordions from '../components/Accordions';
import SearchColor from '../components/SearchColor';
import 'react-toastify/dist/ReactToastify.css';

const themeDark = createTheme({
    status: {
      danger: grey[900],
    },
  });

export default function SignInSide() {
    const example = useContext(ColorContext);
    const [image, setImage] = useState(imageNull);
    const [zoom, setZoom] = useState('cover');
    const inputRef = useRef(null);
    const { t } = useTranslation();

    function SaveDataToLocalStorage(data){
      var a = [];
      a = JSON.parse(localStorage.getItem('colorHistory')) || [];
      a.push(data);
      localStorage.setItem('colorHistory', JSON.stringify(a));
    }

    /*Este sirve para activar el cursor*/
    const openEyeDropper = async () => {
        let eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        example.setColor(sRGBHex);
    };

    const openEyeDropperHis = async () => {
      let eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        example.setColor(sRGBHex);
        SaveDataToLocalStorage(sRGBHex);
    };
    
    /*Importa una imagen al dashboard*/
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if(file){
          setImage(URL.createObjectURL(e.target.files[0]));
        } else {
          setImage(imageNull);
        }
    };

    /*Botones de Zoom para la imagen*/
    const handleZoomIn = () => {setZoom('cover')};
    const handleZoomOut = () => {setZoom('contain')};

    const handleNew = () => {
        setImage(imageNull);
        example.setColor('#FFFFFF');
    };

    const handleClick = () => {
      inputRef.current.click();
    };

  return (
    <ThemeProvider theme={themeDark}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item
          xs={false}
          sm={4}
          md={7}
          sx={{
            bgcolor: '#0a0a0a',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${zoom}`,
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ bgcolor: '#161416' }} square>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent" sx={{ bgcolor: '#100F10' }}>
            <Toolbar variant="dense">
 
              <div className="tooltip">
                <span className="tooltiptext">{t('new')}</span>
                <button className='iconbutton' onClick={handleNew}>
                  <img src={NewIcon} alt="New Icon"/>
                </button>
              </div>

              <div className="tooltip">
                <span className="tooltiptext">{t('open')}</span>
                <button className='iconbutton' htmlFor="fusk" onClick={handleClick}>
                  <img src={OpenIcon} alt="New Icon"/>
                </button>
              </div>

                <input 
                  id="fusk"
                  ref={inputRef} 
                  onChange={handleFileInput} 
                  type="file" 
                  accept='image' 
                  style={{display: 'none'}}
                />

              <div className="tooltip">
                <span className="tooltiptext">{t('getColor')}</span>
                <button className='iconbutton' onClick={openEyeDropper}>
                  <img src={ColorizeIcon} alt="New Icon"/>
                </button>
              </div>

              <div className="tooltip">
                <span className="tooltiptext">{t('registerColor')}</span>
                <button className='iconbutton' onClick={openEyeDropperHis}>
                  <img src={ColorizeHistory} alt="New Icon"/>
                </button>
              </div>

              <div className='tooltip'>
                <span className='tooltiptext'>{t('searchColor')}</span>
                <SearchColor />
              </div>
              
              <div className="tooltip">
                <span className="tooltiptext">{t('zoomout')}</span>
                <button className='iconbutton' onClick={handleZoomOut}>
                  <img src={ZoomOut} alt="New Icon"/>
                </button>
              </div>

              <div className="tooltip">
                <span className="tooltiptext">{t('zoomin')}</span>
                <button className='iconbutton' htmlFor="fusk" onClick={handleZoomIn}>
                  <img src={ZoomIn} alt="New Icon"/>
                </button>
              </div>

              <div className='tooltip'>
                <span className='tooltiptext'>{t('settings')}</span>
                <SettingsWindow />
              </div>

            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{
            my: 2,
            mx: 2,
            display: 'flex',
          }}
        >
          <Accordions />
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}