import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
    </div>
  );
}

export default SearchBar;
