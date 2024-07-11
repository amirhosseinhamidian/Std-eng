import React, { createContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('All publisher');
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [filterError, setFiltersError] = useState(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        selectedPublisher,
        setSelectedPublisher,
        selectedDisciplines,
        setSelectedDisciplines,
        publishers,
        setPublishers,
        disciplines,
        setDisciplines,
        filterError,
        setFiltersError,
        isFilterLoading,
        setIsFilterLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
