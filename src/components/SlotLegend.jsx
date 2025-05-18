import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Tooltip } from '@mui/joy';

const legendItems = [
  {
    label: 'Booked',
    color: 'rgba(209, 0, 31, 0.9)',
    tooltip: 'This slot is already booked.'
  },
  {
    label: 'Available',
    color: '#006400',
    tooltip: 'This slot is available for booking.'
  },
  {
    label: 'Hold',
    color: '#ffdb58',
    tooltip: 'This slot is currently being booked by some user. Try again in a few minutes.'
  }
];

const SlotLegend = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const containerRef = useRef(null);

  const handleClick = (index) => {
    setActiveTooltip(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target)
      ) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={3}
      padding={1}
      sx={{
        flexWrap: 'wrap',
        maxWidth: '100%',
        margin: '0 auto',
        userSelect: 'none', // optional to prevent text selection on clicks
      }}
    >
      {legendItems.map((item, index) => {
        const content = (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={1}
            onClick={(e) => {
              e.stopPropagation(); // prevent event bubbling to document
              handleClick(index);
            }}
            sx={{
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                // borderRadius: '4px',
                backgroundColor: item.color,
                // border: '1px solid #ccc'
              }}
            />
            <Typography level="body-sm" lineHeight={1.5}>
              {item.label}
            </Typography>
          </Box>
        );

        return (
          <Tooltip
            key={index}
            open={activeTooltip === index}
            title={item.tooltip}
            placement="top"
            arrow
          >
            {content}
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default SlotLegend;
