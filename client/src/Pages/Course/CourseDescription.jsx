import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayouts from "../../Layouts/homeLayouts";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { role, data } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(state._id);
  }, []);

  const removedCourse = async () => {
    await dispatch(deleteCourse(state._id));
    navigate("/courses");
    dispatch(getAllCourse());
  };

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] pt-12 px-20 flex items-center justify-center  max-[800px]:p-0">
        <div className="flex w-[90%] flex-col gap-10 py-10 relative md:flex-row mt-4 ">
          <div className="space-y-5 w-full md:w-1/2">
            <img
              src={state?.thumbnail.secure_url}
              alt="thunbnail loading "
              className="w-full h-64"
            />
            <div className="space-y-5">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold text-white">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures: {"  "}
                  </span>
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold text-white">
                  <span className="text-yellow-500 font-bold">
                    Instructor: {"  "}
                  </span>
                  {state?.createdBy}
                </p>
              </div>
          
                <button
                  onClick={() =>
                    navigate("/course/displaylecture", {
                      state: { ...state },
                    })
                  }
                  className="text-xl text-white bg-yellow-600 rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Go To Lecture Section
                </button>
             

              {role === "ADMIN" && (
                <div className="flex gap-4">
                  <button
                    onClick={removedCourse}
                    className="text-xl text-white bg-red-600 rounded-md font-bold px-5 py-3 w-full hover:bg-red-500 transition-all ease-in-out duration-300"
                  >
                    Delete course
                  </button>
                  <button
                    onClick={() =>
                      navigate("/course/update", { state: { ...state } })
                    }
                    className="text-xl text-white bg-red-600 rounded-md font-bold px-5 py-3 w-full hover:bg-red-500 transition-all ease-in-out duration-300"
                  >
                    update course
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xl w-full md:w-1/2">
            <h1 className=" text-4xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title}
            </h1>
            <p className="text-yellow-500 ">course Description : </p>
            <p className="text-white">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayouts>
  );
};

export default CourseDescription;
