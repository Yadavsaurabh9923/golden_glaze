import * as React from 'react';
import Tooltip from '@mui/joy/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import AdjustIcon from '@mui/icons-material/Adjust';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ClickableTooltip({ selectedSlots }) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const totalSlots = selectedSlots.morning.length + selectedSlots.afternoon.length + selectedSlots.night.length;

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipToggle = () => {
    setTooltipOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
        <Tooltip
          title={
            <Box sx={{ maxWidth: 300, p: 1 }}>
              {selectedSlots.morning.length > 0 && (<Typography level="body-sm">
                <b>Morning ({selectedSlots.morning.length || 0}): </b> 
                <i>{selectedSlots.morning.join(', ') || 'None'}</i>
              </Typography>)}

              {selectedSlots.afternoon.length > 0 && <Typography level="body-sm">
                <b>Afternoon ({selectedSlots.afternoon.length || 0}): </b> 
                <i>{selectedSlots.afternoon.join(', ') || 'None'}</i>
              </Typography>}

              {selectedSlots.night.length > 0 && <Typography level="body-sm">
                <b>Night ({selectedSlots.night.length || 0}): </b> 
                <i>{selectedSlots.night.join(', ') || 'None'}</i>
              </Typography>}

              <Typography level="body-sm" fontWeight="bold" sx={{mt:1}}>
                Total Slots: <i>{selectedSlots.morning.length + selectedSlots.afternoon.length + selectedSlots.night.length}</i>
              </Typography>
            </Box>
          }
          variant="outlined"
          arrow
          open={tooltipOpen}
        >
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{ cursor: 'pointer' }}
            onClick={handleTooltipToggle} // Toggle tooltip on click
          >
            <Link underline="none" startDecorator={<ArrowDropDownIcon />} sx={{ fontWeight: 'md', fontSize: 'sm',cursor: 'pointer', p: 0.1, mr: 0.5 }}>
              {totalSlots} Slots Selected
            </Link>
          </Chip>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  );
}
