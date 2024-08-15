import { useState, useEffect } from "react";
import { fetchHeroes } from "../services/api";

const useHeroes = (initialUrl) => {
  const savedPageUrl = sessionStorage.getItem("currentPageUrl") || initialUrl;
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(savedPageUrl);

  useEffect(() => {
    const loadHeroes = async () => {
      setLoading(true);
      try {
        const data = await fetchHeroes(currentPageUrl);
        if (data && Array.isArray(data.results)) {
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

    sessionStorage.setItem("currentPageUrl", currentPageUrl);
    loadHeroes();
  }, [currentPageUrl]);

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
    setHeroesDirectly: setHeroes,
  };
};

export default useHeroes;
