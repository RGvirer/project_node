import express from "express";
import * as photoController from '../controllers/photo.js';
import { adminAuth } from "../middlewares/authAdmin.js";

const router = express.Router();
router.get("/", photoController.getAllPhotos);
router.post("/",adminAuth,photoController.addNewPhoto);
export default router;