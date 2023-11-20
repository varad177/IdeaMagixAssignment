import React, { useEffect, useState } from "react";
import HomeLayouts from "../../Layouts/HomeLayouts";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { assignLecture } from "../../Redux/Slices/LecturesSlice";
import {
  addinglecturestouser,
  getusernames,
} from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Assignlecture = () => {
  const { cid } = useParams();
  const { lid } = useParams();
  const dispatch = useDispatch();
  const [teachers, setTeachers] = useState(["varad", "amu", "ankita", "laki"]);
  const [data, setdata] = useState({
    selectedTeacher: "",
    date: "",
  });

  const names = useSelector((state) => state?.auth?.names);

  const lectures = useSelector((state) => state?.lectures);
  const gettingallnames = async () => {
    const res = dispatch(getusernames());
    toast.promise(res, {
      loading: "loading all instructor",
      success: "instructor loaded successfully",
      error: "Faild to loaded successfully ",
    });
  };

  useEffect(() => {
    gettingallnames();
    setBack(false)
  }, []);

  const onInputChange = async (e) => {
    console.log(e);

    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [userdata, setuserdata] = useState({
    selectedTeacher: "",
    date: "",
    cid: cid,
    lid: lid,
  });

  const navigate = useNavigate();
  const [back, setBack] = useState(false);

  const handleAssignLecture = async (e) => {
    e.preventDefault();
    // Implement the logic to assign the lecture to the selected teacher
    const res = await dispatch(assignLecture({ cid, lid, data }));
    console.log(res.payload.success);

    await dispatch(addinglecturestouser({ userdata }));
    setBack(true);
  };

  return (
    <HomeLayouts>
      <div className="h-[100vh] text-white flex items-center justify-center">
        {/* <h1>{cid}</h1>
        <h1>{lid}</h1> */}
        <form
          onSubmit={handleAssignLecture}
          className="flex items-center justify-center w-[80%]  shadow-[0_0_10px_black] flex-col gap-4"
        >
          <div className="max-w-md mx-auto mt-8 p-6 bg-transparent rounded-md">
            <h2 className="text-2xl font-bold mb-4">Lecture Assignment</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Select Teacher:
              </label>
              <select
                className="w-full text-white p-2 border rounded-md bg-transparent"
                onChange={(e) => onInputChange(e)}
                name="selectedTeacher"
              >
                <option className="text-black bg-transparent" value="">
                  Select a teacher
                </option>
                {names ? (
                  names.map((teacher) => (
                    <option
                      className=" text-black bg-transparent"
                      key={teacher._id}
                      value={teacher.name}
                    >
                      {teacher}
                    </option>
                  ))
                ) : (
                  <h1>wait </h1>
                )}
              </select>
              <br />
              <br />
              <label className="block text-sm font-semibold mb-2">
                Select Date:
              </label>
              <input
                onChange={(e) => onInputChange(e)}
                name="date"
                className="bg-transparent text-white border"
                type="date"
              />
            </div>

            <div className="flex gap-4 ">
              <button
                className="bg-blue-500 text-white px-8 py-2 rounded-md"
                type="submit"
              >
                Assign Lecture
              </button>
              {back && (
                <div
                  className="bg-green-500 text-white px-8 py-2 rounded-md"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </HomeLayouts>
  );
};

export default Assignlecture;
