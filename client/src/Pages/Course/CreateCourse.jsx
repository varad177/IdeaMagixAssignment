import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch,   useSelector } from "react-redux";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayouts from "../../Layouts/HomeLayouts";

const CreateCourse = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const [userInput, setuserInput] = useState({
    title: "",
    description: "",
    level: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setuserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  };



  const handleUserInput = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setuserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.level ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setuserInput({
        title: "",
        description: "",
        level: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });

      navigate("/courses");
    }
  
  };

  

  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[95vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center mt-8 gap-5 rounded-lg p-4  text-white w-[90%] my-10  shadow-[0_0_10px_black] relative md:w-[60%]"
        >
   
            <AiOutlineArrowLeft onClick={()=>navigate(-1)} className="absolute top-8 text-2xl link text-accent cursor-pointer" />
          

          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="flex flex-col justify-center items-center   gap-x-10 md:flex-row ">
            <div className=" gap-y-6 w-[90%] md:w-1/2">
              <div>
                <label htmlFor="imageUploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      className="w-full h-44 m-auto border "
                      alt=""
                    />
                  ) : (
                    <div className="w-full  h-44 m-auto border flex items-center justify-center">
                      <h1 className="font-bold text-lg ">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  name="imageUploads"
                  className="hidden"
                  id="imageUploads"
                  accept=".jpg , .jpeg , .png"
                  onChange={handleImageUpload}
                  
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold ">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className=" gap-y-6 w-[90%] md:w-1/2">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold ">
                  Created by
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter course Instructor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="level" className="text-lg font-semibold ">
                  level
                </label>
                <input
                  required
                  type="text"
                  name="level"
                  id="level"
                  placeholder="Enter course level"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.level}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold ">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  placeholder="Enter course description"
                  className="bg-transparent px-2 py-1 h-24  overflow-y-scroll resize-none  border"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out divide-blue-300 py-2 text-lg cursor-pointer rounded-sm font-semibold"
            type="submit"
          
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayouts>
  );
};
export default CreateCourse;
