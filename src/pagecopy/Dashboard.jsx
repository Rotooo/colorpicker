/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import {useState, useRef, useEffect} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import TabsControl from '../containers/Tabs';
import NewIcon from '../assets/img/new.png';
import OpenIcon from '../assets/img/open.png';
import ColorizeIcon from '../assets/img/colorize.png';
import ZoomIn from '../assets/img/zoomin.png';
import ZoomOut from '../assets/img/zoomout.png';
import { setColor } from '../config';

const themeDark = createTheme({
    status: {
      danger: grey[900],
    },
  });

export default function SignInSide() {
    var getColor = process.env.REACT_APP_NODE_ENV;
    const [image, setImage] = useState(null);
    const [zoom, setZoom] = useState('cover');
    const inputRef = useRef(null);

    /*Este sirve para activar el cursor*/
    const openEyeDropper = async () => {
        let eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        setColor(sRGBHex);
    };
    
    /*Importa una imagen al dashboard*/
    const handleFileInput = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    /*Botones de Zoom para la imagen*/
    const handleZoomIn = () => {setZoom('cover')};
    const handleZoomOut = () => {setZoom('contain')};
    
    /*Este sirve para copiar el color de la imagen*/
    const handleCopyColor = async () => {
        await navigator.clipboard.writeText(getColor);
    };

    const handleNew = () => {
        setImage(null);
        setColor('#FFFFFF');
    };

    const handleClick = () => {
      inputRef.current.click();
    };

  return (
    <ThemeProvider theme={themeDark}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{ bgcolor: '#22272c' }} square>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent" sx={{ bgcolor: '#111111' }}>
            <Toolbar variant="dense">

              <Tooltip title="Nuevo">
                <button className='iconbutton' onClick={handleNew}>
                  <img src={NewIcon} alt="New Icon"/>
                </button>
              </Tooltip>

              <Tooltip title="Abrir">
                <button className='iconbutton' htmlFor="fusk" onClick={handleClick}>
                  <img src={OpenIcon} alt="New Icon"/>
                </button>
                <input 
                  id="fusk"
                  ref={inputRef} 
                  onChange={handleFileInput} 
                  type="file" 
                  accept='image' 
                  style={{display: 'none'}}
                />
              </Tooltip>

              <Tooltip title="Obtener Color">
                <button className='iconbutton' htmlFor="fusk" onClick={openEyeDropper}>
                  <img src={ColorizeIcon} alt="New Icon"/>
                </button>
              </Tooltip>
              
              <Tooltip title="Alejar">
                <button className='iconbutton' htmlFor="fusk" onClick={handleZoomOut}>
                  <img src={ZoomOut} alt="New Icon"/>
                </button>
              </Tooltip>

              <Tooltip title="Zoom">
                <button className='iconbutton' htmlFor="fusk" onClick={handleZoomIn}>
                  <img src={ZoomIn} alt="New Icon"/>
                </button>
              </Tooltip>

              <Tooltip title="Copiar Color">
                <button 
                  onClick={handleCopyColor}
                  style={{
                    backgroundColor: `${getColor}`,
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    padding: '0px',
                    marginLeft: 7,
                  }} />
              </Tooltip>

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
          <TabsControl />
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}