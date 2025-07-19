// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
