import express from "express";
import * as photoController from '../controllers/photo.js'

const router=express.Router();
router.get("/",photoController.getAllPhotos);

export default router;