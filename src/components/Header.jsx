import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from './Drawer';

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
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon sx={{color:"white"}}/>
        </IconButton>

        {/* Center - Title */}
        <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'left', color: 'white', ml:2}}>
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
