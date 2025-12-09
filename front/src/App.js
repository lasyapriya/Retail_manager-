// front/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    axios
      .get(`${API}/options`)
      .then((res) => setOptions(res.data))
      .catch((err) => console.error('Error loading options', err));
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
      .then((res) => {
        setTransactions(res.data.data);
        setTotal(res.data.total);
        setPages(res.data.pages);
      })
      .catch((err) => console.error('Error loading transactions', err));
  }, [search, filters, sort, page]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">TruEstate Retail Sales</h1>
        <p className="app-subtitle">
          A clear, interactive view of your retail transactions – filter, sort and explore in real time.
        </p>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      <main className="layout">
        {/* Left – filters pinned to left edge */}
        <aside className="sidebar">
          <FilterPanel options={options} filters={filters} setFilters={setFilters} />
        </aside>

        {/* Right – table + controls */}
        <section className="workspace">
          <div className="toolbar-row">
            <SortingDropdown value={sort} onChange={setSort} />
          </div>

          <div className="panel panel-table">
            <TransactionTable data={transactions} />
          </div>

          <div className="panel panel-footer">
            <Pagination page={page} setPage={setPage} pages={pages} total={total} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
