import { useState, useEffect } from "react";
import { fetchHeroById, fetchMoreData } from "../services/api";

const useHeroDetails = (id) => {
  const [hero, setHero] = useState(null);
  const [homeworld, setHomeworld] = useState("");
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHeroDetails = async () => {
      setLoading(true);
      const data = await fetchHeroById(id);
      setHero(data);

      if (data.homeworld) {
        const homeworldData = await fetchMoreData(data.homeworld);
        setHomeworld(homeworldData.name);
      }
      if (data.films.length > 0) {
        const filmsData = [];
        for (const film of data.films) {
          const filmData = await fetchMoreData(film);
          filmsData.push(filmData.title);
        }
        setFilms(filmsData);
      }

      if (data.vehicles.length > 0) {
        const vehiclesData = [];
        for (const vehicle of data.vehicles) {
          const vehicleData = await fetchMoreData(vehicle);
          vehiclesData.push(vehicleData.name);
        }
        setVehicles(vehiclesData);
      }

      if (data.starships.length > 0) {
        const starshipsData = [];
        for (const starship of data.starships) {
          const starshipData = await fetchMoreData(starship);
          starshipsData.push(starshipData.name);
        }
        setStarships(starshipsData);
      }

      setLoading(false);
    };

    getHeroDetails();
  }, [id]);

  return { hero, homeworld, films, vehicles, starships, loading };
};

export default useHeroDetails;
