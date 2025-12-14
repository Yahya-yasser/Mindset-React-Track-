import { useState } from "react";
import "../styles/SearchCard.css";

function SearchCard({ onSearch }) {
  const [idNumber, setIdNumber] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIdNumber(value);
    onSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(idNumber);
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="رقم البطاقة ..."
          value={idNumber}
          onChange={handleInputChange}
          className="search-input"
          dir="rtl"
          maxLength="16"
        />
        <button type="submit" className="search-button">
          بحث
        </button>
      </form>
    </div>
  );
}

export default SearchCard;
