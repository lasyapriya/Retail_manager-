import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function SearchBar({ value, onChange }) {
  const [isFocused, setIsFocused] = React.useState(false);

  const springProps = useSpring({
    transform: isFocused ? 'translateY(-2px)' : 'translateY(0px)',
    boxShadow: isFocused
      ? '0 22px 55px rgba(59,130,246,0.75)'
      : '0 18px 40px rgba(0,0,0,0.65)',
    config: { tension: 260, friction: 18 },
  });

  return (
    <animated.div className="search-wrapper" style={springProps}>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by customer name or phone..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </animated.div>
  );
}

export default SearchBar;

