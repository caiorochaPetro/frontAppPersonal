import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {TextField} from '@mui/material';
import { Link } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

export default function PositionedMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //search state control
  const [searchText, setSearchText] = useState('');
  const [waringSize, setWaringSize] = useState(false);
  //end search control
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () =>{
    if (searchText.length < 3){
      setWaringSize(true);
    }
    else{
      return navigate("/search/"+searchText);
    }
  }

  const handleFieldChange=(value)=>{
    setSearchText(value)
    setWaringSize(false);

  }

  const [loginData, setLoginData] = useState(null);

  useEffect(()=>{
    document.title = "IoEng"
    
    setLoginData(localStorage.getItem('token'));
  },[loginData]);

  if (loginData !== null){
  return (
<div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
    <Button
      id="demo-positioned-button"
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      devEng
    </Button>
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem><a href="/">Home</a></MenuItem>
      <MenuItem><a href="/project">Projects</a></MenuItem>
      <MenuItem><a href="/editor">Editor</a></MenuItem>
    </Menu>
  </div>
  <div id="research">
    <TextField id="outlined-basic" label="Search" variant="outlined" value={searchText} onChange={(e) => { handleFieldChange(e.target.value) }} />
    <Button style={{marginTop:10}} onClick={handleSearch}>Go</Button>
    {waringSize ? <div>Precisamos de pelo menos 3 caracteres</div> : <></>}
  </div>
</div>

  );
  }
  else{
    return (
      <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          devEng
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem><a href="/">Home</a></MenuItem>
          <MenuItem><a href="/project">Projects</a></MenuItem>
        </Menu>
      </div>
      <div id="research">
        <TextField id="outlined-basic" label="Search" variant="outlined" value={searchText} onChange={(e) => { handleFieldChange(e.target.value) }} />
        <Button style={{marginTop:10}} onClick={handleSearch}>Go</Button>
        {waringSize ? <div>Precisamos de pelo menos 3 caracteres</div> : <></>}
      </div>
    </div>
    
    );

  }
}