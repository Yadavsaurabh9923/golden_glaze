import * as React from 'react';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg'

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <>
      {/* Fixed Header using Box */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          bgcolor: 'primary.solidBg',
          boxShadow: 'sm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
        }}
      >
        {/* Left - Menu Icon */}
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{
            bgcolor: 'transparent',
            borderRadius: 'md',
            p: 1.2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.1)',
              transition: 'all 0.2s ease-in-out',
            },
            '&:active': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(0.95)',
            },
          }}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>

        <Avatar alt="Golden Glaze" component={Link} to="/" src={logo} sx={{ width: 32, height: 32, ml:1}} />
        {/* Center - Title */}
        <Typography component={Link} to="/" level="title-lg" sx={{ flexGrow: 1, textDecoration: 'None',textAlign: 'left', color: 'white', ml:2}}>
          GOLDEN GLAZE
        </Typography>

        {/* Right - Menu Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* <Button variant="soft" color="neutral">About</Button>
          <Button variant="soft" color="neutral">Contact</Button> */}
        </Box>
      </Box>

      <Drawer 
      isDrawerOpen={isDrawerOpen} 
      setIsDrawerOpen={setIsDrawerOpen}
      >
      </Drawer>
    </>
  );
}
