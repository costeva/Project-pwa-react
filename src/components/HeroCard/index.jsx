import React from "react";
import { motion } from "framer-motion";

const HeroCard = ({ name, image, details }) => {
  return (
    <motion.div
      className="card rounded-lg shadow-md p-6 flex flex-col items-center bg-transparent"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={image}
        alt={name}
        className="rounded-md mb-4 w-full object-cover"
      />
      <h2 className="text-xl font-semibold text-blue-500 text-center">
        {name}
      </h2>
      <p className="text-gray-600 text-center">{details}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        More Info
      </button>
    </motion.div>
  );
};

export default HeroCard;
