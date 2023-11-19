import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayouts from "../Layouts/homeLayouts";
import { Link, useNavigate } from "react-router-dom";
;
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);
  


  return (
    <HomeLayouts>
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-[95%] shadow-[0_0_10px_black] md:w-[50%]">
          <img
            src={userData?.avatar?.secure_url}
            alt=""
            className="w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center text-white capitalize">
            {userData?.fullname}
          </h3>
          <div className="grid grid-cols-2 ">
            <p>Email: </p> <p>{userData?.email}</p>
            <p>Role: </p> <p>{userData?.role}</p>
  
          </div>
          <div className="flex items-center justify-between gap-2 ">
           
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
         
        </div>
      </div>
    </HomeLayouts>
  );
};

export default Profile;
