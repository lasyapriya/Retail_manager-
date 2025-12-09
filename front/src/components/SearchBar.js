import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function SearchBar({ value, onChange }) {
  const [isFocused, setIsFocused] = React.useState(false);

  const springProps = useSpring({
    width: isFocused ? '100%' : '80%', // Elastic stretch
    config: { mass: 1, tension: 300, friction: 15 }, // Bouncy
  });

  return (
    <animated.div className="search-bar" style={springProps}>
      <input
        type="text"
        placeholder="Search by customer name or phone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
    </animated.div>
  );
}

export default SearchBar;
