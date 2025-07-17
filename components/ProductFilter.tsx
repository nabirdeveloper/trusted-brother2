'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  category: string;
  minPrice: string;
  maxPrice: string;
  search: string;
}

export default function ProductFilter({ categories, onFilterChange, initialFilters }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || {
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
    }
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.category !== 'all' || filters.minPrice || filters.maxPrice || filters.search;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">Search</label>
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="text-sm font-medium mb-3 block">Category</label>
          <div className="space-y-2">
            <Button
              variant={filters.category === 'all' ? 'default' : 'outline'}
              size="sm"
              className="w-full justify-start"
              onClick={() => handleFilterChange('category', 'all')}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start"
                onClick={() => handleFilterChange('category', category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-sm font-medium mb-3 block">Price Range</label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
              <Input
                type="number"
                placeholder="1000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <label className="text-sm font-medium mb-2 block">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('category', 'all')}
                  />
                </Badge>
              )}
              {filters.minPrice && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Min: ${filters.minPrice}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('minPrice', '')}
                  />
                </Badge>
              )}
              {filters.maxPrice && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Max: ${filters.maxPrice}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('maxPrice', '')}
                  />
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  "{filters.search}"
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('search', '')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}