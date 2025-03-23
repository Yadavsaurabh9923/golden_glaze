import { Link } from 'react-router-dom';
import {
  Typography,
  List,
  ListItem,
  ListItemContent,
  Divider,
  Breadcrumbs,
  Button
} from '@mui/joy';
import {last_updated,support_email,support_phone} from "./configs"

const RefundsAndCancellations = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs sx={{ ml: -1 }}>
        <Link component={Link} to="/" variant="plain" color="neutral">
          Home
        </Link>
        <Typography>Refunds & Cancellation Policy</Typography>
      </Breadcrumbs>

      <Typography level="h1" component="h1" sx={{ mb: 1 }}>
        Cancellation Policy
      </Typography>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        Last Updated: {last_updated}
      </Typography>

      <List sx={{ '--ListItem-paddingY': '1.5rem' }}>
        {/* 1. User-Initiated Cancellations */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              1. User-Initiated Cancellations
            </Typography>
            <Typography><strong>Advance Cancellation (72+ hours before booking):</strong></Typography>
            <Typography>
              1. Users may request cancellation via the website dashboard or by contacting support.
            </Typography>
            <Typography>
              2. A partial refund of 80% of the booking amount will be issued (minus a 3% transaction fee).
            </Typography>
            <Typography>
              3. Alternatively, users may reschedule the slot once within 7 days at no extra cost (subject to availability).
            </Typography>
            <Divider sx={{ my: 2 }}/>
            <Typography><strong>Short-Notice Cancellation (24–72 hours before booking):</strong></Typography>
            <Typography>No cash refunds.</Typography>
            <Typography>
              1. Users may reschedule the slot once within 14 days (subject to a ₹100 rescheduling fee).
            </Typography>
            <Divider sx={{ my: 2 }}/>
            <Typography><strong>Last-Minute Cancellation (&lt;24 hours before booking):</strong></Typography>
            <Typography>1. No refunds or rescheduling permitted.</Typography>
            <Typography>2. Full booking amount forfeited.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 2. Management-Initiated Cancellations */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              2. Management-Initiated Cancellations
            </Typography>
            <Typography>
              1. Golden Glaze reserves the right to cancel bookings due to:
            </Typography>
            <Typography>
              a. Unforeseen circumstances (e.g., extreme weather, equipment failure, safety hazards).
            </Typography>
            <Typography>
              billing. Force major events (e.g., natural disasters, government orders).
            </Typography>
            <Typography><strong>Options for Affected Users:</strong></Typography>
            <Typography>
              <strong>Full Refund:</strong> Processed within 7 business days via the original payment method.
            </Typography>
            <Typography>
              <strong>Rescheduling:</strong> Priority booking for a future slot of equal value (no fees).
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 3. No-Show Policy */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              3. No-Show Policy
            </Typography>
            <Typography>
              1. Users who fail to arrive within 15 minutes of their booked slot time forfeit the payment.
            </Typography>
            <Typography>
              2. Exceptions may apply for emergencies (documentation required).
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 4. Group Bookings */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              4. Group Bookings (5+ participants)
            </Typography>
            <Typography>
              1. Cancellations require 7 days’ notice for a 50% refund.
            </Typography>
            <Typography>
              2. Rescheduling permitted once within 30 days (subject to a 10% fee).
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 5. Refund Process */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              5. Refund Process
            </Typography>
            <Typography>
              1. Refund requests must be submitted via email to {support_email} with the booking ID.
            </Typography>
            <Typography>
              2. Refunds exclude third-party transaction fees (e.g., payment gateway charges).
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 6. Rescheduling Guidelines */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              6. Rescheduling Guidelines
            </Typography>
            <Typography>
              1. Rescheduled slots must be booked within the timeframe specified in your cancellation tier.
            </Typography>
            <Typography>
              2. Only one reschedule permitted per booking.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 7. Special Cases */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              7. Special Cases
            </Typography>
            <Typography>
              <strong>Medical Emergencies:</strong> Submit a valid medical certificate for a 50% refund or free rescheduling.
            </Typography>
            <Typography>
              <strong>Technical Errors:</strong> Contact support immediately if a duplicate payment or booking error occurs.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 8. Unauthorized Transactions */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              8. Unauthorized Transactions
            </Typography>
            <Typography>
              Golden Glaze is not liable for fraudulent bookings. Report suspicious activity within 24 hours.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 9. Policy Updates */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              9. Policy Updates
            </Typography>
            <Typography>
              We reserve the right to amend this policy. Users are responsible for reviewing updates posted on our website.
            </Typography>
          </ListItemContent>
        </ListItem>
      </List>

      <Divider />

      <Typography level="body-sm" sx={{ mt: 2, mb: 5 }}>
        By using Golden Glaze, you acknowledge having read and agreed to this Cancellation Policy.
      </Typography>
    </div>
  );
};

export default RefundsAndCancellations;
