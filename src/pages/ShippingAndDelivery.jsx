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
import {last_updated,support_email,support_phone, support_address} from "./configs"

const ShippingDeliveryPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs sx={{ mb: 2, ml:-1 }}>
        <Link to="/" variant="plain" color="neutral">
          Home
        </Link>
        <Typography>Shipping & Delivery Policy</Typography>
      </Breadcrumbs>

      <Typography level="h1" component="h1" sx={{ mb: 2 }}>
        Shipping & Delivery Policy
      </Typography>
      <Typography level="body-sm" sx={{ mb: 0 }}>
        Last Updated: {last_updated}
      </Typography>

      <List sx={{ '--ListItem-paddingY': '1.5rem' }}>
        {/* 1. Booking Confirmation */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              1. Booking Confirmation
            </Typography>
            <Typography>
              <strong>Instant Confirmation:</strong> Upon successful payment, you will receive an email/SMS with your booking details, including the date, time, and slot ID.
            </Typography>
            <Typography>
              <strong>Venue Access:</strong> Your booking confirmation serves as your "ticket" to access the turf at the scheduled time. No physical passes or documents will be mailed.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 2. Digital Access */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              2. Digital Access
            </Typography>
            <Typography>
              <strong>No Shipping Required:</strong> All services are provided onsite at our turf location <Typography sx={{color: "#0b6bcb"}}>({support_address})</Typography>.
            </Typography>
            <Typography>
              <strong>Check-In Process:</strong> Present your booking confirmation (digital or printed) at the venue reception for verification.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 3. Cancellations & Rescheduling */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              3. Cancellations & Rescheduling
            </Typography>
            <Typography>
              <strong>No Delivery Delays:</strong> Since no physical goods are involved, cancellations/rescheduling are governed by our Cancellation Policy.
            </Typography>
            <Typography>
              <strong>Refunds:</strong> Refunds (if applicable) are processed digitally to your original payment method.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 4. Customer Support */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              4. Customer Support
            </Typography>
            <Typography>
              For assistance with bookings or access issues, contact us:
            </Typography>
            <Typography>
              <strong>Email:</strong> {support_email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {support_phone}
            </Typography>
            <Typography>
              <strong>Working Hours:</strong> 9:00 AM to 9:00 PM
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* 5. Why This Policy Exists */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              5. Why This Policy Exists
            </Typography>
            <Typography>
              This page is published to:
            </Typography>
            <Typography>
              • Avoid confusion about physical shipping/delivery.
            </Typography>
            <Typography>
              • Clarify our 100% digital booking process.
            </Typography>
            <Typography>
              • Ensure compliance with transparency requirements.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        {/* FAQs */}
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              FAQs
            </Typography>
            <Typography>
              <strong>Q:</strong> Do I need to wait for a physical ticket?<br/>
              <strong>A:</strong> No. Your email/SMS confirmation is sufficient for venue access.
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Q:</strong> What if I don’t receive my booking confirmation?<br/>
              <strong>A:</strong> Check your spam folder first. If unresolved, contact support within 15 minutes of booking.
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Q:</strong> Are there shipping charges?<br/>
              <strong>A:</strong> No. We do not ship or deliver physical items.
            </Typography>
          </ListItemContent>
        </ListItem>
      </List>

      <Divider sx={{ my: 1}} />

      <Typography level="body-sm" sx={{ mt: 2, mb:5}}>
        By using Golden Glaze, you acknowledge that our services are provided onsite and require no shipping/delivery of goods.
      </Typography>
    </div>
  );
};

export default ShippingDeliveryPolicy;
