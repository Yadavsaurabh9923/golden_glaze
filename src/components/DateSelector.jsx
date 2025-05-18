import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const generateDates = (numDays) => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
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

const DateSelector = ({ onDateChange }) => {
  const dates = generateDates(10);
  const [selectedDate, setSelectedDate] = React.useState(dates[0].fullDate);
  const containerRef = React.useRef(null);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollWidth > clientWidth + scrollLeft);
    }
  }, []);

  React.useEffect(() => {
    const container = containerRef.current;
    checkScroll(); // Initial check

    const resizeObserver = new ResizeObserver(checkScroll);
    if (container) {
      resizeObserver.observe(container);
    }

    container?.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      container?.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'right' ? 200 : -200,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    if (onDateChange && selectedDate) {
      const pad = (n) => String(n).padStart(2, '0');
      const formattedDate = [
        pad(selectedDate.getDate()),
        pad(selectedDate.getMonth() + 1),
        selectedDate.getFullYear()
      ].join('-');
      onDateChange(formattedDate);
    }
  }, [selectedDate, onDateChange]);

  return (
    <>
      <Typography level="h4" sx={{ mb: 1, ml: 1, textAlign: "left" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthIcon />
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}
        </Box>
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Box 
          ref={containerRef}
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: 1, 
            p: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollBehavior: 'smooth'
          }}
        >
          {dates.map((dateObj, index) => (
            <Button
              key={index}
              variant={selectedDate.toDateString() === dateObj.fullDate.toDateString() ? 'solid' : 'soft'}
              color={selectedDate.toDateString() === dateObj.fullDate.toDateString() ? 'primary' : 'neutral'}
              onClick={() => setSelectedDate(dateObj.fullDate)} 
              sx={{
                minWidth: '80px',
                border: '1px solid rgba(212, 212, 212, 0.7)',
                flexDirection: 'column',
                alignItems: 'center',
                p: 1,
                flexShrink: 0,
                transition: 'all 0.2s ease',
                ...(selectedDate.toDateString() !== dateObj.fullDate.toDateString() && {
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                })
              }}
            >
              <Typography level="body3">{dateObj.day}</Typography>
              <Typography level="h6">{dateObj.date} {dateObj.month}</Typography>
            </Button>
          ))}
        </Box>
        
        {/* Left Scroll Button */}
        {showLeftButton && (
          <Button
            variant="soft"
            size="sm"
            onClick={() => handleScroll('left')}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              borderRadius: '50%',
              minWidth: '32px',
              border: '1px solid rgba(212, 212, 212, 0.7)',
              width: '32px',
              height: '32px',
              p: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: '1.2rem' }} />
          </Button>
        )}
        
        {/* Right Scroll Button */}
        {showRightButton && (
          <Button
            variant="soft"
            size="sm"
            onClick={() => handleScroll('right')}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              borderRadius: '50%',
              border: '1px solid rgba(212, 212, 212, 0.7)',
              minWidth: '32px',
              width: '32px',
              height: '32px',
              p: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }
            }}
          >
            <ChevronRightIcon sx={{ fontSize: '1.2rem' }} />
          </Button>
        )}
      </Box>
    </>
  );
};

export default DateSelector;