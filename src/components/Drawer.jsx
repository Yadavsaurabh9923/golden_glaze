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
import logo from '../assets/images/logo.jpeg'
import Link from '@mui/joy/Link';

export default function DrawerScrollable({isDrawerOpen,setIsDrawerOpen}) {

  return (
    <React.Fragment>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <ModalClose />
        <DialogTitle>
        <Avatar alt="Golden Glaze" src={logo} />
        <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'left', color: 'primary', mt:1, ml:1}}>
          GOLDEN GLAZE
        </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
              <ListItem key={"Terms & Conditions"}>
                <ListItemButton href="/terms-and-conditions" component={Link}>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                </ListItemButton>
              </ListItem>

              <ListItem key={"Privacy Policy"}>
                <ListItemButton component={Link} href="/privacy-policy">
                    <Link href="/privacy-policy">Privacy Policy</Link >
                </ListItemButton>
              </ListItem>

              <ListItem key={"Cancellation & Refunds"} >
                <ListItemButton component={Link} href="/refunds-cancellations">
                    <Link href="/refunds-cancellations">Refunds & Cancellations</Link>
                </ListItemButton>
              </ListItem>

              <ListItem key={"Shipping & Delivery"}>
                <ListItemButton component={Link} href="/shipping-and-delivery">
                    <Link href="/shipping-and-delivery">Shipping & Delivery</Link>
                </ListItemButton>
              </ListItem>

              <ListItem key={"Contact Us"} >
                <ListItemButton component={Link} href="/contact-us"> 
                    <Link href="/contact-us">Contact Us</Link>
                </ListItemButton>
              </ListItem>
          </List>
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar size="lg" />
          <div>
            <Typography level="title-md">Yadav, Saurabh</Typography>
            <Typography level="body-sm">joined 20 Jun 2023</Typography>
          </div>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}