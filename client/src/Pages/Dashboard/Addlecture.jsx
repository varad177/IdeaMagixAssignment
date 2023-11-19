import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCourseLectures } from "../../Redux/Slices/LecturesSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayouts from "../../Layouts/HomeLayouts";

const Addlecture = () => {
  const courseDetails = useLocation().state;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    title: "",
    description: "",
    instructor : "no"

  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };



  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.title || !userInput.description) {
      toast.error("All fields are required");
      return;
    }


    
    const response = await dispatch(addCourseLectures(userInput));
  
    if (response?.payload?.success) {
      navigate(-1)
      setUserInput({
        id: courseDetails._id,
        title: "",
        description: "",
        instructor :""
      });
    }
  };

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayouts>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-8 md:m-16 ">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-[99%] rounded-lg md:w-96">
          <header className="flex items-center justify-center relative ">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2  text-xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add New Lecture
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3 ">
            <input
              type="text"
              name="title"
              placeholder="Enter the title of the lecture"
              onChange={handleInputChange}
              className="bg-transparent py-1 px-3 border"
              value={userInput.title}
            />
            <textarea
              type="text"
              name="description"
              placeholder="Enter the description of the lecture"
              onChange={handleInputChange}
              className="bg-transparent py-1 px-3 border resize-none overflow-y-scroll"
              value={userInput.description}
            />

            

            <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">Add New Lecture</button>
          </form>
        </div>
      </div>
    </HomeLayouts>
  );
};

export default Addlecture;
