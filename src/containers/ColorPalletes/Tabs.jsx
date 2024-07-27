import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Panel1 from './Panel1';
import Panel2 from './Panel2';
import Panel3 from './Panel4';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#fff',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#fff',
    },
  }),
);

export default function CustomizedTabs() {
  const { t } = useTranslation();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
      <Box sx={{ bgcolor: '#100F10' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
        >
          <StyledTab label={t('random')} value="1" />
          <StyledTab label={t('createPalette')}  value="2" />
          <StyledTab label={t('myPalettes')} value="3" />
        </StyledTabs>
        <TabPanel value="1" sx={{ padding: 1 }}>
          <Panel1 />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 1 }}>
          <Panel2 />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 1 }}>
          <Panel3 />
        </TabPanel>
      </Box>
      </TabContext>
    </Box>
  );
}

