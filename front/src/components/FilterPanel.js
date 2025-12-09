import React from 'react';
import { useSpring, animated } from '@react-spring/web';

function FilterPanel({ options, filters, setFilters }) {
  const handleMultiChange = (e, key) => {
    const selected = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilters({ ...filters, [key]: selected });
  };

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateX(-10px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 280, friction: 20 },
  });

  return (
    <animated.div className="filter-panel" style={springProps}>
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Customer Region</label>
        <select
          multiple
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

      <div className="filter-group">
        <label>Gender</label>
        <select
          multiple
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

      <div className="filter-group">
        <label>Product Category</label>
        <select
          multiple
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

      <div className="filter-group">
        <label>Tags</label>
        <select
          multiple
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

      <div className="filter-group">
        <label>Payment Method</label>
        <select
          multiple
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

      <div className="filter-group">
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

      <div className="filter-group">
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
