import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ColorControl from './ColorControl';
import { useTranslation } from 'react-i18next';
import ColorPallete from './ColorPallete';
import ColorSearch from '../containers/Accordions/ColorSearch';
import ColorH from './ColorH';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const { t } = useTranslation();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='colorHe'>
      <Accordion 
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
        sx={{ bgcolor: '#100F10', color: '#fff' }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><b>🎛️ {t('controlpanel')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorControl />
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel2'} 
        onChange={handleChange('panel2')}
        sx={{ bgcolor: '#100F10', color: '#fff' }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><b>🎨 {t('cPallete')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorPallete />
        </AccordionDetails>
      </Accordion>

      <Accordion 
        expanded={expanded === 'panel4'} 
        onChange={handleChange('panel4')}
        sx={{ bgcolor: '#100F10', color: '#fff' }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography><b>🕑 {t('history')}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ColorH />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
