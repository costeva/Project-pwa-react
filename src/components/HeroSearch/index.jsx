import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchHeroes } from "../../services/api";

const HeroFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebouncedCallback(async (query) => {
    if (query) {
      const results = await searchHeroes(query);
      onSearch(results);
    } else {
      onSearch([]);
    }
  }, 500); // retraso de 500 ms

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search heroes..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mb-6 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default HeroFilter;
