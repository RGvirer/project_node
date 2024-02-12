import express from "express";
import * as photoController from '../controllers/photo.js';
import { adminAuth } from "../middlewares/authAdmin";

const router = express.Router();
router.get("/", photoController.getAllPhotos);
router.post("/",adminAuth,photoController.addNewPhoto);
export default router;
