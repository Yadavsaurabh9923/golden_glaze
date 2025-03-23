import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import SlotSelector from './SlotSelector';
import DateSelector from './DateSelector'
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import IconButton from '@mui/joy/IconButton';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
import AlertWithDecorators from './ErrorAlert'
import Header from './Header'
import Box from '@mui/material/Box';
import CheckoutModal from './CheckoutModal';
import LinearProgress from '@mui/joy/LinearProgress';
import { Typography } from '@mui/joy';


const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor: '',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.level1,
  }),
}));

export default function BasicGrid() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [alertLabel,setAlertLabel] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("Empty");

  // -----------------------------------------------------------------------------------------------------------------
  // Fetch Configs and All Bookings
  
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Add this state declaration near the top with other states
  const [operationalConfigs, setOperationalConfigs] = React.useState({
    weekday_start: 5,
    weekday_end: 24,
    weekend_start: 5,
    weekend_end: 24,
  });

  // Move getDayType outside the fetchAllData function
  const getDayType = (dateString) => {
    const date = new Date(dateString.split('-').reverse().join('-'));
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return day === 0 || day === 6 ? 'weekend' : 'weekday';
  };

  // Store all Bookings
  const [bookings, setBookings] = React.useState([]);
  
  // Store all Slot Rates
  const [rates, setRates] = React.useState([]);

  // Store Booked Slots
  const [bookedSlots, setBookedSlots] = React.useState([]);

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [configsResponse, bookingsResponse, ratesResponse] = await Promise.all([
          fetch('https://golden-glaze-backend.onrender.com/configs/'),
          fetch('https://golden-glaze-backend.onrender.com/get_all_bookings/'),
          fetch('https://golden-glaze-backend.onrender.com/rates/')
        ]);
  
        // Check all responses
        if (!configsResponse.ok || !bookingsResponse.ok || !ratesResponse.ok) {
          throw new Error('One or more API requests failed');
        }
  
        // Parse all JSON data
        const [configData, bookingsData, ratesData] = await Promise.all([
          configsResponse.json(),
          bookingsResponse.json(),
          ratesResponse.json()
        ]);
        
        // Process configs
        const newOperationalConfigs = {
          weekday_start: configData.find(c => c.config_name === 'WEEKDAY_START')?.config_value || 5,
          weekday_end: configData.find(c => c.config_name === 'WEEKDAY_END')?.config_value || 24,
          weekend_start: configData.find(c => c.config_name === 'WEEKEND_START')?.config_value || 5,
          weekend_end: configData.find(c => c.config_name === 'WEEKEND_END')?.config_value || 24,
        };

        // Update operational configs state
        setOperationalConfigs(newOperationalConfigs);
        setBookings(bookingsData);  // Add state: const [bookings, setBookings] = useState([])
        setRates(ratesData);        // Add state: const [rates, setRates] = useState([])

        const weekdayRates = {
          Morning: Number(configData.find(c => c.config_name === 'WEEKDAY_MORNING_RATE')?.config_value) || 800,
          Afternoon: Number(configData.find(c => c.config_name === 'WEEKDAY_AFTERNOON_RATE')?.config_value) || 600,
          Night: Number(configData.find(c => c.config_name === 'WEEKDAY_NIGHT_RATE')?.config_value) || 1000,
        };
        
        const weekendRates = {
          Morning: Number(configData.find(c => c.config_name === 'WEEKEND_MORNING_RATE')?.config_value) || 900,
          Afternoon: Number(configData.find(c => c.config_name === 'WEEKEND_AFTERNOON_RATE')?.config_value) || 700,
          Night: Number(configData.find(c => c.config_name === 'WEEKEND_NIGHT_RATE')?.config_value) || 1200,
        };

        // Now determine day type and set slot prices (assumes selectedDate is already set)
        if (selectedDate) {
          const dayType = getDayType(selectedDate);
          const slotPrices = dayType === 'weekend' ? weekendRates : weekdayRates;
          setSlotPrices(slotPrices); // if you're maintaining slotPrices in state
        }

        // Save the fetched rates as state if needed
        setRates(ratesData);

        // Set Booked Slots
        const extractedTimes = bookingsData.flatMap((booking) => [booking.start_time, booking.end_time]);

        // Use a Set to store only unique values
        const uniqueSortedTimes = [...new Set(extractedTimes)].sort((a, b) => a - b);
        setBookedSlots(uniqueSortedTimes);
  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllData();
  }, []); // Empty dependency array to run once on mount

  // Update the useEffect for bookedSlots in Homepage.jsx
  React.useEffect(() => {
    if (selectedDate && bookings.length > 0) {
      const filteredBookings = bookings.filter(booking => 
        booking.date === selectedDate
      );
      
      // NEW: Generate all 0.5 increments between start and end times
      const extractedTimes = filteredBookings.flatMap(booking => {
        const slots = [];
        let current = booking.start_time;
        while (current < booking.end_time) {
          slots.push(current);
          current += 0.5;
        }
        return slots;
      });

      const uniqueSortedTimes = [...new Set(extractedTimes)].sort((a, b) => a - b);
      setBookedSlots(uniqueSortedTimes);
    } else {
      setBookedSlots([]);
    }
  }, [selectedDate, bookings]);

  const [dailyHours, setDailyHours] = React.useState({ start: 5, end: 24 });

  React.useEffect(() => {
    if (selectedDate) {
      const dayType = getDayType(selectedDate);
      setDailyHours({
        start: Number(operationalConfigs[`${dayType}_start`]),
        end: Number(operationalConfigs[`${dayType}_end`])
      });
    } else {
      setDailyHours({ start: 5, end: 24 });
    }
  }, [selectedDate, operationalConfigs]); // Add operationalConfigs to dependencies

  React.useEffect(() => {
    // Reset the selected slots when the date changes
    setSelectedSlots({
      morning: [],
      afternoon: [],
      night: [],
      morningValues: [],
      afternoonValues: [],
      nightValues: [],
    });
  }, [selectedDate]);
  // -----------------------------------------------------------------------------------------------------------------

  // Create dynamic slot prices
  const slotPrices = React.useMemo(() => {
    // Determine day type based on selectedDate (assume you have a function getDayType)
    const dayType = selectedDate && getDayType(selectedDate) || 'weekday';
    if(dayType === 'weekend'){
      return {
        Morning: rates.find(r => r.session === 'WEEKEND_MORNING_RATE')?.rate || 900,
        Afternoon: rates.find(r => r.session === 'WEEKEND_AFTERNOON_RATE')?.rate || 700,
        Night: rates.find(r => r.session === 'WEEKEND_NIGHT_RATE')?.rate || 1200
      };
    } else {
      return {
        Morning: rates.find(r => r.session === 'WEEKDAY_MORNING_RATE')?.rate || 800,
        Afternoon: rates.find(r => r.session === 'WEEKDAY_AFTERNOON_RATE')?.rate || 600,
        Night: rates.find(r => r.session === 'WEEKDAY_NIGHT_RATE')?.rate || 1000
      };
    }
  }, [rates, selectedDate]);

  // Ensure selectedDate is properly formatted
  const handleDateChange = (date) => {
    if (date.match(/^\d{2}-\d{2}-\d{4}$/)) {
      setSelectedDate(date);
    } else {
      console.error('Invalid date format received:', date);
    }
  };

  const [selectedSlots, setSelectedSlots] = React.useState({
    morning: [],
    afternoon: [],
    night: [],
    morningValues: [],
    afternoonValues: [],
    nightValues: [],
  });

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Update price calculation effect
  React.useEffect(() => {
    const newTotal =
      selectedSlots.morning.length * slotPrices.Morning +
      selectedSlots.afternoon.length * slotPrices.Afternoon +
      selectedSlots.night.length * slotPrices.Night;

    setTotalPrice(newTotal);
  }, [selectedSlots, slotPrices]);

  // Function to update selected slots
  const handleSlotSelection = (slotName, labels, values, slotPrice) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [slotName]: labels,       // Store labels
      [`${slotName}Values`]: values  // Store numerical values
    }));
  };

  const closeAlertLabel = () =>{
    setAlertLabel(false);
  }
  // -------------------------------------------------- CHECKS FUNCTIONS --------------------------------------------------
  const preBookingChecks = (slots) =>{
    // Check if any slot is outside operational hours
    const invalidSlot = slots.some(slot => 
      slot < dailyHours.start || slot >= dailyHours.end
    );
    
    if (invalidSlot) {
      setAlertMessage("Some selected slots are outside operational hours!");
      return false;
    }
    
    const sortedSlots = [...slots].sort((a, b) => a - b);

    const isConsecutive = sortedSlots.every((val, index, arr) => 
      index === 0 || val - arr[index - 1] === 0.5
    );

    return isConsecutive;
  }

  // -------------------------------------------------- MAIN BOOKING FUNCTION --------------------------------------------------

  const handleBooking = () =>{
    // Check total selected slots
    // If slot is one then raise alert saying select minumum 2 slots 
    if(['morning', 'afternoon', 'night'].reduce((sum, key) => sum + (selectedSlots[key]?.length || 0), 0) < 2){
      setAlertMessage("Select atleast 2 consecutive slots!")
      setAlertLabel(true);
      return;
    }

    let tempSlotsValues = ['morningValues', 'afternoonValues', 'nightValues'].flatMap(key => selectedSlots[key] || [])
    if(!preBookingChecks(tempSlotsValues)){
      setAlertMessage("Please select consecutive slots!")
      setAlertLabel(true);
      return;
    }

    // Check if slots are consecutive


    setIsModalOpen(true)
  }

  // --------------------------------------------------------------------------------------------------------------------------

  return (
    <Grid container spacing={1} sx={{ flexGrow: 1}}>
      <Grid xs={12} sx={{mb:7}}>
        <Header></Header>
      </Grid>

      {/* Second Row */}
      <Grid xs={12}>
        <Item><DateSelector onDateChange={handleDateChange}></DateSelector></Item>
      </Grid>
      
      <Grid xs={12}>
        <Divider></Divider>
      </Grid>

      { alertLabel && (<Grid xs={12}>
        <Item><AlertWithDecorators message={alertMessage} closeAlertLabel={closeAlertLabel}></AlertWithDecorators></Item>
        </Grid>)}

      {/* Third Row */}
      { loading ? (
      <Grid xs={12}>
        <LinearProgress size="sm" />
        <Item><Typography>Loading slots...</Typography></Item>
      </Grid>
      ): error ? (
        <Grid xs={12}>
          <Item><Typography>Error loading Slot Configuration: {error}</Typography></Item>
        </Grid>
      ):
      (<Grid xs={12}>
        <Item>
          <SlotSelector 
          startTime={dailyHours.start} 
          endTime={dailyHours.end} 
          selectedSlots={selectedSlots} 
          onSlotSelection={handleSlotSelection} 
          slotPrices={slotPrices}
          bookedSlots={bookedSlots}>
          </SlotSelector></Item>
      </Grid>)
      }

      <Grid xs={12}>
        <Divider></Divider>
      </Grid>

      <Grid xs={12}>
      <ToggleButtonGroup sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", width: "100%", gap: 0 }}>
          <IconButton value="underlined" sx={{ flex: 1, width: "100%", gap:1,borderRadius:0}}>
            <CalendarViewDayIcon />
            Selected Slots: {['morning', 'afternoon', 'night'].reduce((sum, key) => sum + (selectedSlots[key]?.length || 0), 0)}
          </IconButton>
          
          <IconButton value="underlined" sx={{ flex: 1, width: "100%", gap: 0,borderRadius:0}}>
            <CurrencyRupeeIcon />
            {totalPrice}.00
          </IconButton>
        </Box>
      </ToggleButtonGroup>

      </Grid>

      <Grid xs={12}>
        <Divider></Divider>
      </Grid>
      
      {/* Pay Button Row */}
      <Grid xs={12}>
        <Item>
          <Button endDecorator={<KeyboardArrowRight />} 
              // disabled={Object.values(selectedSlots).reduce((sum, arr) => sum + arr.length, 0) === 0} 
              color = 'primary' 
              fullWidth 
              sx={{
                p: 2,
                fontSize: '1.1rem', // Adjust the font size as needed
                '&:hover': {
                  backgroundColor: 'primary.dark', // Darker shade on hover
                },
              }}
            onClick={handleBooking}>
            BOOK SLOTS
          </Button>
        </Item>
      </Grid>
      
      {/* Booking Modal */}
      <CheckoutModal open={isModalOpen} onClose={() => setIsModalOpen(false)} 
      selectedSlots={selectedSlots} totalPrice={totalPrice} slotPrices={slotPrices} selectedDate={selectedDate}/>
    </Grid>
  );
}