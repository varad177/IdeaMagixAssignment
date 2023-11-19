import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-[#1A2238]">
      <h1 className="text-9xl text-white font-extrabold tracking-widest ">
        404
      </h1>
      \
      <div className="bg-black text-white px-2 text-sm rotate-12 absolute">
        Page Not Found...
      </div>
      <button className="mt-5 text-white">
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group : active:text-yellow-500 focus:outline-node focus:ring-4">
          <span onClick={()=>navigate(-1)} className="relative block px-6 py-3 bg-[#1A2238] border border-current">
            {" "}
            go back
          </span>
        </a>
      </button>
    </div>
  );
};

export default NotFound;
