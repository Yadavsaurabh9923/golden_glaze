import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Slot from './Slot'

// Generate Slots
const generateTimeSlots = (start, end, bookedSlots = [], heldSlots = [], slotPrices, selectedDate) => {
  const timeSlots = {
    Morning: [],
    Afternoon: [],
    Night: []
  };

  const now = new Date();
  
  // Convert selectedDate to Date object if exists
  const selectedDateObj = selectedDate ? 
  new Date(selectedDate.split('-').reverse().join('-')) : null;

  // Check if selected date is today
  const isToday = selectedDateObj ?
  selectedDateObj.toDateString() === now.toDateString() : false;

  // Get current hour in decimal format (e.g., 16.5 for 4:30 PM)
  const currentHour = now.getHours() + now.getMinutes()/60;

  // Add this at the start of generateTimeSlots
  if (isNaN(start) || isNaN(end) || Number(start) >= Number(end)) {
    console.error('Invalid time range:', start, end);
    return timeSlots;
  }

  let current = start;

  while (current < end) {
    const slotEnd = current + 1;
    let status = "Available";

    // Check if slot is in the past
    if (isToday && slotEnd <= currentHour) {
      status = "Past";
    }
    // Check if slot is booked
    else if (bookedSlots.some(range => current >= range.start && current < range.end)) {
      status = "Booked";
    }
    // Check if the slot is on Hold
    else if (heldSlots.some(range => current >= range.start && current < range.end)) {
      status = "Hold";
    }
    
    let hours = Math.floor(current);
    let minutes = (current - hours) * 60;

    // Format time as "8:00 AM - 8:30 AM"
    let nextTime = current + 1;
    let nextHours = Math.floor(nextTime);
    let nextMinutes = (nextTime - nextHours) * 60;

    let timeLabel = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${
      hours < 12 ? "AM" : "PM"
    } - ${nextHours % 12 || 12}:${nextMinutes.toString().padStart(2, "0")} ${
      nextHours < 12 ? "AM" : "PM"
    }`;

    let slot = {
      label: timeLabel,
      value: current,
      status: status,
      // status: bookedSlots.includes(current) ? "Booked" : "Available", // Check if slot is booked
      price: 400,
    };

    // Assign to appropriate category
    if (current >= start && current < 12) {
      slot['price'] = slotPrices.Morning;
      timeSlots.Morning.push(slot);
    } else if (current >= 12 && current < 18) { // Changed to 17 (5 PM)
      slot['price'] = slotPrices.Afternoon;
      timeSlots.Afternoon.push(slot);
    } else {
      slot['price'] = slotPrices.Night;
      timeSlots.Night.push(slot);
    }

    current += 1; // Move to next 1 hour slot
  }

  return timeSlots;
};

export default function SlotSelector({startTime, endTime, selectedSlots, onSlotSelection, slotPrices, bookedSlots, heldSlots, selectedDate}) {
  const [index, setIndex] = React.useState(0);
  // Generate Time Slots
  const [timeSlots, setTimeSlots] = React.useState(generateTimeSlots(startTime, endTime, bookedSlots, heldSlots, slotPrices, selectedDate));

  // Update when bookedSlots change
  React.useEffect(() => {
    setTimeSlots(generateTimeSlots(startTime, endTime, bookedSlots, heldSlots,slotPrices,selectedDate));
  }, [bookedSlots, startTime, endTime, slotPrices, selectedDate]);

  // Function to update selected slots
  const handleSlotSelection = (slotName, labels, values) => {
    onSlotSelection(
      slotName, 
      labels,  // Array of labels
      values,  // Array of numerical values
      slotPrices[slotName.charAt(0).toUpperCase() + slotName.slice(1)]
    );
  };

  return (
    <Box sx={{ flexGrow: 1, m: -2, overflowX: 'hidden' }}>
      <Tabs
        aria-label="Pipeline"
        value={index}
        onChange={(event, value) => setIndex(value)}
      >
        <TabList
          sx={{
            pt: 1,
            justifyContent: 'center',
            [`&& .${tabClasses.root}`]: {
              flex: 'initial',
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: 'primary.plainColor',
                '&::after': {
                  height: 4,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  bgcolor: 'primary.500',
                },
              },
            },
          }}
        >
          <Tab indicatorInset>
            Morning{' '}
            <Chip
              size="sm"
              variant="soft"
              color={index === 0 ? 'primary' : 'neutral'}
            >
              {timeSlots.Morning.filter((slot) => slot.status === "Available").length}
            </Chip>
          </Tab>
    
          <Tab indicatorInset>
            Afternoon
            <Chip
              size="sm"
              variant="soft"
              color={index === 1 ? 'primary' : 'neutral'}
            >
              {timeSlots.Afternoon.filter((slot) => slot.status === "Available").length}
            </Chip>
          </Tab>

          <Tab indicatorInset>
            Night{' '}
            <Chip
              size="sm"
              variant="soft"
              color={index === 2 ? 'primary' : 'neutral'}
            >
              {timeSlots.Night.filter((slot) => slot.status === "Available").length}
            </Chip>
          </Tab>
        </TabList>
        <Box
          sx={(theme) => ({
            '--bg': theme.vars.palette.background.surface,
            background: 'var(--bg)',
            boxShadow: '0 0 0 100vmax var(--bg)',
            clipPath: 'inset(0 -100vmax)',
          })}
        >
          <TabPanel value={0}>
            <Slot key="morning" slotName="morning" slotPrice={slotPrices.Morning} slotValue={timeSlots.Morning} selectedSlots={selectedSlots.morning} onSelectSlots={handleSlotSelection}>
            </Slot>
          </TabPanel>
          
          <TabPanel value={1}>
            <Slot key="afternoon" slotName="afternoon" slotPrice={slotPrices.Afternoon} slotValue={timeSlots.Afternoon} selectedSlots={selectedSlots.afternoon} onSelectSlots={handleSlotSelection}>
              </Slot>
          </TabPanel>
          
          <TabPanel value={2}>
            <Slot key="night" slotName="night" slotPrice={slotPrices.Night} slotValue={timeSlots.Night} selectedSlots={selectedSlots.night} onSelectSlots={handleSlotSelection}>
              </Slot>
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
}