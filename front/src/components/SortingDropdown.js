import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function SortingDropdown({ value, onChange }) {
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 260, friction: 20 },
  });

  return (
    <animated.div className="sorting-dropdown" style={springProps}>
      <label>Sort by</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">None</option>
        <option value="date_newest">Date (Newest First)</option>
        <option value="quantity">Quantity (High to Low)</option>
        <option value="customer_name_az">Customer Name (A–Z)</option>
      </select>
    </animated.div>
  );
}

export default SortingDropdown;
