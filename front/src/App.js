import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortingDropdown from './components/SortingDropdown';
import TransactionTable from './components/TransactionTable';
import PaginationControls from './components/PaginationControls';

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

  return (
    <div className="app">
      <SearchBar value={search} onChange={setSearch} />
      <div className="main">
        <FilterPanel options={options} filters={filters} setFilters={setFilters} />
        <div className="content">
          <SortingDropdown value={sort} onChange={setSort} />
          <TransactionTable data={transactions} />
          <PaginationControls page={page} setPage={setPage} pages={pages} total={total} />
        </div>
      </div>
    </div>
  );
}

export default App;
