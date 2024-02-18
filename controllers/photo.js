import { Photo,photoValidator } from "../models/photo.js";

export const getAllPhotos = async (req, res) => {
    try {
        let { numOfScreen, photosInScreen, textToSearch} = req.query;
        if (!photosInScreen)
            photosInScreen = 30;
        if (!numOfScreen)
            numOfScreen = 1;
        let search = {};
        if (textToSearch) {
            search = {
                $or: [{ model: { $regex: `.*${textToSearch}.*`, $options: 'i' } },
                { description: { $regex: `.*${textToSearch}.*`, $options: 'i' } }]
            };
        }
        let photos = await Photo.find(search).skip((numOfScreen - 1) * photosInScreen).limit(photosInScreen);
        res.json(photos);
    } catch (err) {
        res.status(400).send("problem: " + err.message);
    }
}

export const addNewPhoto = async (req, res) => {
    try {
        let { name, description, routingToImage, imageDetails } = req.body;
        let validate = photoValidator(req.body);
        let ownerUser = req.uuser._id;
        if (validate.error) {
            let errorMessages = [];
            validate.error.details.forEach((errorDetail) => {
                const { message, path } = errorDetail;
                const errorMessage = `${path.join('.')} ${message}`;
                errorMessages.push(errorMessage);
            });
            return res.status(400).send(errorMessages);
        };

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