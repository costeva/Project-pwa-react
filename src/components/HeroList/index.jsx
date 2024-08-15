import HeroCard from "../HeroCard";
import HeroFilter from "../HeroSearch";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import useHeroes from "../../hooks/useHeroes";
const HeroList = () => {
  const {
    heroes,
    loading,
    goToNextPage,
    goToPreviousPage,
    nextPageUrl,
    previousPageUrl,
    setHeroesDirectly,
  } = useHeroes("https://swapi.dev/api/people/");
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  const handleSearchResults = (results) => {
    if (Array.isArray(results) && results.length > 0) {
      setHeroesDirectly(results);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="container mx-auto p-4">
          <HeroFilter onSearch={handleSearchResults} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroes.map((hero) => {
              const id = hero.url.split("/").filter(Boolean).pop();
              const imageUrl = `${imageBaseUrl}${id}.jpg`;
              return (
                <Link to={`/people/${id}`} key={id}>
                  <HeroCard
                    name={hero.name}
                    image={imageUrl}
                    details={`Height: ${hero.height} | Mass: ${hero.mass}`}
                    id={id}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={!previousPageUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={!nextPageUrl}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroList;
