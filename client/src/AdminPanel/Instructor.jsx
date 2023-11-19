import React, { useState } from "react";
import HomeLayouts from "../Layouts/HomeLayouts";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Redux/Slices/AuthSlice";

const Instructor = () => {

  const dispatch = useDispatch()
  const id = useSelector((state) => state?.auth?.data?._id);


    const user = useSelector((state)=>state?.auth?.data)
    useState( async()=>{
      await dispatch(getUserData(id));

    },[])
  return (
    <HomeLayouts>
      <div className="min-h-[90vh]">
        <div className="container mx-auto pt-8">
          <h2 className="text-2xl font-bold mb-4">User Lecture Information</h2>

         
            <div key={user._id} className="mb-8">
              <h3 className="text-4xl text-yellow-500 font-semibold">
                {user.fullname}'s Lectures
              </h3>
              <table className="w-full border-collapse border border-gray-800 mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">
                      Course Name
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Lecture Name
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {user.lectures && user.lectures.map((lecture, index) => (
                    <tr key={index}>
                      <td className="border text-white border-gray-400 px-4 py-2">
                        {lecture.coursename}
                      </td>
                      <td className="border text-white border-gray-400 px-4 py-2">
                        {lecture.lecturename}
                      </td>
                      <td className="border text-white border-gray-400 px-4 py-2">
                        {<div>{new Date(lecture.date).getDate()} / {new Date(lecture.date).getMonth()} / {new Date(lecture.date).getFullYear()}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          
        </div>
      </div>
    </HomeLayouts>
  );
};

export default Instructor;
