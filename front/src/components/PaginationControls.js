import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function Pagination({ page, setPage, pages, total }) {
  const [flipKey, setFlipKey] = React.useState(0);

  const springProps = useSpring({
    transform: `rotateY(${flipKey * 180}deg)`,
    transformOrigin: 'center',
    config: { tension: 260, friction: 25 },
  });

  const handleNext = () => {
    if (page >= pages) return;
    setPage(page + 1);
    setFlipKey((k) => k + 1);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
    setFlipKey((k) => k + 1);
  };

  return (
    <animated.div className="pagination" style={springProps}>
      <button disabled={page === 1} onClick={handlePrev}>
        Previous
      </button>
      <span>
        Page {page} of {pages} ({total} total)
      </span>
      <button disabled={page >= pages} onClick={handleNext}>
        Next
      </button>
    </animated.div>
  );
}

export default Pagination;
