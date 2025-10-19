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
import IndividualBooking from './IndividualBooking'

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
      console.log(response)
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

  function filterUpcomingSlots(slots) {
  const parseDate = (d) => {
    const [day, month, year] = d.split("-");
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
  };

  return slots.sort((a, b) => {
    const dateA = parseDate(a.date).getTime() + a.start_time * 3600000;
    const dateB = parseDate(b.date).getTime() + b.start_time * 3600000;
    return dateB - dateA; // latest booking first
  });
}


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
            level="h2"
            // variant='outlined'
            sx={{
              color: 'primary.500',
              mb: 1,
              mt: 1,
              fontSize: { xs: 'xl3', md: 'xl2' },
              fontWeight: 'lg',
            }}
          >
            YOUR BOOKINGS
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
              type="tel"
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
              py: 3,
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
              gap: 2,
            }}
          >
            {filterUpcomingSlots(bookings).map((booking) => (
              <IndividualBooking booking={{
                startTime: formatHour(booking.start_time),
                endTime: formatHour(booking.end_time),
                status: booking.status,
                date: booking.date,
                name: booking.name,
                phone_number: booking.phone_number,
                email: booking.email,
                transaction_id: booking.transaction_id,
                amount: booking.amount,
                booking_time: booking.booking_time,
              }}></IndividualBooking>

            ))}
          </Box>
        )}
      </Sheet>
    </>
  );
}
