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

export const addNewPhoto = async (req, res) => {
    try {
        let { name, description, routingToImage, imageDetails } = req.body;
        let validate = photoValidator(req.body);
        let ownerUser = req.uuser._id;
        if (validate.error) {
            for (let i = 0; i < validate.error.length; i++) {
                console.log(validate.error[i]);
            }
            return res.status(400).json(validate.error[0]);
        }

        let samePhotos = await Photo.find(req.body);
        if (samePhotos.length > 0)
            return res.status(409).send("this photo already exists ");
        let newPhoto = new Photo({ name, description, routingToImage, imageDetails, ownerUser });
        await newPhoto.save();
        res.status(201).json(newPhoto)
    }
    catch (err) {
        res.status(400).send("an error occured in: " + err.message);
    }
}