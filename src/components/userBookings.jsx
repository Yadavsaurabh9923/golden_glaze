import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Sheet from '@mui/joy/Sheet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/joy/Button';
import Header from './Header';
import LinearProgress from '@mui/joy/LinearProgress';
import Chip from '@mui/joy/Chip';
import { BASE_URL } from './BaseConfig';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const statusColors = {
    confirmed: 'success',
    pending: 'neutral',
    cancelled: 'danger'
  };

  const fetchBookings = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${searchTerm}`);
      if (!response.ok) throw new Error('No bookings found');

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]); // Reset bookings if error occurs
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

  const fieldsToShow = [
    { label: 'Date', key: 'date' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone_number' },
    { label: 'Status', key: 'status' },
    { label: 'Name', key: 'name' },
  ];

  return (
    <>
      <Header />
      <Sheet sx={{ 
        p: { xs: 2, md: 4 },
        mx: 'auto',
        maxWidth: 1200,
        borderRadius: 'md',
        mt: 8,
        bgcolor: 'neutral.50'
      }}>
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2 
        }}>
          <Typography level="h1" sx={{ 
            color: 'primary.700', 
            mb: 2,
            fontSize: { xs: 'xl4', md: 'xl4' },
            fontWeight: 'md'
          }}>
            Your Bookings
          </Typography>

          <FormControl sx={{ 
            width: '100%', 
            maxWidth: 500,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1
          }}>
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
                bgcolor: 'background.body'
              }}
            />
            <Button 
              variant="solid" 
              color="primary" 
              onClick={fetchBookings} 
              sx={{ 
                borderRadius: 'md',
                minWidth: 100,
                boxShadow: 'sm'
              }}>
              Search
            </Button>
          </FormControl>
        </Box>

        {isLoading && (
          <LinearProgress 
            size="md" 
            color="primary" 
            sx={{ borderRadius: 'md' }} 
          />
        )}

        {!isLoading && bookings.length === 0 ? (
          <Typography 
            level="body-lg" 
            sx={{ 
              textAlign: 'center', 
              py: 4,
              color: 'neutral.500'
            }}>
            No bookings found
          </Typography>
        ) : (
          <Box sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3
          }}>
            {bookings.map((booking) => (
              <Card 
                key={booking.id} 
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  boxShadow: 'sm',
                  bgcolor: 'background.body',
                  p: 2.5
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AccessTimeIcon sx={{ color: 'primary.500' }} />
                  <Typography level="title-md" sx={{ color: 'neutral.800' }}>
                    {formatHour(booking.start_time)} - {formatHour(booking.end_time)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1.5 }} />

                <List size="sm" sx={{ '--ListItem-paddingY': '6px' }}>
                  {fieldsToShow.map((field) => (
                    <ListItem key={field.key}>
                      <Typography 
                        level="body-xs" 
                        sx={{ 
                          minWidth: 80, 
                          color: 'neutral.600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                        {field.label}
                      </Typography>
                      {field.key === 'status' ? (
                        <Chip 
                          size="sm" 
                          color={statusColors[booking.status] || 'neutral'}
                          sx={{ borderRadius: 'sm' }}>
                          {booking[field.key]}
                        </Chip>
                      ) : (
                        <Typography level="body-md" sx={{ color: 'neutral.800' }}>
                          {booking[field.key]}
                        </Typography>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Card>
            ))}
          </Box>
        )}
      </Sheet>
    </>
  );
}
