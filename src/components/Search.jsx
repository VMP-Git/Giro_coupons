import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger search on every change

    // If search bar is cleared, redirect to campaigns page
    if (value === "") {
      navigate("/campaigns"); // Reset to campaigns page
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          value={query}
          onChange={handleSearchChange} // Update search on change
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
