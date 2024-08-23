import axios from "axios";

export const fetchHeroes = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchHeroById = async (id) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchMoreData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
};
