import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function FilterPanel({ options, filters, setFilters }) {
  const handleMultiChange = (e, key) => {
    const selected = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFilters({ ...filters, [key]: selected });
  };

  // Spring for filter bounce on change
  const springProps = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    reset: true,
    config: { tension: 400, friction: 10 },
  });

  return (
    <animated.div className="filter-panel" style={springProps}>
      <h3>Filters</h3>
      <div>
        <label>Customer Region</label>
        <select multiple value={filters.customerRegions} onChange={(e) => handleMultiChange(e, 'customerRegions')}>
          {options.customerRegions?.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label>Gender</label>
        <select multiple value={filters.genders} onChange={(e) => handleMultiChange(e, 'genders')}>
          {options.genders?.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div>
        <label>Product Category</label>
        <select multiple value={filters.productCategories} onChange={(e) => handleMultiChange(e, 'productCategories')}>
          {options.productCategories?.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label>Tags</label>
        <select multiple value={filters.tags} onChange={(e) => handleMultiChange(e, 'tags')}>
          {options.tags?.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label>Payment Method</label>
        <select multiple value={filters.paymentMethods} onChange={(e) => handleMultiChange(e, 'paymentMethods')}>
          {options.paymentMethods?.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label>Age Range</label>
        <input
          type="number"
          placeholder="Min"
          value={filters.ageMin}
          onChange={(e) => setFilters({ ...filters, ageMin: e.target.value ? parseInt(e.target.value) : '' })}
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.ageMax}
          onChange={(e) => setFilters({ ...filters, ageMax: e.target.value ? parseInt(e.target.value) : '' })}
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
    </animated.div>
  );
}

export default FilterPanel;
