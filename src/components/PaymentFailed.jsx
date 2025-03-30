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
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import Header from './Header';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // For routing
import React from 'react';
import Link from '@mui/joy/Link';

// Extend theme with error colors
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          400: '#0B6BCB',
          500: '#0956a3',
        },
        danger: {
          400: '#DC3545',
          500: '#BB2D3B',
        }
      },
    },
  },
});

export default function PaymentFailed() {

  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get('transactionId'); // Extract from query string

  const navigate = useNavigate(); // For routing

  // Redirect to homepage if no transactionId
  React.useEffect(() => {
    if (!transactionId) {
        navigate('/');
    }
    }, [transactionId, navigate]);

  return (
    <><Header></Header>
    <CssVarsProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4, mt:6}}>
        <Card variant="soft" sx={{ p: 4, textAlign: 'center', gap: 2 }}>
          <Box sx={{ mb: 2 }}>
            <CancelRoundedIcon 
              sx={{ 
                fontSize: 72, 
                color: 'danger.400', 
                mb: 2 
              }} 
            />

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

            <Typography level="h3" component="div" sx={{ mb: 1 }}>
              Payment Failed!
            </Typography>
            <Typography textColor="text.secondary">
              We encountered an issue processing your payment. Please try again.
            </Typography>
          </Box>

          <Stack spacing={2}>
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