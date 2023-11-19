import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

const HomeLayouts = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //for checking id user login
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  //for displaying the option acc to the role
  const role = useSelector((state) => state?.auth?.role);
  const url = useSelector((state) => state?.auth?.data?.avatar?.secure_url);
  console.log(url);

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const changeWidth = () => {
      const drawerSide = document.getElementsByClassName("drawer-side");
      drawerSide[0].style.width = 0;
    };
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await dispatch(logout());

    if (res?.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="min-h-[90vh]  bg-slate-800">
      {url ? (
        <div className="w-12 h-12 border rounded-full absolute right-[1rem] top-[0.5rem] overflow-hidden md:w-16 md:h-16 md:right-[1rem] md:top-[1rem]">
          <img onClick={()=>navigate("/user/profile")} className="cursor-pointer" src={url} alt="" />
        </div>
      ) : (
        <div className="w-16 h-16 border hidden rounded-full absolute right-[1.5rem] top-[1.5rem] overflow-hidden">
         
        </div>
      )}

      <div className="drawer absolute left-0 z-50 w-fit ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative ">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0  ">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-90 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50 ">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="w-fit  z-50 ">
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Panel</Link>
              </li>
            )}
            {isLoggedIn && role === "INSTRUCTOR" && (
              <li>
                <Link to="/instructor/dashboard">Instructor Panel</Link>
              </li>
            )}
            <li className="w-fit  z-50 ">
              <Link to="/courses">All courses</Link>
            </li>
          

            {!isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%] ">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/signup">sign-up</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className=" absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}

      <Footer />
    </div>
  );
};

export default HomeLayouts;
