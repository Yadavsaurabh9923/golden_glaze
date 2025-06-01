import React from 'react';
import { Page, Text, View, Document, Link, StyleSheet } from '@react-pdf/renderer';
import {support_phone, support_email} from './../pages/configs';
import {BASE_UI_URL} from './BaseConfig'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  section: {
    marginBottom: 20,
  },
  table: { 
    width: '100%', 
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f7fafc',
    paddingVertical: 8,
  },
  tableCell: {
    width: '25%',
    paddingHorizontal: 4,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
  },
  link: {
    color: '#2b6cb0',
    textDecoration: 'underline',
    marginVertical: 3,
  },
});

const InvoiceDocument = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Golden Glaze</Text>
          <Text>       </Text>
          <Text>Golden Glaze Multi-purpose Turf,</Text>
          <Text>Pawaskarwadi, Kavilgaon,</Text>
          <Text>Near Kudal Railway Station,</Text>
          <Text>Nerur, Kudal, 416520</Text>
          <Text>   </Text>
          <Text style={{ fontWeight: 'bold'}}>Support Phone: {support_phone}</Text>
          <Text style={{ fontWeight: 'bold'}}>Support Email: {support_email}</Text>
        </View>
        <View>
          <Text style={styles.title}>Invoice</Text>
          <Text>       </Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
          <Text>Invoice : {booking.transaction_id}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ marginBottom: 8, fontWeight: 'bold'}}>Bill To:</Text>
        <Text>Name: {booking.name}</Text>
        <Text>Phone: {booking.phone_number}</Text>
        <Text>Email: {booking.email === 'noemail@example.com' ? '-' : booking.email}</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Date</Text>
          <Text style={styles.tableCell}>Time Slot</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Slot Booking</Text>
          <Text style={styles.tableCell}>{booking.date}</Text>
          <Text style={styles.tableCell}>{booking.startTime} - {booking.endTime}</Text>
          <Text style={styles.tableCell}>{booking.amount} INR</Text>
        </View>
      </View>

      <View style={{ textAlign: 'right' }}>
        <Text style={{ marginBottom: 8 }}>Subtotal: {booking.amount} INR</Text>
        <Text style={{ marginBottom: 8 }}>Tax: 0 INR</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Total: {booking.amount} INR</Text>
      </View>

      <View style={styles.section}>
        <View style={{ lineHeight: 1.5, marginLeft: 5 }}>
          <Link href={`${BASE_UI_URL}/terms-and-conditions`}>
            <Text style={styles.link}>• Terms & Conditions</Text>
          </Link>
          <Link src={`${BASE_UI_URL}/privacy-policy`}>
            <Text style={styles.link}>• Privacy Policy</Text>
          </Link>
          <Link src={`${BASE_UI_URL}/refunds-cancellations`}>
            <Text style={styles.link}>• Refunds & Cancellations</Text>
          </Link>
          <Link src={`${BASE_UI_URL}/shipping-and-delivery`}>
            <Text style={styles.link}>• Shipping & Delivery</Text>
          </Link>
          <Link src={`${BASE_UI_URL}/contact-us`}>
            <Text style={styles.link}>• Contact Us</Text>
          </Link>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;