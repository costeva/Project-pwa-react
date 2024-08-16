import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const HeroFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handelsSearch = useDebouncedCallback(async (term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, 400);

  return (
    <input
      type="text"
      placeholder="Search heroes..."
      defaultValue={searchParams.get("search")?.toString()}
      onChange={(e) => handelsSearch(e.target.value)}
      className="w-full p-2 mb-6 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default HeroFilter;
