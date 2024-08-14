import axios from "axios";

export const fetchHeroes = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/people/");
    return response.data.results;
  } catch (error) {
    console.error("Error fetch: ", error);
    return [];
  }
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
