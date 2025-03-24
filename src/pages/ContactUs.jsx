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

const ContactUs = () => {
    const imageUrl = `${window.location.origin}/logo.jpeg`;
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company_email: 'goldenglaze6@gmail.com',
    company_phone: '+91-9552990367'

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

    // EmailJS expects an object with template parameters.
    // Your EmailJS template should be configured to send the email to yadavsaurabh9923@gmail.com.
    emailjs.send(serviceID, templateID, formData, userID)
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setStatus('Your message has been sent successfully.');
        // Optionally reset the form
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, (error) => {
        console.error('There was an error sending the email:', error.text);
        setStatus('An error occurred while sending your message. Please try again later.');
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
      <Typography level="body-sm" sx={{ mb: 3 }}>
        Have questions or need assistance? Fill out the form below and we'll get back to you shortly.
      </Typography>

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
            minRows={4}
            value={formData.message}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" variant="solid">
          Send Message
        </Button>
      </Box>
      {status && (
        <Typography level="body-sm" sx={{ mt: 2 }}>
          {status}
        </Typography>
      )}
    </Box></>
  );
};

export default ContactUs;
