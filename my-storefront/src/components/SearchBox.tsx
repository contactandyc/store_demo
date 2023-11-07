import React from 'react';

interface SearchBoxProps {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search products..."
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

export default SearchBox;
