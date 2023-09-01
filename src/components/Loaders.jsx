import React from "react";
import { ClipLoader } from "react-spinners";

function Loaders({ message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-80 bg-blur-sm">
      <ClipLoader color="#6b7abd" speedMultiplier={0.8} />
      {message && <h1 className="mt-10">{message}</h1>}
    </div>
  );
}

export default Loaders;
