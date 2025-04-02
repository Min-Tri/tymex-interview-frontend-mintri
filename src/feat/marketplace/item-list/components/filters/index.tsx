import React, { useState, useEffect } from 'react';
import { Select, Slider } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { TFilter } from '@/lib/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const { Option } = Select;

const FILTER_OPTIONS = {
  // CATEGORIES: [
  //   'Upper Body',
  //   'Lower Body',
  //   'Hat',
  //   'Shoes',
  //   'Accessory'
  // ],
  TIER: [
    'Common',
    'Rare',
    'Epic',
    'Legendary',
    'Mythic'
  ],
  THEME: [
    { value: 'halloween', label: 'Halloween' },
    { value: 'beach', label: 'Beach' },
    { value: 'new-year', label: 'New Year' },
    { value: 'valentine', label: 'Valentine' },
    { value: 'default', label: 'Default' }
  ],
  TIME: [
    { value: 'latest', label: 'Latest' },
    { value: 'oldest', label: 'Oldest' }
  ],
  PRICE: [
    { value: 'price-asc', label: 'Low to High' },
    { value: 'price-desc', label: 'High to Low' }
  ]
};

const useFilterState = (initialFilters: TFilter, onFilterChange: (filters: TFilter) => void) => {
  const [localSearch, setLocalSearch] = useState(initialFilters?.search || '');
  const [priceRange, setPriceRange] = useState<number[]>(initialFilters?.priceRange || [0, 400]);

  useEffect(() => {
    setLocalSearch(initialFilters?.search || '');
    setPriceRange(initialFilters?.priceRange || [0, 400]);
  }, [initialFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    const timer = setTimeout(() => {
      onFilterChange({ ...initialFilters, search: value });
    }, 300);
    return () => clearTimeout(timer);
  };

  return {
    localSearch,
    priceRange,
    setPriceRange,
    handleSearchChange
  };
};

// Subcomponents
const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-white text-lg font-medium mb-4">{title}</h2>
    {children}
  </div>
);

interface FiltersProps {
  filters: TFilter;
  onFilterChange: (filters: TFilter) => void;
  onFilterReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange = () => { },
  onFilterReset
}) => {
  const {
    localSearch,
    priceRange,
    setPriceRange,
    handleSearchChange
  } = useFilterState(filters, onFilterChange);

  const handleSelectChange = (key: keyof TFilter) => (value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceAfterChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  return (
    <div className="bg-background-card rounded-lg px-6 pb-6 shadow-lg">
        <Input
          placeholder="Quick search"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={localSearch}
          onChange={handleSearchChange}
          className="bg-background-dark !border-gray-700 text-white mb-5"
        />

      <FilterSection title="PRICE">
        <Slider
          range
          min={0}
          max={400}
          step={0.01}
          value={priceRange}
          onChange={handlePriceChange}
          onChangeComplete={handlePriceAfterChange}
          tooltip={{ formatter: (value) => `${value} ETH` }}
        />
        <div className="flex justify-between text-gray-400 mt-2">
          <span>{priceRange[0]} ETH</span>
          <span>{priceRange[1]} ETH</span>
        </div>
      </FilterSection>

      {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
        <FilterSection key={key} title={key.replace('_', ' ')}>
          <Select
            placeholder="All"
            style={{ width: '100%' }}
            value={filters[key.toLowerCase() as keyof TFilter]?.toString()}
            onChange={handleSelectChange(key.toLowerCase() as keyof TFilter)}
            allowClear
            className="bg-background-dark"
          >
            {Array.isArray(options) && options.map(option => (
              typeof option === 'string' ? (
                <Option key={option} value={option}>{option}</Option>
              ) : (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              )
            ))}
          </Select>
        </FilterSection>
      ))}

      <Button
        icon={<ReloadOutlined />}
        onClick={onFilterReset}
        className="w-full border-none hover:bg-primary-dark"
      >
        Reset filter
      </Button>
    </div>
  );
};

export default Filters;
