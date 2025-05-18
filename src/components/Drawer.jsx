import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import logo from '../assets/images/logo.jpeg';
import Link from '@mui/joy/Link';
import Divider from '@mui/material/Divider';

export default function DrawerScrollable({ isDrawerOpen, setIsDrawerOpen }) {
  const linkStyle = {
    textDecoration: 'none',
    '&:hover': { textDecoration: 'none' },
    '&:active': { textDecoration: 'none' },
  };

  return (
    <React.Fragment>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <ModalClose />
        <DialogTitle>
          <Avatar alt="Golden Glaze" src={logo} />
          <Typography
            level="title-lg"
            sx={{ flexGrow: 1, textAlign: 'left', color: 'primary', mt: 1, ml: 1 }}
          >
            GOLDEN GLAZE
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem key="Home">
              <ListItemButton href="/" component={Link}>
                <Link href="/" underline="none" sx={linkStyle}>
                  Home
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="Your Bookings">
              <ListItemButton href="/your-bookings" component={Link}>
                <Link href="/your-bookings" underline="none" sx={linkStyle}>
                  Your Bookings
                </Link>
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem key="Terms & Conditions">
              <ListItemButton href="/terms-and-conditions" component={Link}>
                <Link href="/terms-and-conditions" underline="none" sx={linkStyle}>
                  Terms & Conditions
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="Privacy Policy">
              <ListItemButton component={Link} href="/privacy-policy">
                <Link href="/privacy-policy" underline="none" sx={linkStyle}>
                  Privacy Policy
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="Refunds & Cancellations">
              <ListItemButton component={Link} href="/refunds-cancellations">
                <Link href="/refunds-cancellations" underline="none" sx={linkStyle}>
                  Refunds & Cancellations
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="Shipping & Delivery">
              <ListItemButton component={Link} href="/shipping-and-delivery">
                <Link href="/shipping-and-delivery" underline="none" sx={linkStyle}>
                  Shipping & Delivery
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem key="Contact Us">
              <ListItemButton component={Link} href="/contact-us">
                <Link href="/contact-us" underline="none" sx={linkStyle}>
                  Contact Us
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Drawer>
    </React.Fragment>
  );
}
