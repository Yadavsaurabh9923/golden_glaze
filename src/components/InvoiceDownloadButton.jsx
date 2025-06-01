import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument'; // Create this component
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box'; // Import Box for layout

const InvoiceDownloadButton = ({ booking, children, sx, size = 'md', ...props }) => {
  return (
    <Box><PDFDownloadLink
      document={<InvoiceDocument booking={booking} />}
      fileName={`invoice-${booking.transaction_id}.pdf`}
    >
      {({ loading }) => (
        <Button
          variant="solid"
          color="primary"
          size="md"
          loading={loading}
          disabled={loading}
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600}}
        >
          {children}
        </Button>
      )}
    </PDFDownloadLink>
    </Box>
  );
};

export default InvoiceDownloadButton;