import React from 'react';

function TransactionTable({ data }) {
  if (data.length === 0) {
    return <p>No results found.</p>;
  }

  const columns = [
    'Customer ID', 'Customer Name', 'Phone Number', 'Gender', 'Age', 'Customer Region', 'Customer Type',
    'Product ID', 'Product Name', 'Brand', 'Product Category', 'Tags',
    'Quantity', 'Price per Unit', 'Discount Percentage', 'Total Amount', 'Final Amount',
    'Date', 'Payment Method', 'Order Status', 'Delivery Type', 'Store ID', 'Store Location', 'Salesperson ID', 'Employee Name'
  ];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => <td key={col}>{row[col] || ''}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
