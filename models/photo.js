import joi from "joi"
import mongoose from "mongoose"
import { productSchema } from "./product";

// mongoose.Schema() הגדרת מודל סכימה של מוצר באמצעות הפונקציה 
const photoSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        routingToImage: { type: String,required:true },
        imageDetails: {type:[{ coordinatePoints: {type:String,required:true} , productId:{productSchema}}],required:true}
    }
);

export const Photo = mongoose.model("photo", photoSchema);

// Joi פונקציה המאמתת את המוצר, המתבססת על סכימה מוגדרת מראש באמצעות ספריית
export const photoValidator = (_photoToValidate) => {
    let photoJoi = joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        routingToImage: joi.string().required(),
        imageDetails: joi.array().items(joi.object({
            coordinatePoints: joi.string().required(),
            productId: joi.string().required()
        })).required()
    });
    return photoJoi.validate(_photoToValidate);
}