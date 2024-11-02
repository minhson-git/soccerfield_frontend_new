import React from 'react';

const customers = [
  {
    id: 1,
    name: 'Nguyen Huy',
    contact: 'nguyenhuy@gmail.com',
    phone: '0901234567',
    bookings: { 2024: 5, 2023: 2 },
    lastBooking: '2024-09-15',
  },
  {
    id: 2,
    name: 'Son Tran',
    contact: 'sontran@gmail.com',
    phone: '0902345678',
    bookings: { 2024: 3, 2023: 4 },
    lastBooking: '2024-08-22',
  },
  {
    id: 3,
    name: 'Quan Vo',
    contact: 'quanvo@gmail.com',
    phone: '0903456789',
    bookings: { 2024: 7, 2023: 3 },
    lastBooking: '2024-07-10',
  },
  {
    id: 4,
    name: 'Phuc Tran',
    contact: 'phuctran@gmail.com',
    phone: '0904567890',
    bookings: { 2024: 2, 2023: 1 },
    lastBooking: '2024-09-05',
  },
  {
    id: 5,
    name: 'Mark Nguyen',
    contact: 'marknguyen@gmail.com',
    phone: '0905678901',
    bookings: { 2024: 4, 2023: 5 },
    lastBooking: '2024-06-12',
  },
  {
    id: 6,
    name: 'Minh Tran',
    contact: 'tranminh@gmail.com',
    phone: '0906789012',
    bookings: { 2024: 8, 2023: 6 },
    lastBooking: '2024-10-01',
  },
  {
    id: 7,
    name: 'Duy Le',
    contact: 'duyle@gmail.com',
    phone: '0907890123',
    bookings: { 2024: 6, 2023: 7 },
    lastBooking: '2024-09-18',
  },
  {
    id: 8,
    name: 'Tu Nguyen',
    contact: 'nguyentu@gmail.com',
    phone: '0908901234',
    bookings: { 2024: 10, 2023: 9 },
    lastBooking: '2024-09-27',
  },
  {
    id: 9,
    name: 'Phan Huy',
    contact: 'phanhuy@gmail.com',
    phone: '0909012345',
    bookings: { 2024: 9, 2023: 5 },
    lastBooking: '2024-10-02',
  },
  {
    id: 10,
    name: 'Minh Pham',
    contact: 'minhpham@gmail.com',
    phone: '0910123456',
    bookings: { 2024: 1, 2023: 3 },
    lastBooking: '2024-08-01',
  },
];

const CustomerData = ({ searchTerm }) => {
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.id.toString().includes(searchTerm)
  );

  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.tableHeader}>
          <th>ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Phone</th>
          <th>Bookings in 2024</th>
          <th>Bookings in 2023</th>
          <th>Last Booking</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => (
          <tr key={customer.id} style={styles.tableRow}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.contact}</td>
            <td>{customer.phone}</td>
            <td>{customer.bookings[2024]}</td>
            <td>{customer.bookings[2023]}</td>
            <td>{customer.lastBooking}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '12px',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  },
};

export default CustomerData;
