import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BrushIcon from '../../assets/img/brush.png';
import GetColorIcon from '../../assets/img/colorize.png';
import RegisterColor from '../../assets/img/addcolorize.png';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div sx={{ bgcolor: '#161416' }}>
      <button className='iconbutton' onClick={handleClick}>
        <img src={BrushIcon} alt="Gallery Icon"/>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
      <MenuList sx={{ bgcolor: '#161416', color: '#fff' }}>
        <MenuItem >
          <ListItemIcon>
            <img src={GetColorIcon} alt="Gallery Icon" width={20} />
          </ListItemIcon>
          <ListItemText>Obtener Color</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <img src={RegisterColor} alt="Gallery Icon"  width={20} />
          </ListItemIcon>
          <ListItemText>Registrar Color</ListItemText>
        </MenuItem>
      </MenuList>
      </Menu>
    </div>
  );
}
