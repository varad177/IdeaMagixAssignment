import React, { useState } from "react";
import HomeLayouts from "../Layouts/homeLayouts";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
const Signup = () => {
  const [previewImage, setPreviwaImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupData, setSignUpData] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signupData, [name]: value });
  };

  const getImg = (e) => {
    e.preventDefault();
    //getting the img
    const uploadImg = e.target.files[0];
    if (uploadImg) {
      setSignUpData({
        ...signupData,
        avatar: uploadImg,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImg);
      fileReader.addEventListener("load", function () {
        setPreviwaImage(this.result);
      });
    }
  };

  const createNewAccount = async (e) => {
    e.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullname ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    //checking the name lenght
    if (signupData.fullname.length < 3) {
      toast.error("Name Should be atleast 3 character");
    }
    //checking valid email
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Envalid email Id");
      return;
    }

    //checking the password validation
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be 0-16 character long, with atleast 1 special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullname", signupData.fullname);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    //dispatch create acc event
    const response = await dispatch(createAccount(formData));
    console.log("the res in s ",response);
    if (response?.payload?.success || response.success) {
      navigate("/");
    }

    setSignUpData({
      fullname: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviwaImage("");
  };

  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-bold text-2xl">Registration Page</h1>

          <label htmlFor="image_uploads" className="cursor-pointer ">
            {previewImage ? (
              <img
                src={previewImage}
                alt=""
                className="w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImg}
            name="image-uploads"
            type="file"
            id="image_uploads"
            className="hidden "
            accept=".jpg , .jpeg , .png, .svg"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullname" className="font-semibold">
              Full Name
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.fullname}
              type="text"
              required
              name="fullname"
              id="fullname"
              placeholder="Enter Your fullname.."
              className="bg-transparent px-2 py-2 border"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.email}
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your Email.."
              className="bg-transparent px-2 py-2 border"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={handleUserInput}
              value={signupData.password}
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your password.."
              className="bg-transparent px-2 py-2 border"
            />
          </div>
          <button
            type="submit"
            className=" mt-2 w-full bg-yellow-600  hover:bg-yellow-700 transition-all ease-in-out duration-200 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Create Account
          </button>
          <p className="text-center">
            already have an account?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              login
            </Link>{" "}
          </p>
        </form>
      </div>
    </HomeLayouts>
  );
};

export default Signup;

// fullname, email, password
