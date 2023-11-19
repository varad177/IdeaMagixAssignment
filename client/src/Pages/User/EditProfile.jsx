import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateprofile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import HomeLayouts from "../../Layouts/HomeLayouts";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    previewImage: "",
    fullname: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });
  const id = useSelector((state) => state?.auth?.data?._id);

  useEffect(() => {
    console.log(id);
  }, []);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadImage,
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullname || !data.avatar) {
      toast.error("All fields are mandotary");
      return;
    }

    if (data.fullname.length < 5) {
      toast.error("name length cannot be less that 5 character");
      return;
    }

    console.log("the data is " , data);

    let formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("avatar", data.avatar);

     console.log("The fD is ", formData);
    const id = data?.userId;

    const EditData = {
      id : id,
      data : formData
    }
    await dispatch(updateprofile(EditData));

    await dispatch(getUserData(id));

    navigate("/user/profile");
  };
  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold ">Edit Profile</h1>
          <label htmlFor="image_upload" className="cursor-pointer">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="image_upload"
            accept=".jpg, .svg, .png, .jpeg"
            name="image_upload"
          />

          <div className="flex flex-col gap-1 ">
            <label htmlFor="fullname" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullname"
              id="fullname"
              placeholder="Enter Your Full Name"
              value={data.fullname}
              onChange={handleInputChange}
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-sm py-2 text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
          >
            Update Profile
          </button>
          <Link to="/user/profile">
            <p
              className="link text-accent cursor-pointer flex items-center justify-center w-full g-2
          "
            >
              Go Back To Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayouts>
  );
};
export default EditProfile;
