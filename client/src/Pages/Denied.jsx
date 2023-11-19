import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate()
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center bg-slate-900">
      <h1 className="text-9xl text-white tracking-widest">403</h1>
      <div className="bg-black text-white px-2 text-sm rounded-sm rotate-12 absolute">Access Denied</div>
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

export default Denied;
