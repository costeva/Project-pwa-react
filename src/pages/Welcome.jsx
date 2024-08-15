import React from "react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  const handleEnter = () => {
    navigate("/home");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <img
          src="/path-to-your-image.jpg" // Reemplaza con la ruta de tu imagen
          alt="Welcome"
          className="mx-auto mb-8 w-64 h-64 object-cover rounded-full"
        />
        <h1 className="text-5xl font-bold mb-6">Welcome to Star Wars</h1>
        <p className="text-lg mb-8">
          explore the different characters and their relevant information.
        </p>
        <button
          onClick={handleEnter}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Go to home
        </button>
      </div>
    </div>
  );
};

export default Welcome;
