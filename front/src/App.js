import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionTable from './components/TransactionTable';
import PaginationControls from './components/PaginationControls'; // or PaginationControls – just keep the import & filename in sync

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [options, setOptions] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    customerRegions: [],
    genders: [],
    productCategories: [],
    tags: [],
    paymentMethods: [],
    ageMin: '',
    ageMax: '',
    dateStart: '',
    dateEnd: '',
  });
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios.get(`${API}/options`).then(res => setOptions(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/transactions`, {
        params: {
          search,
          filters: JSON.stringify(filters),
          sort,
          page,
        },
      })
      .then(res => {
        setTransactions(res.data.data);
        setTotal(res.data.total);
        setPages(res.data.pages);
      })
      .catch(() => {});
  }, [search, filters, sort, page]);

  // Only translate / blur (no scale) so zoom + sticky header work nicely
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(16px)', filter: 'blur(10px)' },
    to: { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' },
    reset: true,
    config: { mass: 1, tension: 260, friction: 22 },
  });

  return (
    <animated.div style={springProps} className="app">
      <header className="app-header">
        <div className="app-title">TruEstate Retail Sales</div>
        <p className="app-subtitle">
          Explore transactions with royal clarity – search, filter and sort through your retail universe.
        </p>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      <div className="main-layout">
        <FilterPanel options={options} filters={filters} setFilters={setFilters} />

        <div className="content">
          <div className="toolbar-row">
            <SortingDropdown value={sort} onChange={setSort} />
          </div>

          <div className="table-card">
            <TransactionTable data={transactions} />
          </div>

          <PaginationControls page={page} setPage={setPage} pages={pages} total={total} />
        </div>
      </div>
    </animated.div>
  );
}

export default App;
