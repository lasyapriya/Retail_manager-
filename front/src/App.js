import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';

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
    axios.get(`${API}/transactions`, {
      params: {
        search,
        filters: JSON.stringify(filters),
        sort,
        page,
      }
    }).then(res => {
      setTransactions(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages);
    }).catch(() => {});
  }, [search, filters, sort, page]);

  // Spring animation for overall layout pop/transition on data change
  const springProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.98)' },
    to: { opacity: 1, transform: 'scale(1)' },
    reset: true, // Reset on every data change
    config: { mass: 1, tension: 280, friction: 20 }, // Bouncy physics
  });

  return (
    <animated.div style={springProps} className="app">
      <SearchBar value={search} onChange={setSearch} />
      <div className="main">
        <FilterPanel options={options} filters={filters} setFilters={setFilters} />
        <div className="content">
          <SortingDropdown value={sort} onChange={setSort} />
          <TransactionTable data={transactions} />
          <Pagination page={page} setPage={setPage} pages={pages} total={total} />
        </div>
      </div>
    </animated.div>
  );
}

export default App;
