import express from "express";
import * as getAllPhotos from '../controllers/photo.js'

const router = express.Router();
router.get("/", getAllPhotos);

export default router;