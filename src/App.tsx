import { Routes, Route } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import BasicGrid from './components/Homepage'
import React from 'react'
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundsAndCancellations from './pages/RefundsAndCancellations';
import ShippingDeliveryPolicy from './pages/ShippingAndDelivery'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/" element={<BasicGrid />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refunds-cancellations" element={<RefundsAndCancellations />} />
        <Route path="/shipping-and-delivery" element={<ShippingDeliveryPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/logo" element={<ContactUs />} />
      </Routes>
    </CssVarsProvider>
  )
}

export default App