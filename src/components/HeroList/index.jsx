import HeroCard from "../HeroCard";
import HeroFilter from "../HeroSearch";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner";
import useHeroes from "../../hooks/useHeroes";
import { motion } from "framer-motion";

const HeroList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const {
    heroes,
    loading,
    goToNextPage,
    goToPreviousPage,
    nextPageUrl,
    previousPageUrl,
  } = useHeroes("https://swapi.dev/api/people/?search=" + search);
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="container mx-auto p-4">
          <HeroFilter />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-14">
            {heroes.map((hero) => {
              const id = hero.url.split("/").filter(Boolean).pop();
              const imageUrl = `${imageBaseUrl}${id}.jpg`;
              return (
                <Link to={`/people/${id}`} key={id}>
                  <HeroCard
                    name={hero.name}
                    image={imageUrl}
                    details={`Height: ${hero.height} | Mass: ${hero.mass} | gender: ${hero.gender} | films: ${hero.films.length}`}
                    id={id}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <motion.button
              onClick={goToPreviousPage}
              disabled={!previousPageUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Previous
            </motion.button>
            <motion.button
              onClick={goToNextPage}
              disabled={!nextPageUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Next
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroList;
