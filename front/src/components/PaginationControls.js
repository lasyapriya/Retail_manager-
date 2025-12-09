import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function Pagination({ page, setPage, pages, total }) {
  // Spring for flip animation on page change
  const [flipKey, setFlipKey] = React.useState(0);
  const springProps = useSpring({
    transform: `rotateY(${flipKey * 180}deg)`,
    config: { mass: 1, tension: 300, friction: 25 }, // Card flip bounce
  });

  const handleNext = () => {
    setPage(page + 1);
    setFlipKey(flipKey + 1); // Trigger flip
  };

  const handlePrev = () => {
    setPage(page - 1);
    setFlipKey(flipKey + 1);
  };

  return (
    <animated.div className="pagination" style={springProps}>
      <button disabled={page === 1} onClick={handlePrev}>Previous</button>
      <span>Page {page} of {pages} ({total} total)</span>
      <button disabled={page >= pages} onClick={handleNext}>Next</button>
    </animated.div>
  );
}

export default Pagination;
