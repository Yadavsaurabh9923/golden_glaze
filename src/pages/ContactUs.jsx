import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Breadcrumbs
} from '@mui/joy';
import emailjs from 'emailjs-com';
import Header from '../components/Header'
import LinearProgress from '@mui/joy/LinearProgress';
import Stack from '@mui/joy/Stack';
import {support_email, support_phone} from './configs'
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

const ContactUs = () => {
    const imageUrl = `${window.location.origin}/logo.jpeg`;
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company_email: support_email,
    company_phone: support_phone

  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace these values with your EmailJS credentials
    const serviceID = 'service_crhoalh';
    const templateID = 'template_cvv3u1b';
    const userID = 'WQatokEkadCq3PkN9';
    setStatus('');
    setLoading(true);

    // For the actual email sending (uncomment when ready):
    emailjs.send(serviceID, templateID, formData, userID)
      .then((result) => {
        setStatus('Your message has been sent successfully.');
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company_email: support_email,
          company_phone: support_phone
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error sending the email:', error.text);
        setStatus('An error occurred while sending your message. Please try again later.');
        setLoading(false);
      });
  };

  return (
    <><Header></Header>
    <Box className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs sx={{ mb: 0, ml: -1, mt:8}}>
      <Link component={Link} to="/" variant="plain" color="neutral">
          Home
        </Link>
        <Typography>Contact Us</Typography>
      </Breadcrumbs>

      <Typography level="h1" component="h1" sx={{ mb: 1 }}>
        Contact Us
      </Typography>
      <Typography level="body-sm" sx={{ mb: 2 }}>
        Have questions or need assistance? Fill out the form below and we'll get back to you shortly.
      </Typography>
      
      {loading && <LinearProgress size="sm" sx={{ mb: 2, color: 'primary' }} />}

      {status && 
      (<Alert
        variant="solid"
        color="success"
        startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
        sx={{mb:2}}>
        {status}
      </Alert>)}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <FormControl required>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Subject</FormLabel>
          <Input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl required>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            placeholder="Your message"
            minRows={3}
            value={formData.message}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" variant="solid" disabled={loading}>
          Send Message
        </Button>
      </Box>
      
    </Box></>
  );
};

export default ContactUs;
