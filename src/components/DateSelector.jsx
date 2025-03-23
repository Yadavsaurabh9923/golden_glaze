import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Generate an array of dates
const generateDates = (numDays) => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to avoid timezone issues
  
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      fullDate: date,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    });
  }
  return dates;
};

// Generate Dates
const DateSelector = ({ onDateChange }) => {
    
  const dates = generateDates(30); // Generate dates for 30 days
  const [selectedDate, setSelectedDate] = React.useState(dates[0].fullDate); // Default to today

  // Update the useEffect that handles date changes
  React.useEffect(() => {
    if (onDateChange && selectedDate) {
      // Format date to match backend's dd-mm-yyyy format
      const pad = (n) => String(n).padStart(2, '0');
      const formattedDate = [
        pad(selectedDate.getDate()),
        pad(selectedDate.getMonth() + 1), // Months are 0-based
        selectedDate.getFullYear()
      ].join('-');
      
      onDateChange(formattedDate);
    }
  }, [selectedDate, onDateChange]);

  return (
    <>
      <Typography level="h4" sx={{ mb: 1, ml:1, textAlign:"left"}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon />
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Box>
        
      </Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, p: 1 }}>
        {dates.map((dateObj, index) => (
          <Button
            key={index}
            variant={selectedDate.toDateString() === dateObj.fullDate.toDateString() ? 'solid' : 'outlined'}
            color={selectedDate.toDateString() === dateObj.fullDate.toDateString() ? 'primary' : 'neutral'}
            onClick={() => setSelectedDate(dateObj.fullDate)} 
            sx={{
              minWidth: '80px',
              flexDirection: 'column',
              alignItems: 'center',
              p: 1,
            }}
          >
            <Typography level="body3">{dateObj.day}</Typography>
            <Typography level="h6">{dateObj.date} {dateObj.month}</Typography>
          </Button>
        ))}
      </Box>
    </>
  );
};

export default DateSelector;
