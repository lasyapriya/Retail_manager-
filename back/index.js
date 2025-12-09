const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

let data = [];

// Fetch and load CSV from Google Drive URL (publicly accessible)
const csvUrl = 'https://drive.google.com/uc?export=download&id=1tzbyuxBmrBwMSXbL22r33FUMtO0V_lxb';  // Use the file ID from the assignment link

async function loadData() {
  try {
    const response = await axios.get(csvUrl, { responseType: 'text' });
    const records = parse(response.data, { columns: true, skip_empty_lines: true });
    data = records;
    console.log('CSV loaded from URL:', data.length, 'records');
  } catch (error) {
    console.error('Failed to load CSV:', error.message);
    // Fallback: Load from local if available (for local dev)
    const fs = require('fs');
    if (fs.existsSync('data/truestate_assignment_dataset.csv')) {
      fs.createReadStream('data/truestate_assignment_dataset.csv')
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', () => console.log('CSV loaded locally:', data.length, 'records'));
    }
  }
}

// Call on startup
loadData();

// Get filter options
app.get('/api/options', (req, res) => {
  const options = {
    customerRegions: [...new Set(data.map(r => r['Customer Region']).filter(Boolean))],
    genders: [...new Set(data.map(r => r['Gender']).filter(Boolean))],
    productCategories: [...new Set(data.map(r => r['Product Category']).filter(Boolean))],
    tags: [...new Set(data.flatMap(r => (r['Tags'] || '').split(',').map(t => t.trim()).filter(Boolean)))],
    paymentMethods: [...new Set(data.map(r => r['Payment Method']).filter(Boolean))],
  };
  res.json(options);
});

// Get transactions with search, filter, sort, pagination
app.get('/api/transactions', (req, res) => {
  let { search = '', filters = '{}', sort = '', page = 1 } = req.query;
  try { filters = JSON.parse(filters); } catch { filters = {}; }
  page = parseInt(page);

  let result = [...data];

  // Search
  if (search) {
    const term = search.toLowerCase();
    result = result.filter(r =>
      r['Customer Name']?.toLowerCase().includes(term) ||
      r['Phone Number']?.toLowerCase().includes(term)
    );
  }

  // Filters
  if (filters.customerRegions?.length) result = result.filter(r => filters.customerRegions.includes(r['Customer Region']));
  if (filters.genders?.length) result = result.filter(r => filters.genders.includes(r['Gender']));
  if (filters.productCategories?.length) result = result.filter(r => filters.productCategories.includes(r['Product Category']));
  if (filters.paymentMethods?.length) result = result.filter(r => filters.paymentMethods.includes(r['Payment Method']));
  if (filters.tags?.length) result = result.filter(r => {
    const tags = (r['Tags'] || '').split(',').map(t => t.trim());
    return filters.tags.some(t => tags.includes(t));
  });
  if (filters.ageMin) result = result.filter(r => parseInt(r['Age'] || 0) >= filters.ageMin);
  if (filters.ageMax) result = result.filter(r => parseInt(r['Age'] || 0) <= filters.ageMax);
  if (filters.dateStart) result = result.filter(r => new Date(r['Date']) >= new Date(filters.dateStart));
  if (filters.dateEnd) result = result.filter(r => new Date(r['Date']) <= new Date(filters.dateEnd));

  // Sort
  if (sort === 'date_newest') result.sort((a, b) => new Date(b['Date']) - new Date(a['Date']));
  if (sort === 'quantity') result.sort((a, b) => (b['Quantity'] || 0) - (a['Quantity'] || 0));
  if (sort === 'customer_name_az') result.sort((a, b) => (a['Customer Name'] || '').localeCompare(b['Customer Name'] || ''));

  // Pagination
  const total = result.length;
  const pageSize = 10;
  const paginated = result.slice((page - 1) * pageSize, page * pageSize);

  res.json({ data: paginated, total, page, pages: Math.ceil(total / pageSize) });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
