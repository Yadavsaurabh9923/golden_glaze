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

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-1 py-8 max-w-3xl">
      <Breadcrumbs sx={{ ml: -1 }}>
        <Link component={Link} to="/" variant="plain" color="neutral">
          Home
        </Link>
        <Typography>Terms & Conditions</Typography>
      </Breadcrumbs>

      <Typography level="h1" component="h1" sx={{ mb: 2 }}>
        Terms and Conditions
      </Typography>
      <Typography level="body-sm">
        Last Updated: {last_updated}
      </Typography>

      <List sx={{ '--ListItem-paddingY': '1.5rem' }}>
        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography>
              1. By accessing or using the Golden Glaze platform (the "Website"), you agree to comply
              with these Terms and Conditions ("Terms"). Continued use constitutes acceptance of revisions,
              which are binding upon publication.
            </Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              2. Booking & Payment
            </Typography>
            <Typography>1. Slots may be booked without account creation. Valid contact details (name, email, phone) are mandatory.</Typography>
            <Typography>2. Full payment required at booking via credit/debit cards, UPI, and other listed gateways. Transactions are processed securely; Golden Glaze does not store payment data.</Typography>
            <Typography>3. Payments are final except as specified in Section 3.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              3. Cancellations
            </Typography>
            <Typography><strong>1. User-Initiated:</strong> No refunds for cancellations within 24 hours of the booked slot or no-shows.</Typography>
            <Typography><strong>2. Management-Initiated:</strong> Full refunds or rescheduling will be offered if Golden Glaze cancels due to force majeure, maintenance, or safety concerns. Refunds are processed within 7 business days via the original payment method.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              4. User Obligations
            </Typography>
            <Typography>1. Adhere to all posted turf rules, including equipment use, safety protocols, and time limits.</Typography>
            <Typography>2. Users bear financial responsibility for damage to turf property or equipment.</Typography>
            <Typography>3. Disorderly behavior (harassment, intoxication, violence) will result in immediate removal without refund.</Typography>
            <Typography>4. Participants under 12 require parental consent; minors under 12 must be supervised by an adult.</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              5. Disclaimers & Limitation of Liability
            </Typography>
            <Typography>1. Participation is at your own risk. Golden Glaze disclaims liability for injuries, property loss/theft, or incidental damages incurred on-site.</Typography>
            <Typography>2. Not liable for disruptions due to events beyond reasonable control (natural disasters, pandemics, government orders).</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              6. Technical Requirements
            </Typography>
            <Typography>1. Users are solely responsible for ensuring stable internet connectivity during bookings.</Typography>
            <Typography>2. Bookings are confirmed only upon receipt of email/SMS confirmation. Report unconfirmed bookings within 15 minutes to [Support Email/Phone].</Typography>
          </ListItemContent>
        </ListItem>

        <Divider component="li" />

        <ListItem>
          <ListItemContent>
            <Typography level="h3" component="h2" sx={{ mb: 1.5 }}>
              10. Contact
            </Typography>
            <Typography>For inquiries, contact {support_email} / {support_phone}. Responses provided within 48 business hours.</Typography>
          </ListItemContent>
        </ListItem>
      </List>

      <Divider/>

      <Typography level="body-sm" sx={{ mt: 2, mb: 5}}>
        By using Golden Glaze, you acknowledge having read and agreed to these Terms.
      </Typography>
      
    </div>
  );
};

export default TermsAndConditions;
