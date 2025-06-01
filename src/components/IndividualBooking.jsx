import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Chip from '@mui/joy/Chip';
import InvoiceDownloadButton from './InvoiceDownloadButton';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTime from '@mui/icons-material/AccessTime';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { Box } from '@mui/joy';


export default function IndividualBooking({ booking }) {
    const {
        name,
        phone_number,
        transaction_id,
        booking_time,
        date,
        amount,
        status,
        startTime,
        endTime,
        email
    } = booking;

    const formatDate = d => new Date(d.split('-').reverse().join('-')).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'medium',
        timeZone: 'UTC' // Keep original UTC time if needed
      });

    const [index, setIndex] = React.useState(false);
    const [type, setType] = React.useState('disc');
    
    return (
        <>
        <Card>
            <div>
                <Chip
                    color={status === "Confirmed" ? "success" : "warning"}
                    onClick={function(){}}
                    size="sm"
                    variant="soft"
                    sx={{ position: 'absolute', right: '1rem' }}
                >{status}</Chip>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: '1.3rem', mr: 1 }} />
                    <Typography level="title-lg">
                        {startTime} - {endTime}
                    </Typography>
                </Box>
                <Typography level="body-sm" sx={{ mt: .8 }}>{formatDate(date)}
                {date === new Date().toLocaleDateString('en-GB').replaceAll('/', '-') && <Chip size='sm' sx={{ position: 'absolute', right: '1rem' }} color="primary">Today</Chip>}
                </Typography>
            </div>
            <CardContent orientation="horizontal" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div>
                    <Typography level="body-xs">Total price:</Typography>
                    <Typography sx={{ fontSize: 'md', fontWeight: 'lg' }}>₹{amount}</Typography>
                </div>

                <InvoiceDownloadButton
                    variant="solid"
                    size="md"
                    color="primary"
                    booking={{
                        startTime: startTime,
                        endTime: endTime,
                        status: status,
                        date: date,
                        name: name,
                        phone_number: phone_number,
                        email: email,
                        transaction_id: transaction_id,
                        amount: amount
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Invoice
                </InvoiceDownloadButton>
                
            </CardContent>
            <AccordionGroup variant='soft' sx={{ maxWidth: 400 }}>
                <Accordion
                    expanded={index}
                    onChange={(event, expanded) => {
                    setIndex(expanded ? true : false);
                    }}
                >
                    <AccordionSummary>Bookings Details</AccordionSummary>
                    <AccordionDetails>
                        <List marker={type}>
                            <ListItem>Name: {name}</ListItem>
                            <ListItem>Phone: {phone_number}</ListItem>
                            <ListItem>ID: {transaction_id}</ListItem>
                            <ListItem>Booking Time: {dateTimeFormatter.format(new Date(booking_time))}</ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>

            </AccordionGroup>
        </Card>
    </>
    );
}