import axios from "axios";

export const fetchHeroes = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getInitialHeroes = async () => {
  return await fetchHeroes("https://swapi.dev/api/people/");
};

export const searchHeroes = async (query) => {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error search ", error);
    return [];
  }
};

export const fetchHeroById = async (id) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchMoreData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
