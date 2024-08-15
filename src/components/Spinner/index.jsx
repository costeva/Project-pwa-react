import React from "react";
import yodaImage from "../../assets/pngwing.com.png";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <img
        src={yodaImage}
        alt="Loading..."
        className="w-32 h-32 animate-spin"
      />
    </div>
  );
};

export default Spinner;
