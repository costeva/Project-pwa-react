import React from "react";
import { motion } from "framer-motion";

const HeroCard = ({ name, image, details }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 max-w-xs text-center transform transition-transform hover:scale-105"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={image} alt={name} className="rounded-md mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-blue-500">{name}</h2>
      <p className="text-gray-600">{details}</p>
    </motion.div>
  );
};

export default HeroCard;
