const express = require('express');
const cors = require('cors');
const axios = require('axios');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

let data = [];

// Google Drive direct download link
const csvUrl = 'https://truestate-dataset.onrender.com/dataset.csv';
async function loadData() {
  console.log('Starting to load CSV from Google Drive...');
  try {
    const response = await axios({
      method: 'GET',
      url: csvUrl,
      responseType: 'stream'
    });

    const records = [];
    response.data
      .pipe(csv())
      .on('data', (row) => records.push(row))
      .on('data', () => process.stdout.write('.')) // Show progress
      .on('end', () => {
        data = records;
        console.log('\nCSV loaded successfully:', data.length, 'records');
      })
      .on('error', (err) => {
        console.error('CSV parsing error:', err.message);
      });
  } catch (error) {
    console.error('Failed to download CSV:', error.message);
  }
}

// Load data on startup
loadData();

// API: Get filter options
app.get('/api/options', (req, res) => {
  if (data.length === 0) {
    return res.status(503).json({ message: 'Data still loading...' });
  }
  const options = {
    customerRegions: [...new Set(data.map(r => r['Customer Region']).filter(Boolean))].sort(),
    genders: [...new Set(data.map(r => r['Gender']).filter(Boolean))].sort(),
    productCategories: [...new Set(data.map(r => r['Product Category']).filter(Boolean))].sort(),
    tags: [...new Set(data.flatMap(r => (r['Tags'] || '').split(',').map(t => t.trim()).filter(Boolean)))].sort(),
    paymentMethods: [...new Set(data.map(r => r['Payment Method']).filter(Boolean))].sort(),
  };
  res.json(options);
});

// API: Get transactions with search, filter, sort, pagination
app.get('/api/transactions', (req, res) => {
  if (data.length === 0) {
    return res.status(503).json({ data: [], total: 0, page: 1, pages: 0 });
  }

  let { search = '', filters = '{}', sort = '', page = 1 } = req.query;
  try { filters = JSON.parse(filters); } catch { filters = {}; }
  page = parseInt(page) || 1;

  let result = [...data];

  // Search
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(r =>
      (r['Customer Name'] || '').toLowerCase().includes(term) ||
      (r['Phone Number'] || '').toLowerCase().includes(term)
    );
  }

  // Filters
  if (filters.customerRegions?.length) result = result.filter(r => filters.customerRegions.includes(r['Customer Region']));
  if (filters.genders?.length) result = result.filter(r => filters.genders.includes(r['Gender']));
  if (filters.productCategories?.length) result = result.filter(r => filters.productCategories.includes(r['Product Category']));
  if (filters.paymentMethods?.length) result = result.filter(r => filters.paymentMethods.includes(r['Payment Method']));
  if (filters.tags?.length) {
    result = result.filter(r => {
      const rowTags = (r['Tags'] || '').split(',').map(t => t.trim());
      return filters.tags.some(tag => rowTags.includes(tag));
    });
  }
  if (filters.ageMin) result = result.filter(r => parseInt(r['Age'] || 0) >= filters.ageMin);
  if (filters.ageMax) result = result.filter(r => parseInt(r['Age'] || 0) <= filters.ageMax);
  if (filters.dateStart) result = result.filter(r => new Date(r['Date'] || '1900-01-01') >= new Date(filters.dateStart));
  if (filters.dateEnd) result = result.filter(r => new Date(r['Date'] || '1900-01-01') <= new Date(filters.dateEnd));

  // Sort
  if (sort === 'date_newest') result.sort((a, b) => new Date(b['Date'] || 0) - new Date(a['Date'] || 0));
  if (sort === 'quantity') result.sort((a, b) => (parseInt(b['Quantity'] || 0)) - (parseInt(a['Quantity'] || 0)));
  if (sort === 'customer_name_az') result.sort((a, b) => (a['Customer Name'] || '').localeCompare(b['Customer Name'] || ''));

  // Pagination
  const pageSize = 10;
  const total = result.length;
  const paginated = result.slice((page - 1) * pageSize, page * pageSize);

  res.json({ data: paginated, total, page, pages: Math.ceil(total / pageSize) });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Visit: ${process.env.RENDER_EXTERNAL_URL || 'http://localhost:5000'}`);
});
