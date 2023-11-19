import Course from "../models/course.model.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";
import User from "../models/user.model.js";
const getAllCourse = async (req, res, next) => {
  try {
    const course = await Course.find({}).select("-lectures");
    if (!course) {
      res.status(400).json({
        success: false,
        message: "couses are not available",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Courses",
      course,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Internal server Error",
    });
  }
};

const getLectureByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "lectures are not available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "course lecture fetch successfully",
      course,
      lectures: course.lectures,
    });
  } catch (e) {}
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, level, createdBy } = req.body;
    console.log(title, description, level);

    if (!title || !description || !level || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      level,
      createdBy,
      thumbnail: {
        public_id: "dummy",
        secure_url: "dummy",
      },
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course Could not be created",
      });
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });
        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: e.message,
        });
      }
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error white creating course",
    });
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
        //check the date and update which will send by the user
      },
      {
        runValidators: true,
        //this is used for the checking the schema
      }
    );

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist",
      });
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "course updated successfully",
      course,
    });
  } catch (e) {
    return res.status(400).json({
      success: e.message,
      message: "Course Could not be updated",
    });
  }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("update id", id);
    const course = Course.findById(id);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course does not exist",
      });
    }

    await Course.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "course removed successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: e.message,
      message: "Course Could not be removed",
    });
  }
};

const addLectureByCourseId = async (req, res, next) => {
  try {
    const { title, description, instructor } = req.body;
    const { id } = req.params;

    console.log(title, description);

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "please provides all fields",
      });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "course not exist",
      });
    }

    const lectureData = {
      title,
      description,
      instructor,
    };

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    const lectureList = course.lectures;
    await course.save();

    res.status(200).json({
      success: true,
      message: "lecture successfuly added to the course",
      lectureList,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteLecture = async (req, res, next) => {
  try {
    const { courseid, lectureid } = req.query;

    if (!courseid) {
      return res.status(400).json({
        success: false,
        message: "course id not present ",
      });
    }

    if (!lectureid) {
      return res.status(400).json({
        success: false,
        message: "lecture id not present ",
      });
    }
    const course = await Course.findById(courseid);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID ",
      });
    }

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureid.toString()
    );

    if (lectureIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "lecture does not exist ",
      });
    }

    course.lectures.splice(lectureIndex, 1);
    course.numberOfLectures = course.lectures.length;
    await course.save();
    res.status(200).json({
      success: true,
      message: "Course lecture removed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const assignLecture = async (req, res, next) => {
  try {
    const { cid, lid } = req.query;
    const { selectedTeacher , date } = req.body;

  

   
      const instructor = selectedTeacher;

     
    

      if(!instructor || !date){
        return res.status(400).json({
          success: false,
          message: "fill all details",
        });
      }
    if (!cid) {
      return res.status(400).json({
        success: false,
        message: "course id not present ",
      });
    }

    if (!lid) {
      return res.status(400).json({
        success: false,
        message: "lecture id not present ",
      });
    }

  

    const course = await Course.findById(cid);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID ",
      });
    }

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lid.toString()
    );

    if (lectureIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "lecture does not exist ",
      });
    }

    // course.lectures.splice(lectureIndex, 1);
    const { lectures } = course;
    //  console.log(lectures[0]._id == lid);


    for (let i = 0; i < lectures.length; i++) {
      if (lectures[i]._id == lid) {
        course.lectures[i].instructor = instructor;
        course.lectures[i].date = date;
      
      }
    }

    // console.log(course);

    await course.save();
    res.status(200).json({
      success: true,
      message: "Course lecture removed successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getAllCourse,
  getLectureByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureByCourseId,
  deleteLecture,
  assignLecture,
};
