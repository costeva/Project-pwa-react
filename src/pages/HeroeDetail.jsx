import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useHeroDetails from "../hooks/useHeroDetails";

const HeroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hero, homeworld, films, vehicles, starships, loading } =
    useHeroDetails(id);
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="text-white">
          <div className="container mx-auto p-4 max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Back
            </button>
          </div>
          <div
            className="relative bg-cover bg-center h-80"
            style={{
              backgroundImage: `url(https://starwars-visualguide.com/assets/img/characters/${id}.jpg)`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-5xl font-bold">{hero.name}</h1>
            </div>
          </div>

          <div className="relative -mt-16">
            <div className="container mx-auto p-4 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg max-w-4xl">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                  alt={hero.name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg"
                />
                <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                  <ul className="space-y-2">
                    <li>
                      <strong>Height:</strong> {hero.height} cm
                    </li>
                    <li>
                      <strong>Mass:</strong> {hero.mass} kg
                    </li>
                    <li>
                      <strong>Hair Color:</strong> {hero.hair_color}
                    </li>
                    <li>
                      <strong>Skin Color:</strong> {hero.skin_color}
                    </li>
                    <li>
                      <strong>Eye Color:</strong> {hero.eye_color}
                    </li>
                    <li>
                      <strong>Birth Year:</strong> {hero.birth_year}
                    </li>
                    <li>
                      <strong>Gender:</strong> {hero.gender}
                    </li>
                    <li>
                      <strong>Homeworld:</strong> {homeworld}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto p-4 mt-8 max-w-4xl space-y-8">
            <Section title="Films" items={films} />
            <Section title="Vehicles" items={vehicles} />
            <Section title="Starships" items={starships} />
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, items }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg"
          >
            {item}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No {title.toLowerCase()} data.</p>
      )}
    </div>
  </div>
);

export default HeroDetail;
