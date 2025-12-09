import React from 'react';

function SortingDropdown({ value, onChange }) {
  return (
    <div className="sorting-dropdown">
      <label>Sort by: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">None</option>
        <option value="date_newest">Date (Newest First)</option>
        <option value="quantity">Quantity (High to Low)</option>
        <option value="customer_name_az">Customer Name (A-Z)</option>
      </select>
    </div>
  );
}

export default SortingDropdown;
