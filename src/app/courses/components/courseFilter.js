'use client';
import { useState } from "react";
import { Filter, ChevronDown } from 'lucide-react';

function FilterDropdown({ options, selected, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F8] focus:ring-2 focus:ring-[#F2A900] focus:border-transparent min-w-[160px]"
      >
        <span className="text-sm text-gray-700">
          {selected || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#0B3C5D] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-[#FFFFFF] border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F4F6F8] hover:text-[#0B3C5D] first:rounded-t-lg last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CourseFilters() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');

  const categories = ['All Categories', 'Technology', 'Business', 'Design', 'Marketing', 'Healthcare', 'Education'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const prices = ['All Prices', 'Free', 'Under Rs. 5,000', 'Rs. 5,000 - Rs. 10,000', 'Above Rs. 10,000'];

  return (
    <div className="bg-[#FFFFFF]/80 backdrop-blur-sm shadow-lg border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 bg-[#0B3C5D] text-white px-4 py-2 rounded-lg hover:bg-[#092F49] transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isFilterOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Desktop Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <FilterDropdown
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
                placeholder="Category"
              />
              <FilterDropdown
                options={levels}
                selected={selectedLevel}
                onSelect={setSelectedLevel}
                placeholder="Level"
              />
              <FilterDropdown
                options={prices}
                selected={selectedPrice}
                onSelect={setSelectedPrice}
                placeholder="Price"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2A900] focus:border-transparent bg-[#FFFFFF]">
              <option>Sort by: Popularity</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Newest</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}