import React from 'react';

function Pagination({ page, setPage, pages, total }) {
  const handleNext = () => {
    if (page >= pages) return;
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={handlePrev}>
        Previous
      </button>
      <span>
        Page {page} of {pages} ({total} total)
      </span>
      <button disabled={page >= pages} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
