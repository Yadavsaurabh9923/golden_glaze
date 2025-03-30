import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Cookies from 'js-cookie';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/material/Divider';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import SlotTooltip from './SlotTooltip';
import Bill from './Bill';
import logo from '../assets/images/logo.jpeg'
import AlertWithDecorators from './ErrorAlert'
import { useNavigate } from 'react-router-dom'; // For routing
import {BASE_URL} from '../components/BaseConfig'
import LinearProgress from '@mui/joy/LinearProgress';

export default function CheckoutModal({ open, onClose, selectedSlots, totalPrice, slotPrices, selectedDate}) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [alertBox, setAlertBox] = React.useState(false);
  const [alertBoxMessage, setAlertBoxMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate(); // For routing

  const [isSaved, setIsSaved] = React.useState(true);

  // Load user details from cookies on modal open
  React.useEffect(() => {
    if (open) {
      setName(Cookies.get('GoldenGlaze_userName') || '');
      setPhone(Cookies.get('GoldenGlaze_userPhone') || '');
      setEmail(Cookies.get('GoldenGlaze_userEmail') || '');
    }
  }, [open]);

  // Save user details to cookies
  const saveCookiesData = () => {
    Cookies.set('GoldenGlaze_userName', name, { expires: 7 });
    Cookies.set('GoldenGlaze_userPhone', phone, { expires: 7 });
    if (email) Cookies.set('GoldenGlaze_userEmail', email, { expires: 7 });
  };

  const generateTransactionId = () => {
    return `TXN_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  };

  const completeCheckout = async () => {
    setIsLoading(true);
    // Saving cookies data
    saveCookiesData();

    // Name Check
    if(name.length<1){
      setAlertBoxMessage("Please enter a valid name!");
      setAlertBox(true);
      setIsLoading(false);
      return;
    }

    // Number Check
    if(phone.length<10 || phone.length>10){
      setAlertBoxMessage("Please enter a valid phone!");
      setAlertBox(true)
      setIsLoading(false);
      return
    }

    // Email (is entered) Check
    if(email.length>0){
      if(!isValidEmail()){
        setAlertBoxMessage("Please enter a valid email!");
        setAlertBox(true)
        setIsLoading(false);
        return;
      }
    }

    setAlertBoxMessage(null);
    setAlertBox(false);

    try{
      const createBookingData = await createBooking("Hold");

      if(createBookingData.detail.length<1){
        await handlePayment(createBookingData);
      }
      else{
        setAlertBoxMessage(createBookingData.detail);
        setAlertBox(true);
      }
    }
    catch (error) {
      console.error("Error in creating booking:", error);
      alert("Error processing payment. Try again.");
    }

    setIsLoading(false);
  }
  
  // Generate a unique transaction ID
  const transactionId = generateTransactionId();

  const createBooking = async (userStatus) =>{
    // SEND API Request to book slots
    const bookedSlots = [...new Set([...selectedSlots.morningValues, ...selectedSlots.afternoonValues, ...selectedSlots.nightValues])].sort((a, b) => a - b)
    // Make API call

    const bookingData = {
      start_time: bookedSlots[0],
      end_time: (bookedSlots[bookedSlots.length - 1]+0.5),
      amount: totalPrice,
      email: email || "noemail@example.com", // Default if empty
      phone_number: phone,
      name: name,
      status: userStatus,
      date: selectedDate,
      transaction_id: transactionId
    };

    try {
      const response = await fetch(`${BASE_URL}/create_booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();
  
      if (!response.ok) {
        return responseData
      }

      return responseData;
    } 
    catch (error) {
      setAlertBoxMessage(error.message);
      alert(error.message)
      setAlertBox(true);
      setIsLoading(false);
    }
  }

  const confirmBooking = async (bookingData1) =>{
    try {
      const response = await fetch(`${BASE_URL}/confirm_booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData1),
      });
  
      const responseData = await response.json();

      if (!response.ok) {
        await cancelBooking(bookingData1);
      }
      
    } 
    catch (error) {
      setAlertBoxMessage(error.message);
      alert(error.message)
      setAlertBox(true);
      setIsLoading(false);
      await cancelBooking(bookingData1);
    }
  }

  const cancelBooking = async (bookingData1) =>{
    try {
      const response = await fetch(`${BASE_URL}/cancel_booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData1),
      });
  
      const result = await response.json();

      if (!response.ok) {
        return result;
        setIsLoading(false);
      }
      
    } 
    catch (error) {
      setAlertBoxMessage(error.message);
      alert(error.message)
      setAlertBox(true);
    }
    setIsLoading(false);
  }

  const closeAlertBox = () => {
    setAlertBox(false);
  }

  // Function to check Email
  function isValidEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
  
// RAZOR PAY

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handlePayment = async (createBookingData) => {
  // Remove validateForm() check since validations are already in completeCheckout
  const isRazorpayLoaded = await loadRazorpayScript();
  if (!isRazorpayLoaded) {
    alert("Failed to load Razorpay. Check your internet connection.");
    setIsLoading(false);
    return;
  }

  const options = {
    key: "rzp_live_MTERReTkQmrdnh", // Replace with your actual Razorpay API Key ORignal Key
    // key: "rzp_test_kuhZJZX5qOQ9QQ",
    amount: totalPrice * 100, // Use totalPrice prop instead of slotDetails
    currency: "INR",
    name: "Golden Glaze Turf",
    description: "Turf Booking Payment",
    image: logo, // Use imported logo
    handler: async function (response) {
      // Handle successful payment here
      await confirmBooking(createBookingData);
      navigate(`/payment-success?transactionId=${transactionId}`);
    },
    prefill: {
      name: name,
      contact: phone, // Fix variable name from phoneNumber to phone
      email: email || "noemail@example.com",
    },
    theme: {
      color: "#0B6BCB",
    },
    modal: {
      escape: false,
      ondismiss: async function () {
        // On dismissal, route to failure page
        await cancelBooking(createBookingData);
        navigate(`/payment-failed?transactionId=${transactionId}`);
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
    onClose();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
    alert("Error processing payment. Try again.");
    setIsLoading(false);
  }
};


return (
  <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-desc"
    open={open}
    onClose={onClose}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <Sheet
      variant="outlined"
      sx={{
        minWidth: 320,
        maxWidth: 500,
        maxHeight: '90vh', // Prevents modal from growing too tall
        overflowY: 'auto', // Enables vertical scrolling
        borderRadius: 'md',
        p: 3,
        boxShadow: 'lg',
      }}
    >
      <ModalClose variant="plain" sx={{ m: 1.5 }} onClick={onClose} />
      <Typography id="modal-title" level="h3" sx={{ fontWeight: 'lg', mb: 2 }}>
        Booking Summary
      </Typography>

      {/* {isLoading && (<LinearProgress size="sm" />)} */}
      
      <Card
        variant="soft"
        orientation="horizontal"
        sx={{
          mt:2,
          width: 260,
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src={logo}
            srcSet={logo}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-lg" id="card-description">
            Golden Glaze Turf
          </Typography>
          <Typography level="body-sm" aria-describedby="card-description" sx={{ mb: 1 }}>
            <Link overlay underline="none" sx={{ color: 'neutral.900' }}>
            {selectedDate 
              ? new Date(selectedDate.split('-').reverse().join('-'))
                  .toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) 
              : 'No Date selected'}
            </Link>
          </Typography>
          <SlotTooltip selectedSlots={selectedSlots} />
        </CardContent>
      </Card>

      

      {/* User Input Fields */}
      <FormControl sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>

        <Bill selectedSlots={selectedSlots} totalPrice={totalPrice} slotPrices={slotPrices}/>
        
        <Divider sx={{mt:1, mb:1}}></Divider>

        {alertBox && (<AlertWithDecorators message={alertBoxMessage} closeAlertLabel={closeAlertBox}></AlertWithDecorators>)}

        <FormLabel sx={{mt:1}}>Name*</FormLabel>
        <Input
          required
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 1 }}
        />

        <FormLabel>Phone Number*</FormLabel>
        <Input
          required
          type="tel"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ mb: 1 }}
        />

        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter your Email ID (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 1 }}
        />

        <Checkbox
          label="Save"
          checked={isSaved}
          onChange={(e) => setIsSaved(e.target.checked)}
          sx={{ mb: 2, mt: 1, width: '100%' }}
        />

      </FormControl>

      {/* Buttons */}
      <Button color="primary" loading={isLoading} sx={{ width: '100%', mb:3, height:"50px", fontSize: '1.1rem'}} onClick={completeCheckout}>
        PAY
      </Button>
      
    </Sheet>
  </Modal>
);
}
