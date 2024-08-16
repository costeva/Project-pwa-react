import React from "react";
import imagFooter from "../../assets/offiline.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-yellow-500 py-6 border-t-2 border-yellow-500 text-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center space-x-4">
          <img src={imagFooter} alt="Star Wars Logo" className="w-10 h-10" />
          <p className="font-bold text-lg tracking-widest">
            Creator: Alexis Costedoat
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
