import React from 'react';
import '../styles/SearchBar.css'; // Assuming you have a CSS file for styles

const SearchResults = ({ searchTerm, resultCount, totalCount }) => {
  return (
    <div className="search-results">
      <p>
        {searchTerm ? (
          <>
            Found <span className="result-count">{resultCount}</span>
            {resultCount === 1 ? ' profile' : ' profiles'} matching "
            <span className="highlight-term">{searchTerm}</span>"
          </>
        ) : (
          <>
            Showing <span className="result-count">{totalCount}</span> profiles
          </>
        )}
      </p>
    </div>
  );
};

export default SearchResults;
