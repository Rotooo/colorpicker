import React from 'react';
import '../../assets/styles/styles.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function TabOne() {
  var getColor = process.env.REACT_APP_NODE_ENV;
  return (
    <div className='tabone'>
    <div className='spacing15' />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <div 
              style={{ 
                background: `${getColor}`, 
                borderRadius: 10,
                width: 150, 
                height: 100 
              }} 
            />
          </Grid>
          <Grid item>
            <input 
              type='text' 
              className='colorText' 
              value={getColor} 
              readOnly 
              placeholder='HEX Code' 
            />
            <br /><br />
            <input type='text' className='colorText' readOnly placeholder='RGB Code' />
            <br /><br />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
