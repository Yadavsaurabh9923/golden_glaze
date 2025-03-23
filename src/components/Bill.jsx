import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import ListItemContent from '@mui/joy/ListItemContent';
import Table from '@mui/joy/Table';
import Grid from '@mui/joy/Grid';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { width } from '@mui/system';

export default function ReceiptAccordion({selectedSlots, totalPrice, slotPrices}) {
  const items = [
    { name: 'Morning Slot',
      quantity: selectedSlots.morning?.length || 0, 
      price: (selectedSlots.morning?.length || 0) * (slotPrices.Morning || 0)},
    { name: 'Afternoon Slot', 
        quantity: (selectedSlots.afternoon.length || 0), 
        price: (selectedSlots.afternoon?.length || 0) * (slotPrices.Afternoon || 0)},
    { name: 'Night Slot', 
        quantity: (selectedSlots.night.length || 0), 
        price: (selectedSlots.night?.length || 0) * (slotPrices.Night || 0)},
  ];

  const tax = 0.00;
  const discount = 0;
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal  + tax - discount;

  return (
    <AccordionGroup
      variant="plain"
      sx={{ 
        maxWidth: 300,
        borderRadius: 'sm',
        '--joy-palette-neutral-plainHoverBg': 'transparent',
      }}
    >
    <Accordion>
    <AccordionSummary>
        <Avatar color="primary" variant="soft">
        <CurrencyRupeeIcon />
        </Avatar>
        <ListItemContent>
        <Typography level="title-md">Checkout Details</Typography>
        <Typography level="body-sm">Total: ₹{totalPrice.toFixed(2)}</Typography>
        </ListItemContent>
    </AccordionSummary>
        
        <AccordionDetails>
        <Typography level="body-xs" mb={1}>
            {new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} | {' '}
            {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </Typography>
          
          <Table 
  borderAxis="none"
  sx={{ 
    borderSpacing: '0px', // Ensures no space between table rows
    '& td': { padding: '0px', width: '80px' }, // Removes padding inside table cells
    '& tr:last-child td': { borderBottom: 0 }
  }}
>
  <tbody>
    {items.map((item, index) => (
      <tr key={index}>
        {/* Item Name Column */}
        <td 
          style={{
            width: '100%', 
            minWidth: '160px',
            maxWidth: '300px',
            whiteSpace: 'nowrap',
            padding: '0px' // Removes padding
          }}
        >
          <Typography level="body-sm" sx={{ lineHeight: '1', margin: '0px', padding: '0px' }}>
            {item.name}
          </Typography>
        </td>

        {/* Quantity Column */}
        <td
          style={{
            width: '50%',
            minWidth: '50px',
            textAlign: 'center',
            padding: '0px' // Removes padding
          }}
        >
          <Typography level="body-sm" sx={{ lineHeight: '0', margin: '0px', padding: '0px' }}>
            x {item.quantity}
          </Typography>
        </td>

        {/* Price Column */}
        <td sx={{ p: 0, m: -1}}> 
          <Typography level="body-sm" textAlign="right" sx={{ lineHeight: '1', margin: '0px', padding: '0px' }}>
            ₹{item.price.toFixed(2)}
          </Typography>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


          <Grid container spacing={0} sx={{ mt: 1 }}>

            <Grid xs={6}><Typography level="body-sm">Tax:</Typography></Grid>
            <Grid xs={6}><Typography level="body-sm" textAlign="right">0% ₹{tax.toFixed(2)}</Typography></Grid>

            <Grid xs={6}><Typography level="body-sm">Discount:</Typography></Grid>
            <Grid xs={6}><Typography level="body-sm" textAlign="right">₹{discount.toFixed(2)}</Typography></Grid>

            <Grid xs={6}><Typography level="body-sm">Total:</Typography></Grid>
            <Grid xs={6}><Typography level="body-sm" textAlign="right">₹{totalPrice.toFixed(2)}</Typography></Grid>
          </Grid>
        </AccordionDetails>
        
        </Accordion>
        </AccordionGroup>
  );
}