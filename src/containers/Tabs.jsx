import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { IoMdWater, IoMdColorPalette, IoMdAlbums } from "react-icons/io";
import { IoColorFilter } from "react-icons/io5";
import TabOne from './TabOne/TabOne';
import Box from '@mui/material/Box';
import '../assets/styles/styles.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='tabscontrol'>
      <Box
        sx={{ flexGrow: 1, bgcolor: '#111111', display: 'flex', height: '100%' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<IoMdWater />} 
            iconPosition="start" 
            {...a11yProps(0)}
            sx={{ color: '#fcfbf8' }} 
            />
          <Tab 
            icon={<IoMdColorPalette />} 
            iconPosition="start" 
            {...a11yProps(1)}
            sx={{ color: '#fcfbf8' }}
          />
          <Tab
            icon={<IoMdAlbums />} 
            iconPosition="start" 
            {...a11yProps(2)}
            sx={{ color: '#fcfbf8' }} 
          />
          <Tab 
            icon={<IoColorFilter />}
            iconPosition="start"
            {...a11yProps(3)}
            sx={{ color: '#fcfbf8' }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          Color Control
          <TabOne />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Paleta de Color
        </TabPanel>
        <TabPanel value={value} index={2}>
          Muestas Guardadas
        </TabPanel>
        <TabPanel value={value} index={3}>
          Opciones de Imagen
        </TabPanel>
      </Box>
    </div>
  );
}