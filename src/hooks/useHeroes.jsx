import { useState, useEffect } from "react";
import { fetchHeroes } from "../services/api";
import Swal from "sweetalert2";
const useHeroes = (initialUrl) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(() => {
    return sessionStorage.getItem("currentPageUrl") || initialUrl;
  });

  const loadHeroes = async (url) => {
    setLoading(true);
    try {
      const data = await fetchHeroes(url);
      if (data && Array.isArray(data.results)) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        if (urlParams.has("search") && data.results.length === 0) {
          Swal.fire({
            title: "No results found",
            text: "No heroes matched your search.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
        setHeroes(data.results);
        setNextPageUrl(data.next || null);
        setPreviousPageUrl(data.previous || null);
      } else {
        setHeroes([]);
      }
    } catch (error) {
      console.error(error);
      setHeroes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("currentPageUrl", currentPageUrl);
    loadHeroes(currentPageUrl);
  }, [currentPageUrl]);

  useEffect(() => {
    setCurrentPageUrl(initialUrl);
  }, [initialUrl]);

  const goToNextPage = () => {
    if (nextPageUrl && currentPageUrl !== nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    }
  };

  const goToPreviousPage = () => {
    if (previousPageUrl && currentPageUrl !== previousPageUrl) {
      setCurrentPageUrl(previousPageUrl);
    }
  };

  return {
    heroes,
    loading,
    goToNextPage,
    goToPreviousPage,
    nextPageUrl,
    previousPageUrl,
  };
};

export default useHeroes;
