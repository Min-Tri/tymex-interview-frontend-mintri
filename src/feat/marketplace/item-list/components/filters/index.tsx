import React, { useState, useEffect } from 'react';
import { Input, Select, Slider, Button, Radio } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { TFilter } from '@/lib/types';
const { Option } = Select;

interface FiltersProps {
  filters: TFilter;
  onFilterChange: (filters: TFilter) => void;
  onFilterReset: () => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  filters, 
  onFilterChange = () => {},
  onFilterReset 
}) => {
  const [localSearch, setLocalSearch] = useState(filters?.search || '');
  const [priceRange, setPriceRange] = useState<number[]>(filters?.priceRange || [0, 400]);

  useEffect(() => {
    setLocalSearch(filters?.search || '');
    setPriceRange(filters?.priceRange || [0, 400]);
  }, [filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);

    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search: value });
    }, 300);
    
    return () => clearTimeout(timer);
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value as any });
  };

  const handleRarityChange = (value: string) => {
    onFilterChange({ ...filters, rarity: value as any });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceAfterChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: value });
  };

  const handleSortByTimeChange = (e: any) => {
    onFilterChange({ ...filters, sortByTime: e.target.value });
  };

  const handleSortByPriceChange = (e: any) => {
    onFilterChange({ ...filters, sortByPrice: e.target.value });
  };

  return (
    <div className="bg-background-card rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">Search</h2>
        <Input
          placeholder="Quick search"
          prefix={<SearchOutlined className="text-gray-400" />}
          value={localSearch}
          onChange={handleSearchChange}
          className="bg-background-dark border-gray-700 text-white"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">PRICE</h2>
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
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">Category</h2>
        <Select
          placeholder="All"
          style={{ width: '100%' }}
          value={filters?.category || undefined}
          onChange={handleCategoryChange}
          allowClear
          className="bg-background-dark"
        >
          <Option value="Upper Body">Upper Body</Option>
          <Option value="Lower Body">Lower Body</Option>
          <Option value="Hat">Hat</Option>
          <Option value="Shoes">Shoes</Option>
          <Option value="Accessory">Accessory</Option>
        </Select>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">TIER</h2>
        <Select
          placeholder="All"
          style={{ width: '100%' }}
          value={filters?.rarity || undefined}
          onChange={handleRarityChange}
          allowClear
          className="bg-background-dark"
        >
          <Option value="Common">Common</Option>
          <Option value="Rare">Rare</Option>
          <Option value="Epic">Epic</Option>
          <Option value="Legendary">Legendary</Option>
          <Option value="Mythic">Mythic</Option>
        </Select>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">THEME</h2>
        <Select
          placeholder="All"
          style={{ width: '100%' }}
          value={filters?.theme || undefined}
          onChange={handleRarityChange}
          allowClear
          className="bg-background-dark"
        >
          <Option value="halloween">Halloween</Option>
          <Option value="beach">Beach</Option>
          <Option value="new-year">New Year</Option>
          <Option value="valentine">Valentine</Option>
          <Option value="default">Default</Option>
        </Select>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">TIME</h2>
        <Select
          placeholder="All"
          style={{ width: '100%' }}
          value={filters?.sortByTime || undefined}
          onChange={handleSortByTimeChange}
          allowClear
          className="bg-background-dark"
        >
          <Option value="latest">Latest</Option>
          <Option value="oldest">Oldest</Option>
        </Select>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-lg font-medium mb-4">PRICE</h2>
        <Select
          placeholder="All"
          style={{ width: '100%' }}
          value={filters?.sortByPrice || undefined}
          onChange={handleSortByPriceChange}
          allowClear
          className="bg-background-dark"
        >
          <Option value="price-asc">Low to High</Option>
          <Option value="price-desc">High to Low</Option>
        </Select>
      </div>

      <Button
        icon={<ReloadOutlined />}
        onClick={onFilterReset}
        className="w-full bg-primary text-white border-none hover:bg-primary-dark"
      >
        Reset filter
      </Button>
    </div>
  );
};

export default Filters;