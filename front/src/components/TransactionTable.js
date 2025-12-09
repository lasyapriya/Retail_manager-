import React from 'react';
import { useTrail, animated } from '@react-spring/web';

function TransactionTable({ data }) {
  if (!data || data.length === 0) {
    return <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>No results found.</p>;
  }

  const columns = [
    'Customer ID',
    'Customer Name',
    'Phone Number',
    'Gender',
    'Age',
    'Customer Region',
    'Customer Type',
    'Product ID',
    'Product Name',
    'Brand',
    'Product Category',
    'Tags',
    'Quantity',
    'Price per Unit',
    'Discount Percentage',
    'Total Amount',
    'Final Amount',
    'Date',
    'Payment Method',
    'Order Status',
    'Delivery Type',
    'Store ID',
    'Store Location',
    'Salesperson ID',
    'Employee Name',
  ];

  const trail = useTrail(data.length, {
    from: { opacity: 0, transform: 'translateY(12px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 1, tension: 220, friction: 20 },
  });

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trail.map((style, index) => (
          <animated.tr key={index} style={style}>
            {columns.map((col) => (
              <td key={col}>{data[index][col] ?? ''}</td>
            ))}
          </animated.tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
