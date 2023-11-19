import { Router } from "express";
import {
  createCourse,
  getAllCourse,
  getLectureByCourseId,
  updateCourse,
  removeCourse,
  addLectureByCourseId,
  deleteLecture,
  assignLecture,
} from "../controllers/course.controller.js";
import upload from "../middleware/multer.middleware.js";
import { isBusy } from "../middleware/checkBusy.middleware.js";
const router = new Router();

// router.get('/', isLoggedIn, getAllCourse)
router
  .route("/")
  .get(getAllCourse)
  .post(upload.single("thumbnail"), createCourse)
  .delete( deleteLecture)
  .put(isBusy, assignLecture);

// router.get('/:id', getLectureByCourseId);

router
  .route("/:id")
  .get( getLectureByCourseId)
  .put(  updateCourse)
  .delete(removeCourse)
  .post(
    addLectureByCourseId
  );

export default router;
