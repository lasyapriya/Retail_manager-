import React from 'react';

function FilterPanel({ options, filters, setFilters }) {
  const handleMultiChange = (e, key) => {
    const selected = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilters({ ...filters, [key]: selected });
  };

  return (
    <div className="filter-panel panel">
      <h3>Filters</h3>

      <div>
        <label>Customer Region</label>
        <select
          multiple
          size={6}
          value={filters.customerRegions}
          onChange={(e) => handleMultiChange(e, 'customerRegions')}
        >
          {options.customerRegions?.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Gender</label>
        <select
          multiple
          size={3}
          value={filters.genders}
          onChange={(e) => handleMultiChange(e, 'genders')}
        >
          {options.genders?.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Product Category</label>
        <select
          multiple
          size={4}
          value={filters.productCategories}
          onChange={(e) => handleMultiChange(e, 'productCategories')}
        >
          {options.productCategories?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Tags</label>
        <select
          multiple
          size={6}
          value={filters.tags}
          onChange={(e) => handleMultiChange(e, 'tags')}
        >
          {options.tags?.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Payment Method</label>
        <select
          multiple
          size={5}
          value={filters.paymentMethods}
          onChange={(e) => handleMultiChange(e, 'paymentMethods')}
        >
          {options.paymentMethods?.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Age Range</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.ageMin}
          onChange={(e) =>
            setFilters({
              ...filters,
              ageMin: e.target.value ? parseInt(e.target.value, 10) : '',
            })
          }
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.ageMax}
          onChange={(e) =>
            setFilters({
              ...filters,
              ageMax: e.target.value ? parseInt(e.target.value, 10) : '',
            })
          }
        />
      </div>

      <div>
        <label>Date Range</label>
        <input
          type="date"
          value={filters.dateStart}
          onChange={(e) => setFilters({ ...filters, dateStart: e.target.value })}
        />
        <input
          type="date"
          value={filters.dateEnd}
          onChange={(e) => setFilters({ ...filters, dateEnd: e.target.value })}
        />
      </div>
    </div>
  );
}

export default FilterPanel;
