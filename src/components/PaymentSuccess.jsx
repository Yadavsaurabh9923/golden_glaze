import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  Stack,
  Chip
} from '@mui/joy';
import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import Header from './Header';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom'; // For routing
import { useSearchParams } from 'react-router-dom';

// Custom theme with your primary color
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          400: '#0B6BCB',
          500: '#0956a3',
          600: '#074480',
        },
      },
    },
  },
});

export default function PaymentSuccess() {

  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId'); // Extract from query string
  const navigate = useNavigate(); // For routing

  // Redirect to homepage if no transactionId
  React.useEffect(() => {
    if (!transactionId) {
        navigate('/');
    }
    }, [transactionId]);

  return (
    <><Header></Header>
    <CssVarsProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4,mt:6}}>
        <Card variant="soft" sx={{ p: 4, textAlign: 'center', gap: 2 }}>
          <Box sx={{ mb: 2 }}>
            <CheckCircleRoundedIcon 
              sx={{ 
                fontSize: 72, 
                color: 'success.400', 
                mb: 2 
              }} 
            />
            <Typography level="h3" component="div" sx={{ mb: 1 }}>
              Payment Successful!
            </Typography>
            <Typography textColor="text.secondary">
              Thank you for your booking. Your transaction has been completed successfully.
            </Typography>
          </Box>

          <Box sx={{ 
            backgroundColor: 'neutral.100', 
            p: 2, 
            borderRadius: 'sm',
            mb: 2
          }}>
            <Typography level="body3" textTransform="uppercase" sx={{ mb: 1 }}>
              Transaction ID
            </Typography>
            <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>
              {transactionId}
            </Typography>
          </Box>

          {/* <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography level="title-sm" sx={{ mb: 1 }}>
              Booking Slots:
            </Typography>
            {bookingSlots.map((slot, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'neutral.outlinedBorder'
                }}
              >
                <div>
                  <Typography level="body2">{slot.date}</Typography>
                  <Typography level="body2">{slot.time}</Typography>
                </div>
                <Chip variant="outlined" color="neutral">
                  {slot.service}
                </Chip>
              </Box>
            ))}
          </Box> */}

          <Stack spacing={2}>
          <Link href="/your-bookings">
            <Button 
              startDecorator={<ListAltRoundedIcon />}
              variant="solid"
              color="primary"
              size="lg"
              fullWidth
              sx={{
                backgroundColor: 'primary.400',
                '&:hover': { backgroundColor: 'primary.500' }
              }}
            >
                
              Show Bookings
            </Button>
            </Link>
            <Link href="/">
            <Button 
              startDecorator={<HomeRoundedIcon />}
              variant="outlined"
              color="neutral"
              size="lg"
              fullWidth
            >
              Go Home
            </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    </CssVarsProvider>
    </>
  );
}