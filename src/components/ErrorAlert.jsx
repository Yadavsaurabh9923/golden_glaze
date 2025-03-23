import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';

export default function AlertWithDangerState({message, closeAlertLabel}) {
  return (
    <Box sx={{ display: 'flex', gap: 1, width: '100%', flexDirection: 'column' }}>
      <Alert
        startDecorator={<WarningIcon />}
        variant="soft"
        color="danger"
        endDecorator={
          <React.Fragment>
            <IconButton variant="soft" size="sm" color="danger" onClick={closeAlertLabel}>
              <CloseIcon/>
            </IconButton>
          </React.Fragment>
        }
      >
        {message}
      </Alert>
    </Box>
  );
}