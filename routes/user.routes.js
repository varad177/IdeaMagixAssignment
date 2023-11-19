import { Router } from "express";
import {  getProfile, login, logout  , updateuser, getallnames, addlecInfo, resister} from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js";
import { isBusy } from "../middleware/checkBusy.middleware.js";

const router = Router()


// resister
router.post("/resister", upload.single('avatar') , resister);

// login
router.post("/login" , login);

//logout
router.get("/logout" , logout);

//to show profile
router.get("/me/:id", getProfile);
router.get("/allnames", getallnames);
router.post("/addlecInfo",isBusy, addlecInfo);



router.put('/update/:id'  , upload.single("avatar") , updateuser)

export default router