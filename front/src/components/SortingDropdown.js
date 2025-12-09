import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function SortingDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const springProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 400, friction: 10, overshootClamping: false }, // Pop with overshoot
  });

  return (
    <animated.div className="sorting-dropdown" style={springProps} onClick={() => setIsOpen(!isOpen)}>
      <label>Sort by: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">None</option>
        <option value="date_newest">Date (Newest First)</option>
        <option value="quantity">Quantity (High to Low)</option>
        <option value="customer_name_az">Customer Name (A-Z)</option>
      </select>
    </animated.div>
  );
}

export default SortingDropdown;
