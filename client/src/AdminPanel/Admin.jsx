import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayouts from "../Layouts/homeLayouts";
import { getusernames } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Admin = () => {
  const role = useSelector((state) => state?.auth?.role);
  const names = useSelector((state) => state?.auth?.names);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 useState(()=>{
  const res =  dispatch(getusernames());
  toast.promise(res, {
    loading: "loading all instructor",
    success: "instructor loaded successfully",
    error: "Faild to loaded successfully ",
  });
 },[])
  return (
    <HomeLayouts>
      <div className="h-[90vh] mt-0">
        <div className="container mx-auto flex items-center justify-center flex-col pt-8 ">
          <div className="flex w-[70%] justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Instructors</h2> 
           
            <button onClick={()=>navigate("/courses/create")} className="bg-blue-500 m-auto text-white px-4 py-2 rounded-md">
              Add Course
            </button>
          </div>

          <table className="w-[90%] border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Instructors Name</th>
              </tr>
            </thead>
            <tbody>
              {names &&
                names.map((instructor) => (
                  <tr key={instructor._id}>
                    <td className="border text-white text-2xl border-gray-400 px-4 py-4">
                      {instructor}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayouts>
  );
};

export default Admin;
