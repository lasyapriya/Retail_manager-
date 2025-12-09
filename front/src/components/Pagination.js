import React from 'react';

function PaginationControls({ page, setPage, pages, total }) {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <span>Page {page} of {pages} ({total} total)</span>
      <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default PaginationControls;
