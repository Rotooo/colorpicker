import React, {useContext} from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import '../assets/styles/styles.css';

export default function ColorH() {
  var a = [];
  let objColor = JSON.parse(localStorage.getItem("colorHistory"))|| ["#ffffff"];
  a = JSON.parse(localStorage.getItem('colorHistory')) || [];

  return (
    <>
        <Grid container>
        {objColor.map((e) => (
          <Tooltip title={`${e}`} key={e}>
            <div 
              className="colorbutton" 
              style={{ backgroundColor: `${e}` }} 
            />
          </Tooltip>
        ))}
        </Grid>
    </>
  )
}
