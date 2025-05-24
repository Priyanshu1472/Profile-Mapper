import { Search } from 'lucide-react';
import '../styles/SearchBar.css'; // Assuming you have a CSS file for styles

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search by name or description..." }) => {
  return (
    <div className="search-bar-container">
      <Search className="search-bar-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
