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
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

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

        {/* Center - Title */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textDecoration: 'none',
            ml: 0.5,
            mt: 0.3,
            flexGrow: 1,
          }}
        >
          <Typography
            level="title-lg"
            sx={{
              color: '#FFD700', // Yellow
              fontWeight: 1000,
              fontSize: '1.2rem',
              fontFamily: '"Montserrat", sans-serif',
              // letterSpacing: '0.1rem',
              fontStyle: 'italic',
              mr: 1,
            }}
          >
            GOLDEN
          </Typography>
          <Typography
            level="title-lg"
            sx={{
              color: '#FFFFFF', // White
              fontWeight: 1000,
              fontSize: '1.2rem',
              fontFamily: '"Montserrat", sans-serif',
              // letterSpacing: '0.1rem',s
            }}
          >
            GLAZE
          </Typography>
        </Box>
        {/* <Avatar alt="Golden Glaze" component={Link} to="/" src={logo} sx={{ width: 32, height: 32, ml:0}} /> */}

        {/* Right - Menu Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton 
            component={Link}
            to="/your-bookings"
            aria-label="Home"
            sx={{ 
              mr: 2,
              '&:hover': {
                backgroundColor: 'transparent',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.3)' // Add subtle hover animation
                }
              },
              '& .MuiSvgIcon-root': {
                transition: 'transform 0.2s ease' // Smooth transition
              }
            }}
          >
            <EditNoteRoundedIcon 
              sx={{ 
                color: 'white',
                fontSize: '2.1rem' // Increased from 1.5rem to 2.5rem (~40px)
              }} 
            />
          </IconButton>
          {/* <Button variant="soft" color="neutral" sx={{mr:3}}><CalendarMonthRoundedIcon></CalendarMonthRoundedIcon></Button> */}
          {/* <Button variant="soft" color="neutral">Contact</Button> */}
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
