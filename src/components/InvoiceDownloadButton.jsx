import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from './InvoiceDocument'; // Create this component
import Button from '@mui/joy/Button';

const InvoiceDownloadButton = ({ booking, children }) => {
  return (
    <PDFDownloadLink
      document={<InvoiceDocument booking={booking} />}
      fileName={`invoice-${booking.transaction_id}.pdf`}
    >
      {({ loading }) => (
        <Button
          variant="solid"
          color="primary"
          size="sm"
          loading={loading}
          disabled={loading}
        >
          {children}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default InvoiceDownloadButton;