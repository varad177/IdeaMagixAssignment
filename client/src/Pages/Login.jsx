import React, { useState } from "react";
import HomeLayouts from "../Layouts/homeLayouts";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../Redux/Slices/AuthSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    //dispatch create acc event
    const response = await dispatch(login(loginData));
    console.log("the res in s ", response);
    if (response?.payload?.success || response.success) {
      navigate("/");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayouts>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-[95%] shadow-[0_0_10px_black] md:w-96"
        >
          <h1 className="text-center font-bold text-2xl">Login Page</h1>

          
         

          
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={handleUserInput}
              value={loginData.email}
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
              value={loginData.password}
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
           Login
          </button>
          <p className="text-center">
           don't have account {" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
               sign-up
            </Link>{" "}
          </p>
        </form>
      </div>
    </HomeLayouts>
  );
};

export default Login;

// fullname, email, password
