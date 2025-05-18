import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Sheet from '@mui/joy/Sheet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/joy/Button';
import Header from './Header';
import LinearProgress from '@mui/joy/LinearProgress';
import Chip from '@mui/joy/Chip';
import { BASE_URL, env } from './BaseConfig';
import Cookies from 'js-cookie';
import DownloadIcon from '@mui/icons-material/Download';
import InvoiceDownloadButton from './InvoiceDownloadButton';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("No bookings found.")
  const [alertState, setAlertState] = useState(true)

  React.useEffect(() => {
    setSearchTerm(Cookies.get('GoldenGlaze_userPhone') || '');
  }, []);

  const statusColors = {
    confirmed: 'success',
    pending: 'neutral',
    cancelled: 'danger',
  };

  const fetchBookings = async () => {
    if (searchTerm.length !== 10) {
      setBookings([]);
      setAlertMessage('Phone number must be exactly 10 digits.');
      setAlertState(true);
      setTimeout(() => setAlertState(false), 4000);
      return;
    }
  
    if (!searchTerm.trim()) return;
  
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${env}/get_bookings_by_phone/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: searchTerm,
        }),
      });
  
      if (!response.ok) {
        setBookings([]);
        setAlertMessage('No bookings found.');
        setAlertState(true);
        setTimeout(() => setAlertState(false), 4000);
      }
  
      const data = await response.json();
  
      if (data.data.length < 1) {
        setBookings([]);
        setAlertMessage('No bookings found.');
        setAlertState(true);
        setTimeout(() => setAlertState(false), 4000);
        return;
      }
  
      setBookings(data.data);
    } catch (error) {
      setAlertMessage('Error fetching bookings.');
      setAlertState(true);
      setTimeout(() => setAlertState(false), 4000);
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  function formatHour(decimalHour) {
    const hour = Math.floor(decimalHour);
    const minutes = Math.round((decimalHour - hour) * 60);
    const period = hour < 12 || hour === 24 ? 'AM' : 'PM';
    let displayHour = hour % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHour}:${displayMinutes} ${period}`;
  }

  const filterUpcomingSlots = (slots) => {
    const now = new Date();

    return slots
      .map((slot) => {
        const [day, month, year] = slot.date.split('-');
        const slotDateTime = new Date(`${year}-${month}-${day}T${String(slot.start_time).padStart(2, '0')}:00:00`);
        return { ...slot, slotDateTime };
      })
      .filter((slot) => slot.slotDateTime > now)
      .sort((a, b) => a.slotDateTime - b.slotDateTime);
  };

  const fieldsToShow = [
    { label: 'Status', key: 'status' },
    { label: 'Date', key: 'date' },
    { label: 'Name', key: 'name' },
    { label: 'Phone', key: 'phone_number' },
    { label: 'Email', key: 'email' },
    { label: 'Amount', key: 'amount' },
    { label: 'ID', key: 'transaction_id' },
  ];

  return (
    <>
      <Header />
      <Sheet
        sx={{
          p: { xs: 2, md: 4 },
          mx: 'auto',
          maxWidth: 1200,
          borderRadius: 'md',
          mt: 8,
          bgcolor: 'neutral.50',
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            level="h1"
            sx={{
              color: 'primary.700',
              mb: 2,
              fontSize: { xs: 'xl4', md: 'xl4' },
              fontWeight: 'md',
            }}
          >
            Your Bookings
          </Typography>

          <FormControl
            sx={{
              width: '100%',
              maxWidth: 500,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
            }}
          >
            <Input
              fullWidth
              startDecorator={
                <Button variant="soft" color="neutral" sx={{ borderRadius: 'md' }}>
                  +91
                </Button>
              }
              placeholder="Phone Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                borderRadius: 'md',
                boxShadow: 'sm',
                bgcolor: 'background.body',
              }}
            />
            <Button
              variant="solid"
              color="primary"
              onClick={fetchBookings}
              sx={{
                borderRadius: 'md',
                minWidth: 100,
                boxShadow: 'sm',
              }}
            >
              Search
            </Button>
          </FormControl>
        </Box>

        {isLoading && (
          <LinearProgress size="sm" color="primary" sx={{ borderRadius: 'md', mb: 1 }} />
        )}

        {alertState && bookings.length === 0 ? (
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'neutral.500',
            }}
          >
            {alertMessage}
          </Typography>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 3,
            }}
          >
            {filterUpcomingSlots(bookings).map((booking) => (
              <Card
                key={booking.id}
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  boxShadow: 'sm',
                  bgcolor: 'background.body',
                  p: 2.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AccessTimeIcon sx={{ color: 'primary.500' }} />
                  <Typography level="title-lg" sx={{ color: 'neutral.800' }}>
                    {formatHour(booking.start_time)} - {formatHour(booking.end_time)}
                  </Typography>
                </Box>

                <Divider />

                <List size="sm" sx={{ '--ListItem-paddingY': '6px' }}>
                  {fieldsToShow.map((field) => {
                    if (field.key === 'email' && booking[field.key] === 'noemail@example.com') {
                      return null;
                    }

                    return (
                      <ListItem key={field.key}>
                        <Typography
                          level="body-sm"
                          sx={{
                            minWidth: 60,
                            color: 'neutral.600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {field.label}:
                        </Typography>
                        {field.key === 'status' ? (
                          <Chip
                            size="sm"
                            color={statusColors[booking.status] || 'neutral'}
                            sx={{ borderRadius: 'sm' }}
                          >
                            {booking[field.key]}
                          </Chip>
                        ) : (
                          <Typography level="body-md" sx={{ color: 'neutral.800' }}>
                            {field.key === 'amount' ? `₹ ${booking[field.key]}` : booking[field.key]}
                          </Typography>
                        )}
                      </ListItem>
                    );
                  })}
                </List>

                <InvoiceDownloadButton
                  booking={{
                    startTime: formatHour(booking.start_time),
                    endTime: formatHour(booking.end_time),
                    status: booking.status,
                    date: booking.date,
                    name: booking.name,
                    phone_number: booking.phone_number,
                    email: booking.email,
                    transaction_id: booking.transaction_id,
                    amount: booking.amount,
                  }}
                >
                  <DownloadIcon sx={{ mr: 1 }} />
                  Invoice
                </InvoiceDownloadButton>
              </Card>
            ))}
          </Box>
        )}
      </Sheet>
    </>
  );
}
