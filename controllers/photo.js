import mongoose from "mongoose";
import { Photo } from "../models/photo.js";
export const getAllPhotos = async (req, res) => {
    try {
        let allPhotos =  await Photo.find();
        res.json(allPhotos);
    }
    catch (err) {
        res.status(400).send("not all photos are available " + err.message);
    }
}