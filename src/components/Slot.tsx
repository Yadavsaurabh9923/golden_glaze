import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function Slot({ slotName, slotPrice,slotValue, selectedSlots, onSelectSlots }) {
  // Use state to track selected slots
  // Initialize state with labels from selectedSlots
  const [localSelectedSlots, setLocalSelectedSlots] = React.useState(
    slotValue.filter(slot => selectedSlots.includes(slot.label))
  );

  // Update local state when selectedSlots prop changes
  React.useEffect(() => {
    setLocalSelectedSlots(slotValue.filter(slot => selectedSlots.includes(slot.label)));
  }, [selectedSlots, slotValue]);

  const handleSlotClick = (slot) => {
    const isSelected = localSelectedSlots.some(s => s.label === slot.label);
    let updatedSlots;

    if (isSelected) {
      updatedSlots = localSelectedSlots.filter(s => s.label !== slot.label);
    } else {
      updatedSlots = [...localSelectedSlots, slot];
    }

    setLocalSelectedSlots(updatedSlots);

    // Pass updated selected labels and values to parent
    onSelectSlots(slotName, updatedSlots.map(s => s.label), updatedSlots.map(s => s.value));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography level="title-lg" id="slot-header">
        {slotName.charAt(0).toUpperCase() + slotName.slice(1)} Slots 
        <Chip
          color="primary"
          size="md"
          variant="solid"
          sx={{ml:1}}
        >₹{slotPrice} per slot</Chip>
        <Chip
          color="primary"
          size="md"
          variant="solid"
          sx={{ml:1}}
        >30 mins</Chip>
      </Typography>

      {/* Slot Selection Chips */}
      <Box
        role="group"
        aria-labelledby="slot-header"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: "100%", justifyContent: 'space-between' }}
      >
        {slotValue.map((slot) => {
          const checked = localSelectedSlots.some(s => s.label === slot.label); // Proper check
          const isDisabled = slot.status !== "Available";

          return (
            <Chip
              key={slot.label}
              variant="solid"
              color={checked ? 'primary' : 'neutral'}
              // startDecorator={checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />}
              sx={{
                justifyContent: 'flex-start',
                width: "calc(50% - 8px)",
                p: 1,
                minWidth: '130px', // Adjust width
                maxWidth: '200px',
                borderRadius: 5,
                backgroundColor: checked 
                  ? '#006400' // Dark green color
                  : isDisabled 
                    ? 'rgba(209, 0, 31, 0.1)' 
                    : 'transparent',
              }}
            >
              <Checkbox
                variant="soft"
                color={checked ? 'success' : 'neutral'}
                disabled={slot.status !== "Available"}
                disableIcon 
                overlay = {!isDisabled}
                label={slot.label}
                checked={localSelectedSlots.some(s => s.label === slot.label)}
                onChange={() => handleSlotClick(slot)}
                sx={{
                  '& .MuiCheckbox-label': {
                    color: checked ? '#006400' : 'inherit'
                  },
                  '&.Mui-disabled': {
                    '& .MuiCheckbox-label': { 
                      color: 'rgba(209, 0, 31, 0.9)',
                      bgcolor: 'rgba(209, 0, 31, 0.1)'
                    }
                  }
                }}
              />
            </Chip>
          );
        })}
      </Box>
    </Box>
  );
}
