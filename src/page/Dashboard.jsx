/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */
import {useState, useRef} from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { grey } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ColorizeIcon from '@mui/icons-material/Colorize';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { BsCircleSquare } from "react-icons/bs";
import { BiSolidZoomIn, BiSolidZoomOut } from "react-icons/bi";
import TabsControl from '../containers/Tabs';
import { NewIconButton, OpenIconButton } from '../containers/icons/icons';

const themeDark = createTheme({
    status: {
      danger: grey[900],
    },
  });

export default function SignInSide() {
    const [color, setColor] = useState('#FFFFFF');
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
        await navigator.clipboard.writeText(color);
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
                {/*<IconButton 
                  edge="start" 
                  sx={{ mr: 2, color: '#fcfbf8' }}
                  onClick={handleNew}
                  type='file'
                >
                  <NoteAddIcon />
                </IconButton>*/}
                <NewIconButton onClick={handleNew} />
              </Tooltip>
              <Tooltip title="Abrir">
                  {/*<IconButton 
                    edge="start" 
                    htmlFor="fusk" 
                    sx={{ mr: 2,color: '#fcfbf8' }}
                    onClick={handleClick}
                  >
                    <FolderIcon />
                  </IconButton>*/}
                  <OpenIconButton />
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
                <IconButton 
                  edge="start" 
                  sx={{ mr: 2, color: '#fcfbf8' }}
                  onClick={openEyeDropper}
                >
                  <ColorizeIcon />
                </IconButton>
              </Tooltip>
              <Divider orientation="vertical" flexItem sx={{ color: '#fcfbf8' }} />
              <Tooltip title="Alejar">
                <IconButton 
                  edge="start" 
                  sx={{ mr: 2, color: '#fcfbf8' }}
                  onClick={handleZoomOut}
                >
                  <BiSolidZoomOut />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom">
                <IconButton 
                  edge="start" 
                  sx={{ mr: 2, color: '#fcfbf8' }}
                  onClick={handleZoomIn}
                >
                  <BiSolidZoomIn />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copiar Color">
                <IconButton 
                  edge="start" 
                  sx={{ mr: 2, color: `${color}` }}
                  onClick={handleCopyColor}
                >
                  <BsCircleSquare />
                </IconButton>
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