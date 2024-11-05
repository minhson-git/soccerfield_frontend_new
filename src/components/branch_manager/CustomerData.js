import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './CustomerData.css';

const customers = [
  { id: 1, name: 'Nguyen Huy', contact: 'nguyenhuy@gmail.com', phone: '0901234567', bookings: { 2024: 5, 2023: 2 }, lastBooking: '2024-09-15' },
  { id: 2, name: 'Son Tran', contact: 'sontran@gmail.com', phone: '0902345678', bookings: { 2024: 3, 2023: 4 }, lastBooking: '2024-08-22' },
  { id: 3, name: 'Quan Vo', contact: 'quanvo@gmail.com', phone: '0903456789', bookings: { 2024: 7, 2023: 3 }, lastBooking: '2024-07-10' },
  { id: 4, name: 'Phuc Tran', contact: 'phuctran@gmail.com', phone: '0904567890', bookings: { 2024: 2, 2023: 1 }, lastBooking: '2024-09-05' },
  { id: 5, name: 'Mark Nguyen', contact: 'marknguyen@gmail.com', phone: '0905678901', bookings: { 2024: 4, 2023: 5 }, lastBooking: '2024-06-12' },
  { id: 6, name: 'Minh Tran', contact: 'tranminh@gmail.com', phone: '0906789012', bookings: { 2024: 8, 2023: 6 }, lastBooking: '2024-10-01' },
  { id: 7, name: 'Duy Le', contact: 'duyle@gmail.com', phone: '0907890123', bookings: { 2024: 6, 2023: 7 }, lastBooking: '2024-09-18' },
  { id: 8, name: 'Tu Nguyen', contact: 'nguyentu@gmail.com', phone: '0908901234', bookings: { 2024: 10, 2023: 9 }, lastBooking: '2024-09-27' },
  { id: 9, name: 'Phan Huy', contact: 'phanhuy@gmail.com', phone: '0909012345', bookings: { 2024: 9, 2023: 5 }, lastBooking: '2024-10-02' },
  { id: 10, name: 'Minh Pham', contact: 'minhpham@gmail.com', phone: '0910123456', bookings: { 2024: 1, 2023: 3 }, lastBooking: '2024-08-01' },
];

const CustomerData = ({ searchTerm }) => {
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toString().includes(searchTerm)
  );

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="tableHeader">
              <TableCell className="tableHeaderCell">ID</TableCell>
              <TableCell className="tableHeaderCell">Name</TableCell>
              <TableCell className="tableHeaderCell">Contact</TableCell>
              <TableCell className="tableHeaderCell">Phone</TableCell>
              <TableCell className="tableHeaderCell">Bookings in 2024</TableCell>
              <TableCell className="tableHeaderCell">Bookings in 2023</TableCell>
              <TableCell className="tableHeaderCell">Last Booking</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id} className="tableRow">
                <TableCell className="tableCell">{customer.id}</TableCell>
                <TableCell className="tableCell">{customer.name}</TableCell>
                <TableCell className="tableCell">{customer.contact}</TableCell>
                <TableCell className="tableCell">{customer.phone}</TableCell>
                <TableCell className="tableCell">{customer.bookings[2024]}</TableCell>
                <TableCell className="tableCell">{customer.bookings[2023]}</TableCell>
                <TableCell className="tableCell">{customer.lastBooking}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerData;
