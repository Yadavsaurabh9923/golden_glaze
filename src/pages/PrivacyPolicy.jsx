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
import {last_updated,support_email,support_phone,support_address} from "./configs"
import Header from '../components/Header'

const PrivacyPolicy = () => {
  return (
    <><Header></Header>
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs sx={{ ml: -1, mt:8}}>
        <Link component={Link} to="/" variant="plain" color="neutral">Home</Link>
        <Typography>Privacy Policy</Typography>
      </Breadcrumbs>

      <Typography level="h1" component="h1" sx={{ mb: 1 }}>
        Privacy Policy
      </Typography>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        Last Updated: {last_updated}
      </Typography>

      <List sx={{ '--ListItem-paddingY': '1.5rem' }}>
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              1. Introduction
            </Typography>
            <Typography>
              Golden Glaze (“we,” “us,” or “our”) operates the website and services for booking slots at our cricket indoor turf. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. 
              By accessing or using our services, you consent to the practices described herein.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              2. Data Collection
            </Typography>
            <Typography>1. We collect information to provide and improve our services:</Typography>
            <Typography><strong>2. Personal Data:</strong> Name, email, phone number, and payment details (e.g., billing address, card information) when you book a slot.</Typography>
            <Typography><strong>3. Transaction Data:</strong> Booking history, payment status, and slot details.</Typography>
            <Typography><strong>4. Location Data:</strong> Precise location (if enabled) to facilitate turf access and bookings.</Typography>
            <Typography><strong>5. Device/Usage Data:</strong> IP address, browser type, device identifiers, and interaction logs (e.g., pages visited, booking attempts).</Typography>
            <Typography><strong>6. Voluntary Data:</strong> Feedback, survey responses, or communications with support.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              3. Use of Data
            </Typography>
            <Typography>1. Your information is used to:</Typography>
            <Typography>2. Process bookings, payments, and refunds.</Typography>
            <Typography>3. Communicate booking confirmations, updates, or cancellations.</Typography>
            <Typography>4. Improve platform functionality and user experience.</Typography>
            <Typography>5. Send promotional offers (opt-out available via email or account settings).</Typography>
            <Typography>6. Ensure compliance with legal obligations and prevent fraud.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              6. User Rights
            </Typography>
            <Typography><strong>1. Access/Correction:</strong> Review or update account details via your profile.</Typography>
            <Typography><strong>2. Deletion:</strong> Request removal of personal data (exceptions apply for legal/compliance needs).</Typography>
            <Typography><strong>3. Opt-Out:</strong> Unsubscribe from marketing emails via the “unsubscribe” link.</Typography>
            <Typography><strong>4. Cookies:</strong> Manage preferences through your browser settings.</Typography>
          </ListItemContent>
        </ListItem>
        
        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              7. Third-Party Links
            </Typography>
            <Typography>Our platform may link to external sites (e.g., payment gateways). We are not responsible for their privacy practices.</Typography>
          </ListItemContent>
        </ListItem>
        
        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              8. Data Retention
            </Typography>
            <Typography>We retain data only as long as necessary for bookings, legal compliance, or dispute resolution.</Typography>
          </ListItemContent>
        </ListItem>
        
        <Divider component="li" />
        
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              9. Policy Updates
            </Typography>
            <Typography>Updates will be posted on our website with a revised “Last Updated” date. Material changes will be notified via email.</Typography>
          </ListItemContent>
        </ListItem>
        
        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              10. Contact
            </Typography>
            <Typography>For questions or data requests, contact our Grievance Officer:</Typography>
            <Typography><strong>Name:</strong> Varad Madye</Typography>
            <Typography><strong>Email:</strong> {support_email}</Typography>
            <Typography><strong>Address: </strong>{support_address}</Typography>
          </ListItemContent>
        </ListItem>
      </List>

      <Divider/>

      <Typography level="body-sm" sx={{ mt: 2, mb:5 }}>
        By using Golden Glaze, you acknowledge having read and agreed to this Privacy Policy.
      </Typography>
    </div></>
  );
};

export default PrivacyPolicy;
